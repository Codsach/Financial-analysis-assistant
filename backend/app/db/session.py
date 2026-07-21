"""
Async database session management using SQLAlchemy with asyncpg.
"""

from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_sessionmaker,
)
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Database settings from environment variables."""
    
    postgres_server: str = "localhost"
    postgres_user: str = "postgres"
    postgres_password: str = "your_password"
    postgres_db: str = "financial_db"
    secret_key: str = "any_random_string_here"
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "allow"
    
    @property
    def database_url(self) -> str:
        """Build the async PostgreSQL connection URL."""
        return (
            f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_server}/{self.postgres_db}"
        )


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


# Create async engine with connection pooling
engine = create_async_engine(
    get_settings().database_url,
    echo=False,
    future=True,
    pool_size=20,
    max_overflow=0,
    pool_pre_ping=True,
    pool_recycle=3600,
)

# Create async session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency for FastAPI to get async database session.
    Usage in FastAPI endpoint:
        @app.get("/items")
        async def get_items(session: AsyncSession = Depends(get_async_session)):
            ...
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
