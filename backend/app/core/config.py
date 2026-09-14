import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PulseAI Enterprise Intelligence Engine"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "pulse_ai_super_secret_jwt_key_2026")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite+aiosqlite:///./pulse_ai.db"
    )
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    AI_CONFIDENCE_THRESHOLD: float = 85.0
    GEOFENCE_DEFAULT_RADIUS_METERS: float = 150.0

    class Config:
        case_sensitive = True

settings = Settings()
