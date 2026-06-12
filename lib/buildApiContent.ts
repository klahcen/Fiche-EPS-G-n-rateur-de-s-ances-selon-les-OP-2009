import { ChatAttachment, ChatRequestMessage } from "./types";
import { isDocumentAttachment, isImageAttachment } from "./attachments";

type AnthropicContentBlock =
  | { type: "text"; text: string }
  | {
      type: "image";
      source: {
        type: "base64";
        media_type: "image/jpeg" | "image/png" | "image/webp";
        data: string;
      };
    };

const IMAGE_VISION_INSTRUCTION =
  "Ci-dessus : capture d'écran ou photo jointe par l'utilisateur.\n\n" +
  "Étapes obligatoires :\n" +
  "1. Lis et transcris mentalement TOUT le texte visible dans l'image.\n" +
  "2. Traite ce texte comme la demande exacte de l'utilisateur.\n" +
  "3. Réponds IMMÉDIATEMENT — génère la situation complète si c'est une demande EPS.\n" +
  "4. Ne redemande PAS une information déjà écrite dans l'image.\n" +
  "5. Si le sport n'est pas précisé dans l'image, utilise le football par défaut.";

const IMAGE_WITH_TEXT_INSTRUCTION =
  "Ci-dessus : image jointe. Analyse son contenu (texte, consignes, schémas) et combine-le avec le message texte ci-dessous.\n\n";

const DOCUMENT_ONLY_INSTRUCTION =
  "Ci-dessus : contenu extrait de fichier(s) joint(s). Utilise ce contenu pour répondre à la demande de l'utilisateur.";

function imageToBlock(att: ChatAttachment): AnthropicContentBlock {
  return {
    type: "image",
    source: {
      type: "base64",
      media_type: att.type as "image/jpeg" | "image/png" | "image/webp",
      data: att.data ?? "",
    },
  };
}

function documentToBlock(att: ChatAttachment): AnthropicContentBlock {
  return {
    type: "text",
    text: `[Fichier joint : ${att.name}]\n${att.extractedText ?? ""}`,
  };
}

export function buildAnthropicMessages(messages: ChatRequestMessage[]) {
  return messages.map((m) => {
    if (m.role === "assistant" || !m.attachments?.length) {
      return { role: m.role, content: m.content };
    }

    const images = m.attachments.filter(isImageAttachment);
    const documents = m.attachments.filter(isDocumentAttachment);
    const blocks: AnthropicContentBlock[] = [];

    images.forEach((att) => {
      if (att.data) blocks.push(imageToBlock(att));
    });

    documents.forEach((att) => {
      if (att.extractedText) blocks.push(documentToBlock(att));
    });

    const userText = m.content.trim();
    let instruction = "";

    if (images.length && userText) {
      instruction = IMAGE_WITH_TEXT_INSTRUCTION + userText;
    } else if (images.length) {
      instruction = IMAGE_VISION_INSTRUCTION;
    } else if (documents.length && userText) {
      instruction = userText;
    } else if (documents.length) {
      instruction = DOCUMENT_ONLY_INSTRUCTION;
    } else if (userText) {
      instruction = userText;
    }

    if (instruction) {
      blocks.push({ type: "text", text: instruction });
    }

    return { role: m.role as "user", content: blocks };
  });
}
