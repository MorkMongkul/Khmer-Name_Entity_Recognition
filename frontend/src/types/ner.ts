// types/ner.ts

export type NERLabel = 'B-LOC' | 'I-LOC' | 'B-PER' | 'I-PER' | 'O';

export interface Entity {
  text: string;      // The word itself
  label: string;     // e.g., 'B-PER'
  start: number;     // Character start index
  end: number;       // Character end index
  confidence?: number;
}

export interface NERResponse {
  entities: Entity[];
  processing_time: number;
  word_count?: number;
}