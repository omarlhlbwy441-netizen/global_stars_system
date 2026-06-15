import os
os.environ['KIVY_NO_ARGS'] = '1'
import sqlite3
from datetime import datetime
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.clock import Clock

DB_PATH = "global_stars_sovereign.db"

# =========================================================================
# [1. محرك الحماية والتحقق السيادي المطلق - Sovereign Authorization Engine]
# =========================================================================
class SovereignAuthCore:
    @staticmethod
    def grant_vip_or_immunity(actor, target_user, new_rank, immunity_status):
        """نظام حظر المسببات: لا تمنح رتب VIP أو الحصانة إلا عن طريق Leader_Omar حصراً"""
        if actor != "Leader_Omar":
            # توثيق محاولة الاختراق في السجلات فوراً
            SovereignAuthCore.log_audit_event(
                "🚨 خرق أمني", actor, "محاولة منح رتبة غير مصرحة", 
                f"حاول المستخدم {actor} منح {target_user} رتبة {new_rank} وحصانة {immunity_status} تم الرفض تلقائياً!"
            )
            return f"❌ خطأ أمني مطلق: الصلاحية مرفوضة! رتب VIP والحصانة لا تمنح إلا بأمر مباشر من القائد Leader_Omar."
        
        # تنفيذ الأمر فقط إذا كان الفاعل هو القائد
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
        """توثيق العمليات في قاعدة البيانات الدائمة"""
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
# [2. واجهة فحص الأمان والتحقق من القفل - Sovereign Security UI Screen]
# =========================================================================
class SecurityAuditScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        Clock.schedule_once(self.run_sovereign_lock_audit, 0.5)
        
    def run_sovereign_lock_audit(self, dt):
        print("\n--- [🛡️ سجلات فحص جدار الحماية وقفل الصلاحيات السيادي للقائد] ---")
        
        # المحاكاة الأولى: محاولة مشرف من إدارة البثوث (Admin_S1) منح حصانة ومستوى VIP
        print("⚡ [فحص المحاولة الأولى - حساب غير مصرح له]:")
        hack_attempt = SovereignAuthCore.grant_vip_or_immunity("Admin_S1", "Guest_55", "VIP Titan 🛑", 1)
        print(hack_attempt)
        
        # المحاكاة الثانية: صدور الأمر مباشرة من حسابك أنت (Leader_Omar)
        print("\n👑 [فحص المحاولة الثانية - الحساب السيادي المعتمد]:")
        legal_action = SovereignAuthCore.grant_vip_or_immunity("Leader_Omar", "Challenger_X", "كبار الشخصيات - تيتان 💎", 1)
        print(legal_action)
        
        # 3. استدعاء شريط سجلات الرقابة للتأكد من رصد وتوثيق المحاولات
        print("\n📝 [رادار التدقيق الأمني وسجلات الرقابة الفورية - Audit Logs]:")
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT timestamp, department, actor, action, details FROM system_audit_logs ORDER BY id DESC LIMIT 2")
        logs = cursor.fetchall()
        for log in logs:
            print(f"   ⏳ [{log[0]}] -> [{log[1]}] بواسطة ({log[2]}): {log[3]} | تفاصيل: {log[4]}")
        conn.close()
        
        print("-------------------------------------------------------------------------")
        print("🎉 تم حقن قفل التحقق المركزي بنجاح 100% (حصرياً للقائد). إغلاق آمن...")
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
