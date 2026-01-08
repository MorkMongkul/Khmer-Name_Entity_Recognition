from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Khmer NER API"
    
    # Database Settings
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str = "db"
    POSTGRES_PORT: str = "5432"
    
    # Model Settings
    MODEL_PATH: str = "/app/models"
    AUTOENCODER_PATH: str = "/app/models/char_autoencoder_epoch3.pt"
    NER_MODEL_PATH: str = "/app/models/bilstm_crf_best.pt"
    CHAR2IDX_PATH: str = "/app/models/char2idx.json"
    
    # Device Settings
    DEVICE: str = "cpu"  # or "cuda" if available
    
    class Config:
        env_file = ".env"
        case_sensitive = True

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()