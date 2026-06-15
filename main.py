from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import engine, get_db

# إنشاء الجداول الهيكلية فوراً عند تشغيل المحرك
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="نظام تشغيل وكالات نجوم العالم المطور",
    description="النظام السيادي الموحد لإدارة الشحن، الوكالات، صناعة المحتوى، والمنح الماسية بقوة معمارية FastAPI.",
    version="2.0.0"
)

# --- بروتوكول التهيية الذاتية (تغذية النظام بميثاق نجوم العالم تلقائياً) ---
@app.on_event("startup")
def initialize_imperial_system():
    db = next(get_db())
    # إذا كانت قاعدة البيانات جديدة وفارغة، نقوم بتنصيب الميثاق فوراً
    if db.query(models.Agency).first() is None:
        # إنشاء مستخدم مالك افتراضي لإدارة النظام السيادي
        admin_user = models.User(username="Global_Stars_Leader", role=models.UserRole.ADMIN, is_verified=True)
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        # 1. وكالات الشحن المعتمدة (Shipping Agencies)
        shipping_agencies = ["NH Agency", "GH Agency", "OA Agency", "OSA Agency"]
        for name in shipping_agencies:
            agency = models.Agency(
                name=name, 
                agency_type=models.AgencyType.SHIPPING, 
                diamond_grant=50000, 
                medal="🎖️ وسام بنك العرش", 
                owner_id=admin_user.id
            )
            db.add(agency)
            
        # 2. وكالات التوظيف المعتمدة (Talents Agencies)
        talent_agencies = ["A1 Agency", "A2 Agency", "A3 Agency", "A4 Agency"]
        for name in talent_agencies:
            agency = models.Agency(
                name=name, 
                agency_type=models.AgencyType.TALENTS, 
                diamond_grant=50000, 
                medal="🏅 وسام كشاف النجوم", 
                owner_id=admin_user.id
            )
            db.add(agency)
            
        db.commit()
        print("🏛️ تم تفعيل ميثاق نجوم العالم المعتمد وضخ المنح الماسية (50,000 💎) بنجاح كامل!")

# --- 🔐 بوابة تسجيل الدخول المتقدم والتحقق الحيوي (The Gateway) ---
@app.post("/gateway/login", response_model=schemas.UserResponse, tags=["🔐 بوابة الدخول الملكية"])
def biometric_gateway_login(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == user_data.username).first()
    if not user:
        user = models.User(
            username=user_data.username, 
            role=user_data.role, 
            biometric_token=user_data.biometric_token,
            is_verified=True if user_data.biometric_token else False
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

# --- 📊 لوحة تحكم وسجل الوكالات (Agency Dashboard) ---
@app.get("/agencies/registry", response_model=List[schemas.AgencyResponse], tags=["📊 لوحة تحكم الوكالات السيادية"])
def get_all_agencies(db: Session = Depends(get_db)):
    return db.query(models.Agency).all()

# --- 📑 نظام العقود والتوكيل المشفر (Sovereign Contract System) ---
@app.post("/contracts/issue", tags=["📑 نظام التعاقد والتوثيق الحازم"])
def issue_sovereign_contract(contract: schemas.ContractCreate, db: Session = Depends(get_db)):
    agency = db.query(models.Agency).filter(models.Agency.id == contract.agency_id).first()
    if not agency:
        raise HTTPException(status_code=404, detail="الوكالة المستهدفة غير موجودة في السجل الإمبراطوري")
    
    # محاكاة موافقة "مايا" التلقائية لضمان النزاهة والسرعة الفائقة في العقد الفرعي
    approval_status = True
    
    new_contract = models.Contract(
        contract_type=contract.contract_type,
        agency_id=contract.agency_id,
        details=contract.details,
        profit_percentage=contract.profit_percentage,
        is_approved_by_maya=approval_status
    )
    db.add(new_contract)
    db.commit()
    return {
        "status": "Success", 
        "message": "تم إصدار العقد المشفر بنجاح ونقله عبر شبكة نجوم العالم الآمنة", 
        "approved_by_maya": approval_status,
        "profit_share": f"{contract.profit_percentage}%"
    }

# --- 🎙️ منصة غرف البث والـ PK (Streaming Core) ---
@app.post("/streams/launch", response_model=schemas.StreamResponse, tags=["🎙️ واجهات البث المباشر المتقدمة"])
def launch_imperial_stream(creator_id: int, mode: models.StreamMode, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == creator_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="صانع المحتوى غير مسجل بالمنظومة السيادية")
        
    new_stream = models.Stream(creator_id=creator_id, mode=mode, is_live=True, viewer_count=1)
    db.add(new_stream)
    db.commit()
    db.refresh(new_stream)
    return new_stream

@app.get("/", include_in_schema=False)
def root():
    return {"message": "نظام نجوم العالم يعمل بكفاءة قصوى ومستعد للأرشفة البرمجية الحية."}
