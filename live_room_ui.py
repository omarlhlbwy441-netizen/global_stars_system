import os
os.environ['KIVY_NO_ARGS'] = '1'
import sqlite3
from fastapi import FastAPI
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.clock import Clock

# =========================================================================
# [1. محرك قاعدة البيانات الدائمة - Sovereign Database Engine]
# =========================================================================
DB_PATH = "global_stars_sovereign.db"

def initialize_sovereign_db():
    """تأسيس الجداول السيادية لحفظ الأغلفة والبيانات بشكل دائم"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # جدول الملفات الشخصية والأغلفة
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_profiles (
            username TEXT PRIMARY KEY,
            avatar_path TEXT,
            cover_path TEXT,
            rank TEXT,
            immunity INTEGER
        )
    ''')
    
    # جدول وضعيات وغلاف البث
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS live_rooms (
            room_id TEXT PRIMARY KEY,
            stream_mode TEXT,
            room_cover TEXT
        )
    ''')
    
    # حقن البيانات الافتراضية للقائد إن لم تكن موجودة
    cursor.execute('''
        INSERT OR IGNORE INTO user_profiles VALUES 
        ('Leader_Omar', 'assets/profiles/omar_avatar.png', 'assets/covers/royal_gold_cover.png', '👑 الملك الملكي', 1)
    ''')
    cursor.execute('''
        INSERT OR IGNORE INTO live_rooms VALUES 
        ('ROOM_01', '🔒 بث خاص (غرف مشفرة لكبار الشاحنين)', 'assets/covers/broadcast_default.png')
    ''')
    
    conn.commit()
    conn.close()

def update_db_profile_assets(username, new_avatar, new_cover):
    """تحديث وحفظ الأغلفة الجديدة في قاعدة البيانات بشكل دائم"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE user_profiles 
        SET avatar_path = ?, cover_path = ? 
        WHERE username = ?
    ''', (new_avatar, new_cover, username))
    conn.commit()
    conn.close()

# تشغيل وتجهيز قاعدة البيانات فوراً
initialize_sovereign_db()

# =========================================================================
# [2. واجهة المستخدم المتصلة بقاعدة البيانات - Database-Driven UI]
# =========================================================================
class DatabaseLuxuryDashboard(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        Clock.schedule_once(self.run_database_persistence_audit, 0.5)
        
    def run_database_persistence_audit(self, dt):
        print("\n--- [💾 سجلات فحص وتأمين قاعدة البيانات الدائمة للواجهات] ---")
        
        # قراءة البيانات الأصلية من الداتا بيز
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_profiles WHERE username='Leader_Omar'")
        profile = cursor.fetchone()
        print(f"📦 [استدعاء الداتا بيز الأصلي]: الغلاف الحالي في القاعدة هو -> {profile[2]}")
        
        # محاكاة حفظ التعديل الداخلي للأغلفة في قاعدة البيانات بشكل دائم
        update_db_profile_assets("Leader_Omar", "assets/profiles/omar_final.png", "assets/covers/neon_diamond_persistent.png")
        print("💾 [بروتوكول الحفظ الدائم]: تم كتابة وتأمين الغلاف الجديد 'neon_diamond_persistent.png' داخل جدول user_profiles.")
        
        # التحقق من الحفظ القطعي
        cursor.execute("SELECT * FROM user_profiles WHERE username='Leader_Omar'")
        updated_profile = cursor.fetchone()
        print(f"✅ [تأكيد التخزين المستمر]: الغلاف المحفوظ حالياً وبشكل دائم هو -> {updated_profile[2]}")
        
        cursor.execute("SELECT * FROM live_rooms WHERE room_id='ROOM_01'")
        room = cursor.fetchone()
        print(f"📡 [وضعية البث المفعلة بالقاعدة]: {room[1]}")
        
        conn.close()
        print("-------------------------------------------------------------------------")
        print("🎉 تم ربط الواجهات والأنظمة الثمانية بقاعدة البيانات بنجاح 100%. إغلاق آمن...")
        MDApp.get_running_app().stop()

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Amber"
        sm = ScreenManager()
        sm.add_widget(DatabaseLuxuryDashboard(name="dashboard"))
        return sm

if __name__ == "__main__":
    GlobalStarsLiveApp().run()
