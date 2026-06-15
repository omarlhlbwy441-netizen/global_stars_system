import enum
from sqlalchemy import Integer, String, Float, ForeignKey, Enum, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

# --- التعريفات الجوهرية (Enums) ---

class AgencyType(str, enum.Enum):
    SHIPPING = "Shipping"
    TALENTS = "Talents"

class ContractType(str, enum.Enum):
    SOVEREIGN_TOTAL = "Total Agency"
    SUB_AGENCY = "Sub Agency"
    COMMERCIAL_DIAMOND = "Diamond Commercial"

class StreamMode(str, enum.Enum):
    SOLO = "Solo"
    PK = "PK Debate"
    VOICE_ROOM = "Voice Room"
    SECRET_STREAM = "Secret Stream"

class UserRole(str, enum.Enum):
    ADMIN = "Imperial Elite"
    AGENCY_OWNER = "Agency Owner"
    CREATOR = "Content Creator"
    VIP = "VIP Member"
    NORMAL = "Regular User"

# --- الجداول والخرائط الهيكلية المعيارية (SQLAlchemy 2.0 Models) ---

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.NORMAL)
    coins: Mapped[int] = mapped_column(Integer, default=0)
    diamonds: Mapped[int] = mapped_column(Integer, default=0)
    vip_level: Mapped[int] = mapped_column(Integer, default=0)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    biometric_token: Mapped[str] = mapped_column(String, nullable=True)


class Agency(Base):
    __tablename__ = "agencies"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    agency_type: Mapped[AgencyType] = mapped_column(Enum(AgencyType), nullable=False)
    diamond_grant: Mapped[int] = mapped_column(Integer, default=50000)
    medal: Mapped[str] = mapped_column(String, nullable=False)
    owner_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User")


class Contract(Base):
    __tablename__ = "contracts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    contract_type: Mapped[ContractType] = mapped_column(Enum(ContractType), nullable=False)
    agency_id: Mapped[int] = mapped_column(Integer, ForeignKey("agencies.id"))
    details: Mapped[str] = mapped_column(String, nullable=False)
    profit_percentage: Mapped[float] = mapped_column(Float, default=80.0)
    is_approved_by_maya: Mapped[bool] = mapped_column(Boolean, default=False)
    
    agency = relationship("Agency")


class Stream(Base):
    __tablename__ = "streams"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    creator_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    mode: Mapped[StreamMode] = mapped_column(Enum(StreamMode), nullable=False)
    is_live: Mapped[bool] = mapped_column(Boolean, default=True)
    collected_coins: Mapped[int] = mapped_column(Integer, default=0)
    viewer_count: Mapped[int] = mapped_column(Integer, default=0)
    
    creator = relationship("User")
