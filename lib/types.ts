export type AttachmentKind = "image" | "document";

export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  kind: AttachmentKind;
  /** Base64 data for images */
  data?: string;
  /** Extracted text for PDF, TXT, DOCX */
  extractedText?: string;
  previewUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments?: ChatAttachment[];
}

export interface ChatRequestMessage {
  role: "user" | "assistant";
  content: string;
  attachments?: ChatAttachment[];
}

export interface ChatRequest {
  messages: ChatRequestMessage[];
}
