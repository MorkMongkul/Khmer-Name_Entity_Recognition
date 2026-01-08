from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.database import Base

class PredictionLog(Base):
    __tablename__ = "prediction_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    input_text = Column(Text, nullable=False)
    predictions = Column(JSON, nullable=False)  # Store predictions as JSON
    processing_time = Column(Integer)  # milliseconds
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())