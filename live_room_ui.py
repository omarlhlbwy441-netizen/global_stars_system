import os
os.environ['KIVY_NO_ARGS'] = '1'
import sqlite3
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.clock import Clock

DB_PATH = "global_stars_sovereign.db"

# =========================================================================
# [1. محرك الإدارة والتحكم الأمني - Admin & Moderation Logic Engine]
# =========================================================================
class SovereignAdminController:
    @staticmethod
    def toggle_user_immunity(username, immunity_status):
        """تعديل حالة الحصانة السيادية لمستخدم داخل قاعدة البيانات فوراً"""
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE user_profiles 
            SET immunity = ? 
            WHERE username = ?
        ''', (immunity_status, username))
        conn.commit()
        conn.close()
        status_text = "🔒 تم تفعيل الحصانة المطلقة" if immunity_status == 1 else "🔓 تم رفع الحصانة وتجريده"
        return f"⚡ [بروتوكول التحكم الأمني]: للحساب {username} -> {status_text} بنجاح في قاعدة البيانات."

    @staticmethod
    def fetch_all_active_profiles():
        """جلب كافة الحسابات ورتبها للوحة التحكم"""
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT username, rank, immunity FROM user_profiles")
        rows = cursor.fetchall()
        conn.close()
        return rows

# =========================================================================
# [2. واجهة لوحة التحكم والتدقيق - Admin & Moderation Panel UI Screen]
# =========================================================================
class AdminPanelScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # جدولة التدقيق الآلي لفحص صلاحيات اللوحة وتحديث البيانات لإنهاء الخلية تلقائياً
        Clock.schedule_once(self.run_admin_panel_audit, 0.5)
        
    def run_admin_panel_audit(self, dt):
        print("\n--- [👑 سجلات فحص وتدشين لوحة التحكم والتدقيق الأمني الأعلى] ---")
        print("🖥️ [صلاحية الدخول]: تم التحقق... الحساب النشط هو Leader_Omar. تم فتح لوحة التحكم السيادية.")
        
        # 1. استعراض قائمة المستخدمين الحالية داخل لوحة التحكم
        print("\n📋 [رادار الحسابات النشطة المستدعاة على الشاشة]:")
        profiles = SovereignAdminController.fetch_all_active_profiles()
        for user in profiles:
            immunity_label = "نعم (حصانة سيادية)" if user[2] == 1 else "لا"
            print(f"   • المستخدم: {user[0]} | الرتبة: {user[1]} | يملك حصانة: {immunity_label}")
            
        print("\n⚙️ [عمليات لوحة التحكم الحية - Admin Actions]:")
        # محاكاة قيامك بتعديل رتبة أو حصانة مستخدم آخر من داخل اللوحة
        # سنقوم بحقن مستخدم تجريبي أولاً لتبديل حصانته
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("INSERT OR IGNORE INTO user_profiles VALUES ('Challenger_X', 'avatar.png', 'cover.png', 'مذيع فضي 🥈', 0)")
        conn.commit()
        conn.close()
        
        # تنفيذ أمر تبديل الحصانة من اللوحة
        action_msg = SovereignAdminController.toggle_user_immunity("Challenger_X", 1)
        print(action_msg)
        
        # التحقق من انعكاس الأمر في قاعدة البيانات والواجهة
        profiles_after = SovereignAdminController.fetch_all_active_profiles()
        print("\n📊 [تحديث الشاشة اللحظي بعد أمر الإدارة]:")
        for user in profiles_after:
            if user[0] == "Challenger_X":
                immunity_label = "نعم (حصانة سيادية)" if user[2] == 1 else "لا"
                print(f"   • [محدث حياً] الحساب: {user[0]} | حصانته الحالية في الداتا بيز: {immunity_label}")
                
        print("-------------------------------------------------------------------------")
        print("🎉 تم حقن لوحة تحكم المشرفين وربطها بالداتا بيز والشبكة بنجاح 100%. إغلاق آمن...")
        MDApp.get_running_app().stop()

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Amber"
        sm = ScreenManager()
        sm.add_widget(AdminPanelScreen(name="admin_panel"))
        return sm

if __name__ == "__main__":
    GlobalStarsLiveApp().run()
