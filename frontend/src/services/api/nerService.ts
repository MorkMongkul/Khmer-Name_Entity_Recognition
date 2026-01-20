// services/api/nerService.ts
import axios from "axios";
import { Entity, NERResponse } from "../../types/ner";

/**
 * FIX 1: Vite Prefix Requirement
 * Vite only exposes variables starting with VITE_ to the client.
 * Using a fallback to 'http://localhost:8000' ensures local dev works.
 */
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * History Data Interfaces
 */
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

/**
 * FIX 2: Centralized Axios Instance
 * Adding '/api/v1' here means you don't have to repeat it in every call.
 */
const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const nerService = {
  /**
   * Predict Named Entities
   * Path: POST /api/v1/predict
   */
  async predict(text: string): Promise<NERResponse> {
    const response = await api.post<NERResponse>("/predict", { text });
    const data = response.data;

    // Logic to handle potential variations in backend field names (word vs text)
    const fixedEntities = data.entities.map((e: any) => {
      const mappedText =
        e.text && e.text.trim() !== "" ? e.text
        : e.word && e.word.trim() !== "" ? e.word
        : "";

      return {
        ...e,
        text: mappedText,
        confidence: e.confidence ?? 1.0,
      };
    });

    return {
      ...data,
      entities: fixedEntities,
    };
  },

  /**
   * Fetch Prediction History
   * Path: GET /api/v1/history?skip=0&limit=50
   */
  async getHistory(skip = 0, limit = 50): Promise<HistoryItem[]> {
    const response = await api.get<HistoryApiItem[]>("/history", {
      params: { skip, limit },
    });

    return response.data.map((item) => ({
      id: item.id,
      text: item.input_text,
      entities: item.predictions.map((p) => ({
        text: p.word ?? "",
        label: p.label,
        start: p.start ?? 0,
        end: p.end ?? 0,
        confidence: 1.0,
      })),
      processing_time: item.processing_time,
      created_at: item.created_at,
    }));
  },
};
