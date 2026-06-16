from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# رابط الاتصال بقاعدة بيانات PostgreSQL (سيتم ربطه بخادم سحابي حقيقي في الإنتاج)
SQLALCHEMY_DATABASE_URL = "postgresql://admin:password@localhost/global_stars_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ==========================================
# جدول المحافظ الرقمية للاعبين (Users Wallet)
# ==========================================
class UserWallet(Base):
    __tablename__ = "users_wallet"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    gold_coins = Column(Float, default=0.0)  # رصيد العملات الذهبية
    diamonds = Column(Float, default=0.0)    # رصيد الجواهر (نظام التحويل: 7 ذهب = 2 جواهر)
    created_at = Column(DateTime, default=datetime.utcnow)

# ==========================================
# جدول سجلات رهانات لعبة الخضار (Yummy Party Bets)
# ==========================================
class BetHistory(Base):
    __tablename__ = "bets_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users_wallet.id"))
    item_bet_on = Column(String)     # العنصر المراهن عليه (جزر، طماطم، لحم، بيتزا...)
    bet_amount = Column(Float)       # قيمة الرهان
    multiplier = Column(Float)       # قيمة المضاعف أثناء اللعب (1.25x, 4.37x, 5x, 45x)
    result_status = Column(String)   # حالة الجولة: فوز (Win) أو خسارة (Loss)
    timestamp = Column(DateTime, default=datetime.utcnow)

# بناء الجداول في الذاكرة
Base.metadata.create_all(bind=engine)
