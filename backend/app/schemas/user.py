from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

try:
    from pydantic import EmailStr
except ImportError:
    EmailStr = str

class UserBase(BaseModel):
    email: str
    full_name: str
    phone: Optional[str] = None
    role: str = "shopper"  # client, shopper, qc_admin, super_admin

class UserCreate(UserBase):
    password: str
    # Client Registration Attributes
    company_name: Optional[str] = None
    industry: Optional[str] = "Retail & Consumer"
    service_needed: Optional[str] = "Mystery Shopping & CX Evaluation"
    store_count: Optional[str] = "10-50 stores"
    designation: Optional[str] = None
    billing_address: Optional[str] = None
    
    # Shopper Registration Attributes
    city: Optional[str] = "Dubai, UAE"
    country: Optional[str] = "United Arab Emirates"
    payout_method: Optional[str] = "Direct Bank Transfer / IBAN"
    transport_mode: Optional[str] = "Car"

class UserLogin(BaseModel):
    email: str
    password: str

class ClientProfileResponse(BaseModel):
    id: str
    company_name: str
    industry: Optional[str] = None
    service_needed: Optional[str] = None
    store_count: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    total_spent: Optional[float] = 0.0

    class Config:
        from_attributes = True

class ShopperProfileResponse(BaseModel):
    id: str
    city: Optional[str] = None
    country: Optional[str] = None
    trust_score: Optional[float] = 95.0
    kyc_status: Optional[str] = "verified"
    balance_earned: Optional[float] = 0.0
    balance_pending: Optional[float] = 0.0
    payout_method: Optional[str] = None

    class Config:
        from_attributes = True

class UserResponse(UserBase):
    id: str
    is_verified: bool
    status: Optional[str] = "active"
    created_at: datetime
    
    # Optional nested or flattened profile data
    trust_score: Optional[float] = None
    balance_earned: Optional[float] = None
    company_name: Optional[str] = None
    city: Optional[str] = None
    client_profile: Optional[ClientProfileResponse] = None
    shopper_profile: Optional[ShopperProfileResponse] = None

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

