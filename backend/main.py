from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

from app.core.config import settings
from app.core.database import Base, engine, SessionLocal
from app.api import api_router
from app.services.seed_data import seed_database_if_empty

logger = logging.getLogger("pulseai.main")

# Initialize Database Tables
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/created successfully.")
    
    # Seed Database with demo data if empty
    db = SessionLocal()
    try:
        seed_database_if_empty(db)
        logger.info("Demo database seeded successfully.")
    except Exception as e:
        logger.warning(f"Database seeding note: {e}")
    finally:
        db.close()
except Exception as e:
    logger.error(f"Table initialization warning: {e}")

app = FastAPI(
    title="PulseAI Enterprise Intelligence Engine",
    version="1.0.0",
    description="Unified API engine for field auditing, mystery shopping, multi-modal AI data operations, and automated computer vision validation."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 routes
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "PulseAI Core Engine",
        "api_docs": "/docs",
        "database": "MS SQL Server Active" if "mssql" in str(engine.url) else "SQLite Active (Auto-fallback)"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "engine": "FastAPI Async", "ai_pipeline": "operational"}
