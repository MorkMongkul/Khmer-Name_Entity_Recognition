from fastapi import APIRouter
from app.ml.model_loader import model_manager

router = APIRouter()

@router.get("/health")
async def health_check():
    try:
        # Check if models are loaded
        models = model_manager.get_models()
        return {
            "status": "healthy",
            "models_loaded": True,
            "device": str(models['device'])
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }