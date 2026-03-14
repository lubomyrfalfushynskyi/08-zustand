import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note';

const isServer = typeof window === 'undefined';
const API_URL = isServer 
  ? 'https://notehub-public.goit.study/api'
  : '/api/proxy';

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN?.trim().replace(/[^\x20-\x7E]/g, '');

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (API_TOKEN) {
    const cleanToken = API_TOKEN.replace(/^Bearer\s+/i, '');
    config.headers.Authorization = `Bearer ${cleanToken}`;
  }
  return config;
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params?: { search?: string; tag?: string; page?: number }): Promise<NotesResponse> => {
  try {
    const cleanParams: Record<string, string | number> = {};
    if (params?.page) cleanParams.page = params.page;
    if (params?.tag && params.tag !== 'all') cleanParams.tag = params.tag;
    if (params?.search && params.search.trim() !== '') cleanParams.search = params.search;

    const response = await api.get('/notes', { params: cleanParams });
    return Array.isArray(response.data) ? { notes: response.data, totalPages: 1 } : response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || error.message;
      throw new Error(`API Error ${status}: ${msg}`);
    }
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
};

export const updateNote = async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
  const { data } = await api.patch<Note>(`/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
