from pydantic import BaseModel
from typing import Optional
from models import AgencyType, ContractType, StreamMode, UserRole

# --- نماذج التحقق الخاصة بالمستخدمين النخبة والعاديين ---
class UserBase(BaseModel):
    username: str
    role: UserRole

class UserCreate(UserBase):
    biometric_token: Optional[str] = None  # التوكن الحيوي مشفر واختياري عند التسجيل الأول

class UserResponse(UserBase):
    id: int
    coins: int
    diamonds: int
    vip_level: int
    is_verified: bool

    class Config:
        from_attributes = True  # متوافق مع Pydantic v2 لقراءة البيانات من SQLAlchemy مباشرة


# --- نماذج التحقق الخاصة بالوكالات والمنح الماسية ---
class AgencyBase(BaseModel):
    name: str
    agency_type: AgencyType
    diamond_grant: int = 50000
    medal: str

class AgencyResponse(AgencyBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


# --- نماذج التحقق الخاصة بنظام العقود السيادية ---
class ContractCreate(BaseModel):
    contract_type: ContractType
    agency_id: int
    details: str
    profit_percentage: float = 80.0  # النسبة السيادية الثابتة 80% لصناع المحتوى


# --- نماذج التحقق الخاصة بواجهات البث المباشر والتحديات ---
class StreamResponse(BaseModel):
    id: int
    creator_id: int
    mode: StreamMode
    is_live: bool
    collected_coins: int
    viewer_count: int

    class Config:
        from_attributes = True
