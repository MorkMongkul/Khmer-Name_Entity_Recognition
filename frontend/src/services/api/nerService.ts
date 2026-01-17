// services/api/nerService.ts
import axios from "axios";
import { Entity, NERResponse } from "../../types/ner";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export interface HistoryItem {
  id: string | number;
  text: string;
  entities: Entity[];
  processing_time: number;
  created_at: string;
}

interface HistoryApiItem {
  id: string | number;
  input_text: string;
  predictions: {
    word?: string;
    label: string;
    start?: number;
    end?: number;
  }[];
  processing_time: number;
  created_at: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const nerService = {
  async predict(text: string): Promise<NERResponse> {
    const response = await api.post<NERResponse>("/predict", { text });
    const data = response.data;

    // If backend returns word instead of text, map it.
    const fixedEntities = data.entities.map((e: any) => {
      const mappedText =
        e.text && e.text.trim() !== ""
          ? e.text
          : e.word && e.word.trim() !== ""
          ? e.word
          : "";

      return {
        ...e,
        text: mappedText,
      };
    });

    return {
      ...data,
      entities: fixedEntities,
    };
  },

  async getHistory(skip = 0, limit = 50): Promise<HistoryItem[]> {
    const response = await api.get<HistoryApiItem[]>(
      `/history?skip=${skip}&limit=${limit}`
    );

    return response.data.map((item) => ({
      id: item.id,
      text: item.input_text,
      entities: item.predictions.map((p) => ({
        text: p.word ?? "",
        label: p.label,
        start: p.start ?? 0,
        end: p.end ?? 0,
        confidence: 1,
      })),
      processing_time: item.processing_time,
      created_at: item.created_at,
    }));
  },
};
