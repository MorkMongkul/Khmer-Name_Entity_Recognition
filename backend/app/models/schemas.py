from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime

class NERRequest(BaseModel):
    text: str
    
class EntityPrediction(BaseModel):
    word: str
    label: str
    
class NERResponse(BaseModel):
    text: str
    entities: List[EntityPrediction]
    processing_time: int  # milliseconds
    
class PredictionLogResponse(BaseModel):
    id: int
    input_text: str
    predictions: List[Dict]
    processing_time: int
    created_at: datetime
    
    class Config:
        from_attributes = True