import os
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

logger = logging.getLogger("pulseai.database")
logging.basicConfig(level=logging.INFO)

Base = declarative_base()

def init_engine():
    db_url = settings.DATABASE_URL
    if db_url.startswith("sqlite+aiosqlite"):
        db_url = "sqlite:///./pulse_ai.db"

    # Try connecting to the specified database (e.g. MS SQL Server)
    if "mssql" in db_url or "postgresql" in db_url:
        try:
            logger.info(f"Attempting connection to primary database: {db_url.split('@')[-1] if '@' in db_url else 'specified database'}")
            target_url = db_url
            if "mssql" in db_url:
                import urllib.parse
                from sqlalchemy.engine import make_url
                parsed_url = make_url(db_url)
                if parsed_url.database:
                    # Unquote database name (e.g. 'AI%20project' -> 'AI project') so ODBC driver receives clean name
                    unquoted_db = urllib.parse.unquote(parsed_url.database)
                    target_url = parsed_url.set(database=unquoted_db)

            test_engine = create_engine(
                target_url,
                echo=False,
                pool_pre_ping=True,
                connect_args={"timeout": 10} if "mssql" in db_url else {}
            )
            with test_engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            logger.info("Successfully connected to primary database engine.")
            return test_engine
        except Exception as e:
            logger.warning(f"Primary database connection failed ({e}). Falling back to local SQLite engine (pulse_ai.db).")

    # Fallback to local SQLite
    sqlite_url = "sqlite:///./pulse_ai.db"
    return create_engine(
        sqlite_url,
        echo=False,
        connect_args={"check_same_thread": False}
    )

engine = init_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
