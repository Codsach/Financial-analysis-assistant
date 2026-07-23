# backend/app/auth/router.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

router = APIRouter()

async def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception

@router.post("/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Simple dev credentials: admin / admin
    if form_data.username != "admin" or form_data.password != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": form_data.username, "exp": expire}
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

@router.get("/auth/me")
async def get_me(current_user: str = Depends(get_current_user)):
    return {"username": current_user, "role": "admin"}
