from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import Optional
import uuid
from datetime import datetime

from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, decode_access_token
from app.models.user import User, ClientProfile, ShopperProfile
from app.models.ai_analysis import AuditLog
from app.schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse, ClientProfileResponse, ShopperProfileResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    new_user = User(
        id=str(uuid.uuid4()),
        email=user_in.email,
        password_hash=hash_password(user_in.password),
        full_name=user_in.full_name,
        phone=user_in.phone,
        role=user_in.role,
        is_verified=True,
        status="active"
    )
    db.add(new_user)
    db.flush()

    client_res = None
    shopper_res = None

    if user_in.role == "client":
        client_prof = ClientProfile(
            id=str(uuid.uuid4()),
            user_id=new_user.id,
            company_name=user_in.company_name or f"{user_in.full_name}'s Enterprise",
            industry=user_in.industry or "Retail & Consumer",
            service_needed=user_in.service_needed or "Mystery Shopping & CX Evaluation",
            store_count=user_in.store_count or "10-50 stores",
            city=user_in.city or "Dubai, UAE",
            country=user_in.country or "Global",
            designation=user_in.designation or "Enterprise Executive",
            billing_address=user_in.billing_address,
            total_spent=0.0
        )
        db.add(client_prof)
        db.flush()
        client_res = ClientProfileResponse(
            id=client_prof.id,
            company_name=client_prof.company_name,
            industry=client_prof.industry,
            service_needed=client_prof.service_needed,
            store_count=client_prof.store_count,
            city=client_prof.city,
            country=client_prof.country,
            total_spent=0.0
        )
    elif user_in.role == "shopper":
        shopper_prof = ShopperProfile(
            id=str(uuid.uuid4()),
            user_id=new_user.id,
            city=user_in.city or "Dubai, UAE",
            country=user_in.country or "United Arab Emirates",
            payout_method=user_in.payout_method or "Direct Bank Transfer / IBAN",
            transport_mode=user_in.transport_mode or "Car",
            trust_score=95.0,
            is_available=True,
            kyc_status="verified",
            balance_earned=0.0,
            balance_pending=0.0,
            balance_withdrawn=0.0
        )
        db.add(shopper_prof)
        db.flush()
        shopper_res = ShopperProfileResponse(
            id=shopper_prof.id,
            city=shopper_prof.city,
            country=shopper_prof.country,
            trust_score=95.0,
            kyc_status="verified",
            balance_earned=0.0,
            balance_pending=0.0,
            payout_method=shopper_prof.payout_method
        )

    # Add audit log
    db.add(AuditLog(
        id=str(uuid.uuid4()),
        event_type="user_registered",
        user_id=new_user.id,
        severity="info",
        details={"role": new_user.role, "email": new_user.email}
    ))

    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.id, "email": new_user.email, "role": new_user.role})
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse(
            id=new_user.id,
            email=new_user.email,
            full_name=new_user.full_name,
            phone=new_user.phone,
            role=new_user.role,
            is_verified=new_user.is_verified,
            status=new_user.status,
            created_at=new_user.created_at,
            company_name=user_in.company_name if user_in.role == "client" else None,
            city=user_in.city if user_in.role == "shopper" else user_in.city,
            trust_score=95.0 if user_in.role == "shopper" else None,
            balance_earned=0.0 if user_in.role == "shopper" else None,
            client_profile=client_res,
            shopper_profile=shopper_res
        )
    )

@router.post("/login", response_model=TokenResponse)
def login(login_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_in.email).first()
    if not user or not verify_password(login_in.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    
    trust_score = user.shopper_profile.trust_score if user.shopper_profile else None
    balance_earned = user.shopper_profile.balance_earned if user.shopper_profile else None
    company_name = user.client_profile.company_name if user.client_profile else None
    city = user.shopper_profile.city if user.shopper_profile else (user.client_profile.city if user.client_profile else None)

    client_res = None
    if user.client_profile:
        client_res = ClientProfileResponse(
            id=user.client_profile.id,
            company_name=user.client_profile.company_name,
            industry=user.client_profile.industry,
            service_needed=user.client_profile.service_needed,
            store_count=user.client_profile.store_count,
            city=user.client_profile.city,
            country=user.client_profile.country,
            total_spent=user.client_profile.total_spent
        )

    shopper_res = None
    if user.shopper_profile:
        shopper_res = ShopperProfileResponse(
            id=user.shopper_profile.id,
            city=user.shopper_profile.city,
            country=user.shopper_profile.country,
            trust_score=user.shopper_profile.trust_score,
            kyc_status=user.shopper_profile.kyc_status,
            balance_earned=user.shopper_profile.balance_earned,
            balance_pending=user.shopper_profile.balance_pending,
            payout_method=user.shopper_profile.payout_method
        )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            phone=user.phone,
            role=user.role,
            is_verified=user.is_verified,
            status=user.status,
            created_at=user.created_at,
            company_name=company_name,
            city=city,
            trust_score=trust_score,
            balance_earned=balance_earned,
            client_profile=client_res,
            shopper_profile=shopper_res
        )
    )

@router.get("/me", response_model=UserResponse)
def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authentication token")

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Expired or invalid token")

    user = db.query(User).filter(User.id == payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    trust_score = user.shopper_profile.trust_score if user.shopper_profile else None
    balance_earned = user.shopper_profile.balance_earned if user.shopper_profile else None
    company_name = user.client_profile.company_name if user.client_profile else None
    city = user.shopper_profile.city if user.shopper_profile else (user.client_profile.city if user.client_profile else None)

    client_res = None
    if user.client_profile:
        client_res = ClientProfileResponse(
            id=user.client_profile.id,
            company_name=user.client_profile.company_name,
            industry=user.client_profile.industry,
            service_needed=user.client_profile.service_needed,
            store_count=user.client_profile.store_count,
            city=user.client_profile.city,
            country=user.client_profile.country,
            total_spent=user.client_profile.total_spent
        )

    shopper_res = None
    if user.shopper_profile:
        shopper_res = ShopperProfileResponse(
            id=user.shopper_profile.id,
            city=user.shopper_profile.city,
            country=user.shopper_profile.country,
            trust_score=user.shopper_profile.trust_score,
            kyc_status=user.shopper_profile.kyc_status,
            balance_earned=user.shopper_profile.balance_earned,
            balance_pending=user.shopper_profile.balance_pending,
            payout_method=user.shopper_profile.payout_method
        )

    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        role=user.role,
        is_verified=user.is_verified,
        status=user.status,
        created_at=user.created_at,
        company_name=company_name,
        city=city,
        trust_score=trust_score,
        balance_earned=balance_earned,
        client_profile=client_res,
        shopper_profile=shopper_res
    )

