export interface Note {
  userId: string;
  noteId: string;
  content: string;
  attachment?: string;
  createdAt: number;
}

export interface CreateNoteRequest {
  content: string;
  attachment?: string;
}

export interface UpdateNoteRequest {
  content?: string;
  attachment?: string;
} 