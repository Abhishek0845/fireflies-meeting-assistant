from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = "sqlite:///./fireflies.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

# ── SQLite Pragmas ─────────────────────────────────────────────────────────────
# These fire once per physical connection, before any SQL runs.
@event.listens_for(engine, "connect")
def set_sqlite_pragmas(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    # CRITICAL: SQLite disables FK enforcement by default.
    # Without this, ON DELETE CASCADE in our models does absolutely nothing.
    cursor.execute("PRAGMA foreign_keys=ON")
    # WAL mode allows concurrent readers while a write is in progress.
    # Default (DELETE) mode locks the whole file for any write.
    cursor.execute("PRAGMA journal_mode=WAL")
    # NORMAL: fsync only at the most critical moments — much faster than FULL,
    # safe enough for a development/demo database.
    cursor.execute("PRAGMA synchronous=NORMAL")
    cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """
    FastAPI dependency that yields a database session per request and
    guarantees it is closed even if the route raises an exception.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()