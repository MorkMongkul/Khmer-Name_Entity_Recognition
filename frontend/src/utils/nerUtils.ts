export interface BIOEntity {
  text: string;
  label: 'B-LOC' | 'I-LOC' | 'B-PER' | 'I-PER' | 'O';
  start: number;
  end: number;
  confidence: number;
  displayLabel?: 'PER' | 'LOC'; // Simplified for display
}

export interface ProcessedEntity {
  id: string;
  text: string;
  type: 'PER' | 'LOC';
  fullText: string;
  confidence: number;
  start: number;
  end: number;
  isBeginning: boolean;
}

// Convert raw BIO tags to grouped entities
export function processBIOEntities(entities: BIOEntity[]): ProcessedEntity[] {
  const processed: ProcessedEntity[] = [];
  let currentEntity: ProcessedEntity | null = null;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    
    if (entity.label === 'B-PER' || entity.label === 'B-LOC') {
      // Save previous entity if exists
      if (currentEntity) {
        processed.push(currentEntity);
      }
      
      // Start new entity
      const type = entity.label.includes('PER') ? 'PER' : 'LOC';
      currentEntity = {
        id: `${type}-${Date.now()}-${i}`,
        text: entity.text,
        type,
        fullText: entity.text,
        confidence: entity.confidence,
        start: entity.start,
        end: entity.end,
        isBeginning: true
      };
    }
    else if ((entity.label === 'I-PER' || entity.label === 'I-LOC') && currentEntity) {
      // Continue current entity
      currentEntity.fullText += ' ' + entity.text;
      currentEntity.end = entity.end;
      currentEntity.confidence = Math.min(currentEntity.confidence, entity.confidence);
    }
    else if (entity.label === 'O' && currentEntity) {
      // End current entity
      processed.push(currentEntity);
      currentEntity = null;
    }
  }
  
  // Don't forget the last entity
  if (currentEntity) {
    processed.push(currentEntity);
  }
  
  return processed;
}

// Get color scheme for entity types
export const entityColors = {
  'PER': {
    bg: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  'LOC': {
    bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800 border-blue-300'
  }
} as const;

// Format confidence percentage
export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(1)}%`;
}

// Calculate entity statistics
export function calculateEntityStats(entities: ProcessedEntity[]) {
  const stats = {
    total: entities.length,
    per: entities.filter(e => e.type === 'PER').length,
    loc: entities.filter(e => e.type === 'LOC').length,
    avgConfidence: entities.length > 0 
      ? entities.reduce((sum, e) => sum + e.confidence, 0) / entities.length 
      : 0
  };
  
  return stats;
}