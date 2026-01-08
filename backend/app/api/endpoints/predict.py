from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import NERRequest, NERResponse, EntityPrediction
from app.models.database_models import PredictionLog
from app.ml.inference import predict_ner
import time

router = APIRouter()

@router.post("/predict", response_model=NERResponse)
async def predict(request: NERRequest, db: Session = Depends(get_db)):
    try:
        start_time = time.time()
        
        # Run prediction
        predictions = predict_ner(request.text)
        
        processing_time = int((time.time() - start_time) * 1000)
        
        # Format response
        entities = [
            EntityPrediction(word=word, label=label)
            for word, label in predictions
        ]
        
        # Log to database
        log_entry = PredictionLog(
            input_text=request.text,
            predictions=[{"word": word, "label": label} for word, label in predictions],
            processing_time=processing_time
        )
        db.add(log_entry)
        db.commit()
        
        return NERResponse(
            text=request.text,
            entities=entities,
            processing_time=processing_time
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
async def get_prediction_history(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    logs = db.query(PredictionLog).offset(skip).limit(limit).all()
    return logs