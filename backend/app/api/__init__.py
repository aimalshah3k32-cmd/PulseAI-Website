from fastapi import APIRouter
from app.api.auth import router as auth_router
from app.api.projects import router as projects_router
from app.api.shopper import router as shopper_router
from app.api.admin_qc import router as admin_qc_router
from app.api.analytics import router as analytics_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(projects_router)
api_router.include_router(shopper_router)
api_router.include_router(admin_qc_router)
api_router.include_router(analytics_router)

__all__ = ["api_router"]
