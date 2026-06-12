import mammoth from "mammoth";

export const runtime = "nodejs";

const MAX_SIZE_MB = 4;

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function isDocx(file: File) {
  return (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.toLowerCase().endsWith(".docx")
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return Response.json(
        { error: `Fichier trop volumineux (max ${MAX_SIZE_MB} Mo)` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (isPdf(file)) {
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      const text = result.text?.trim();
      await parser.destroy();
      if (!text) {
        return Response.json(
          { error: "Aucun texte extrait du PDF" },
          { status: 422 }
        );
      }
      return Response.json({ text });
    }

    if (isDocx(file)) {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value?.trim();
      if (!text) {
        return Response.json(
          { error: "Aucun texte extrait du document Word" },
          { status: 422 }
        );
      }
      return Response.json({ text });
    }

    return Response.json({ error: "Type de fichier non supporté" }, { status: 400 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur d'extraction du fichier";
    return Response.json({ error: message }, { status: 500 });
  }
}
