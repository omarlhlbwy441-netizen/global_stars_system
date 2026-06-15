import os
os.environ['KIVY_NO_ARGS'] = '1'
import sqlite3
from datetime import datetime
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.clock import Clock

DB_PATH = "global_stars_sovereign.db"

# =========================================================================
# [1. محرك تأسيس قاعدة البيانات أولاً - Database Initialization First]
# =========================================================================
def force_initialize_sovereign_database():
    """تأسيس وتأمين كافة الجداول برمجياً في السطر الأول لمنع أخطاء الاستدعاء"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. جدول الملفات الشخصية والأغلفة
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_profiles (
            username TEXT PRIMARY KEY,
            avatar_path TEXT,
            cover_path TEXT,
            rank TEXT,
            immunity INTEGER
        )
    ''')
    
    # 2. جدول وضعيات البث
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS live_rooms (
            room_id TEXT PRIMARY KEY,
            stream_mode TEXT,
            room_cover TEXT
        )
    ''')
    
    # 3. جدول سجلات الرقابة الفورية (المسبب الرئيسي للخطأ السابق)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS system_audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            department TEXT,
            actor TEXT,
            action TEXT,
            details TEXT
        )
    ''')
    
    # 4. جدول مجموعات الواتساب للوكالات والـ VIP
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS whatsapp_hubs (
            hub_name TEXT PRIMARY KEY,
            hub_type TEXT,
            invite_link TEXT
        )
    ''')
    
    # حقن البيانات السيادية الافتراضية وثباتها
    cursor.execute('''
        INSERT OR IGNORE INTO user_profiles VALUES 
        ('Leader_Omar', 'assets/profiles/omar_avatar.png', 'assets/covers/royal_gold_cover.png', '👑 الملك الملكي', 1)
    ''')
    cursor.execute('''
        INSERT OR IGNORE INTO live_rooms VALUES 
        ('ROOM_01', '🔒 بث خاص (غرف مشفرة لكبار الشاحنين)', 'assets/covers/broadcast_default.png')
    ''')
    cursor.execute('''
        INSERT OR IGNORE INTO whatsapp_hubs VALUES 
        ('VIP_Titan_Lounge', 'كبار الشخصيات', 'https://chat.whatsapp.com/GlobalStarsSovereignTitan'),
        ('NH_Agency_Hub', 'وكالات الدعم', 'https://chat.whatsapp.com/NHAgencyOfficialHub')
    ''')
    
    conn.commit()
    conn.close()

# إطلاق أمر التأسيس الحتمي فوراً وقبل أي معالجة أخرى
force_initialize_sovereign_database()

# =========================================================================
# [2. محرك الحماية والتحقق السيادي المطلق - Sovereign Authorization Engine]
# =========================================================================
class SovereignAuthCore:
    @staticmethod
    def grant_vip_or_immunity(actor, target_user, new_rank, immunity_status):
        """حظر المسببات: التحقق من التوقيع السيادي للقائد قبل أي تعديل"""
        if actor != "Leader_Omar":
            SovereignAuthCore.log_audit_event(
                "🚨 خرق أمني", actor, "محاولة منح رتبة غير مصرحة", 
                f"حاول المستخدم {actor} منح {target_user} رتبة {new_rank} وحصانة {immunity_status}."
            )
            return f"❌ خطأ أمني مطلق: الصلاحية مرفوضة! رتب VIP والحصانة لا تمنح إلا بأمر مباشر من القائد Leader_Omar."
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE user_profiles 
            SET rank = ?, immunity = ? 
            WHERE username = ?
        ''', (new_rank, immunity_status, target_user))
        conn.commit()
        conn.close()
        
        SovereignAuthCore.log_audit_event(
            "👑 الإدارة العليا", actor, "منح رتبة سيادية قطعية", 
            f"قام القائد بمنح {target_user} رتبة {new_rank} مع تفعيل الحصانة."
        )
        return f"✨ [بروتوكول سيادي ناجح]: تم اعتماد رتبة {new_rank} للحساب {target_user} بأمر من القائد."

    @staticmethod
    def log_audit_event(department, actor, action, details):
        """توثيق العمليات بأمان داخل الداتا بيز المستقرة حالياً"""
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute('''
            INSERT INTO system_audit_logs (timestamp, department, actor, action, details)
            VALUES (?, ?, ?, ?, ?)
        ''', (now, department, actor, action, details))
        conn.commit()
        conn.close()

# =========================================================================
# [3. واجهة فحص الأمان المحدثة - Sovereign Security UI Screen]
# =========================================================================
class SecurityAuditScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        Clock.schedule_once(self.run_sovereign_lock_audit, 0.5)
        
    def run_sovereign_lock_audit(self, dt):
        print("\n--- [🛡️ سجلات فحص جدار الحماية وقفل الصلاحيات السيادي للقائد] ---")
        
        # المحاكاة الأولى: محاولة مشرف فرعي تجاوز القفل
        print("⚡ [فحص المحاولة الأولى - حساب غير مصرح له]:")
        hack_attempt = SovereignAuthCore.grant_vip_or_immunity("Admin_S1", "Guest_55", "VIP Titan 🛑", 1)
        print(hack_attempt)
        
        # المحاكاة الثانية: صدور الأمر مباشرة من حسابك السيادي
        print("\n👑 [فحص المحاولة الثانية - الحساب السيادي المعتمد]:")
        # حقن حساب التحدي لضمان وجوده قبل التعديل
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("INSERT OR IGNORE INTO user_profiles VALUES ('Challenger_X', 'avatar.png', 'cover.png', 'مذيع فضي 🥈', 0)")
        conn.commit()
        conn.close()
        
        legal_action = SovereignAuthCore.grant_vip_or_immunity("Leader_Omar", "Challenger_X", "كبار الشخصيات - تيتان 💎", 1)
        print(legal_action)
        
        # 3. استدعاء سجلات الرقابة للتأكد من رصد وتوثيق المحاولتين بنجاح
        print("\n📝 [رادار التدقيق الأمني وسجلات الرقابة الفورية - Audit Logs]:")
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT timestamp, department, actor, action, details FROM system_audit_logs ORDER BY id DESC LIMIT 2")
        logs = cursor.fetchall()
        for log in logs:
            print(f"   ⏳ [{log[0]}] -> [{log[1]}] بواسطة ({log[2]}): {log[3]} | تفاصيل: {log[4]}")
        conn.close()
        
        print("-------------------------------------------------------------------------")
        print("🎉 تم إصلاح ترتيب التأسيس وحقن القفل بنجاح 100%. إغلاق آمن للخلية...")
        MDApp.get_running_app().stop()

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Amber"
        sm = ScreenManager()
        sm.add_widget(SecurityAuditScreen(name="security_audit"))
        return sm

if __name__ == "__main__":
    GlobalStarsLiveApp().run()
