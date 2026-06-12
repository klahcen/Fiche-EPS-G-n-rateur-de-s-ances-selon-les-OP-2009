import { ChatAttachment } from "./types";

const MAX_FILES = 5;
const MAX_SIZE_MB = 4;
const MAX_IMAGE_DIM = 2000;

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DOCUMENT_TYPES = [
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".txt", ".docx"];

export const FILE_ACCEPT =
  "image/jpeg,image/png,image/webp,application/pdf,text/plain,.pdf,.txt,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function getExtension(name: string) {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

export function isAcceptedFile(file: File) {
  if (IMAGE_TYPES.includes(file.type) || DOCUMENT_TYPES.includes(file.type)) {
    return true;
  }
  return ACCEPTED_EXTENSIONS.includes(getExtension(file.name));
}

function resolveMime(file: File): string {
  if (file.type) return file.type;
  const ext = getExtension(file.name);
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return map[ext] ?? file.type;
}

function isImageMime(mime: string) {
  return IMAGE_TYPES.includes(mime);
}

function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function optimizeImageForVision(file: File): Promise<{
  data: string;
  type: string;
  previewUrl: string;
}> {
  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;

  const longest = Math.max(width, height);
  if (longest > MAX_IMAGE_DIM) {
    const scale = MAX_IMAGE_DIM / longest;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Impossible de traiter l'image");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Conversion image échouée"))),
      "image/jpeg",
      0.95
    );
  });

  const dataUrl = await fileToDataUrl(blob);
  return {
    data: dataUrl.split(",")[1] ?? "",
    type: "image/jpeg",
    previewUrl: URL.createObjectURL(blob),
  };
}

async function extractTxt(file: File): Promise<string> {
  const text = await file.text();
  const trimmed = text.trim();
  if (!trimmed) throw new Error(`Fichier texte vide : ${file.name}`);
  return trimmed;
}

async function extractViaApi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/extract-text", {
    method: "POST",
    body: formData,
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || `Impossible de lire ${file.name}`);
  }
  return payload.text as string;
}

async function extractDocumentText(file: File, mime: string): Promise<string> {
  if (mime === "text/plain" || file.name.toLowerCase().endsWith(".txt")) {
    return extractTxt(file);
  }
  return extractViaApi(file);
}

export async function filesToAttachments(files: FileList | File[]): Promise<ChatAttachment[]> {
  const list = Array.from(files);
  const attachments: ChatAttachment[] = [];

  for (const file of list) {
    if (!isAcceptedFile(file)) {
      throw new Error(`Type non supporté : ${file.name}`);
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      throw new Error(`Fichier trop volumineux (max ${MAX_SIZE_MB} Mo) : ${file.name}`);
    }
    if (attachments.length >= MAX_FILES) {
      throw new Error(`Maximum ${MAX_FILES} fichiers par message`);
    }

    const mime = resolveMime(file);

    if (isImageMime(mime)) {
      const optimized = await optimizeImageForVision(file);
      attachments.push({
        id: Math.random().toString(36).slice(2),
        name: file.name,
        type: optimized.type,
        kind: "image",
        data: optimized.data,
        previewUrl: optimized.previewUrl,
      });
    } else {
      const extractedText = await extractDocumentText(file, mime);
      attachments.push({
        id: Math.random().toString(36).slice(2),
        name: file.name,
        type: mime,
        kind: "document",
        extractedText,
      });
    }
  }

  return attachments;
}

export function revokeAttachmentPreviews(attachments: ChatAttachment[]) {
  attachments.forEach((a) => {
    if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
  });
}

export function attachmentDataUrl(att: ChatAttachment) {
  if (!att.data) return "";
  if (att.previewUrl?.startsWith("blob:")) return att.previewUrl;
  return `data:${att.type};base64,${att.data}`;
}

export function isImageAttachment(att: ChatAttachment) {
  return att.kind === "image";
}

export function isDocumentAttachment(att: ChatAttachment) {
  return att.kind === "document";
}
