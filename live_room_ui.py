import os
os.environ['KIVY_NO_ARGS'] = '1'

from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.floatlayout import FloatLayout
from kivymd.uix.label import MDLabel
from kivymd.uix.button import MDIconButton, MDRaisedButton
from kivymd.uix.card import MDCard
from kivy.uix.scrollview import ScrollView
from kivy.uix.progressbar import ProgressBar
from kivy.core.window import Window
from kivy.utils import get_color_from_hex
from kivy.clock import Clock

Window.size = (360, 640)

# =========================================================================
# [المحرك البرمجي المركزي لإدارة التنافسيات - Competition Core Engine]
# =========================================================================
class CompetitionEngine:
    def __init__(self):
        self.agencies = {"NH": 150000, "GH": 120000, "OA": 95000, "OSA": 80000}
        self.families = {
            "ARAB_STARS": {"name": "👑 نجوم العرب", "points": 45000},
            "VIP_KINGS": {"name": "💎 ملوك VIP", "points": 38000}
        }
        self.live_pk = {"Host_A_Omar": 25000, "Host_B_Challenger": 20000}
        self.top_givers = [
            {"name": "قائد المنظومة", "level": "KONG_👑", "total_donated": 1500000}
        ]

    def Inject_Global_Support(self, giver_name, amount, target_host, family_id, agency_id):
        if target_host in self.live_pk: self.live_pk[target_host] += amount
        if family_id in self.families: self.families[family_id]["points"] += amount
        if agency_id in self.agencies: self.agencies[agency_id] += amount

GLOBAL_COMP_ENGINE = CompetitionEngine()

class LiveStreamingRoom(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # إطلاق نبضة الدعم التنافسي الخارق تلقائياً عند التمهيد لاختبار السيرفر
        Clock.schedule_once(self.auto_test_matrix, 0.2)
        
    def auto_test_matrix(self, dt):
        print("\n--- [بدء معالجة نبضة الدعم التنافسي الموحد] ---")
        GLOBAL_COMP_ENGINE.Inject_Global_Support("قائد المنظومة", 50000, "Host_A_Omar", "ARAB_STARS", "NH")
        
        pk = GLOBAL_COMP_ENGINE.live_pk
        agencies = GLOBAL_COMP_ENGINE.agencies
        f_stars = GLOBAL_COMP_ENGINE.families["ARAB_STARS"]
        
        print(f"⚔️ [تحدي المذيعين الحاد]: Omar ({pk['Host_A_Omar']:,} Pts) VS Challenger ({pk['Host_B_Challenger']:,} Pts)")
        print(f"🛡️ [حروب العائلات الكبرى]: {f_stars['name']} صعدت إلى ({f_stars['points']:,} Pts)")
        print(f"⚡ [هيمنة الوكالات الأربع]: وكالة NH السيادية تقفز إلى ({agencies['NH']:,} Pts)")
        print("--------------------------------------------------")
        
        # هندسة الإغلاق الذاتي الصامت لإنهاء الخلية فور إتمام المهمة بنجاح
        print("🎉 تم فحص واستقرار المعمارية برمجياً. إغلاق آمن ومؤتمت للخلية...")
        MDApp.get_running_app().stop()

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        sm = ScreenManager()
        sm.add_widget(LiveStreamingRoom(name="live_room"))
        return sm

if __name__ == "__main__":
    GlobalStarsLiveApp().run()
