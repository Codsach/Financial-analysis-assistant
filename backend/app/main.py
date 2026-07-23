"""
Financial Analysis Assistant - FastAPI Main Application Entrypoint
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.auth.router import router as auth_router
from app.api.v1.router import router as api_v1_router

app = FastAPI(
    title="Financial Analysis Assistant API",
    description="Custom Financial LLM Prototype Backend API",
    version="1.0.0",
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router)
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Financial Analysis Assistant API"}
