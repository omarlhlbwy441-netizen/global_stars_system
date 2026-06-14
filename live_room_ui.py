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

Window.size = (360, 640)

# =========================================================================
# [المحرك البرمجي المركزي لإدارة التنافسيات - Competition Core Engine]
# =========================================================================
class CompetitionEngine:
    def __init__(self):
        # 1. تصنيف الوكالات ونقاط التنافس (Agency Points)
        self.agencies = {"NH": 150000, "GH": 120000, "OA": 95000, "OSA": 80000}
        
        # 2. تصنيف العائلات (Family Ranking)
        self.families = {
            "ARAB_STARS": {"name": "👑 نجوم العرب", "points": 45000},
            "VIP_KINGS": {"name": "💎 ملوك VIP", "points": 38000}
        }
        
        # 3. تحدي المذيعين الحالي (Live PK: Host A vs Host B)
        self.live_pk = {"Host_A_Omar": 25000, "Host_B_Challenger": 20000}
        
        # 4. لوحة كبار الشاحنين والداعمين (Whales & Top Givers)
        self.top_givers = [
            {"name": "قائد المنظومة", "level": "KONG_👑", "total_donated": 1500000},
            {"name": "Whale_VIP_441", "level": "Titan_💎", "total_donated": 900000},
            {"name": "Saudi_Prince", "level": "Knight_⚔️", "total_donated": 600000}
        ]

    def Inject_Global_Support(self, giver_name, amount, target_host, family_id, agency_id):
        """حقن الدعم الشامل وتحديث كافة أنظمة التنافس (المذيع، العائلة، الوكالة، والداعم) في نبضة واحدة"""
        # تحديث نقاط المذيع في الـ PK الحي
        if target_host in self.live_pk:
            self.live_pk[target_host] += amount
            
        # تحديث نقاط العائلة في التحدي الجماعي
        if family_id in self.families:
            self.families[family_id]["points"] += amount
            
        # تحديث رصيد الوكالة في مصفوفة السيادة
        if agency_id in self.agencies:
            self.agencies[agency_id] += amount
            
        # تحديث رصيد الداعم أو إضافته بكبار الشاحنين
        for giver in self.top_givers:
            if giver["name"] == giver_name:
                giver["total_donated"] += amount
                break

GLOBAL_COMP_ENGINE = CompetitionEngine()


class LiveStreamingRoom(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        main_layout = FloatLayout()
        
        # خلفية البث
        video_bg = MDCard(md_bg_color=get_color_from_hex("#121212"), radius=[0, 0, 0, 0], size_hint=(1, 1))
        main_layout.add_widget(video_bg)
        
        # 1. شريط الـ PK التنافسي المباشر للمذيعين (Live Creators PK Bar)
        pk_card = MDCard(
            size_hint=(0.95, 0.08), pos_hint={"center_x": 0.5, "top": 0.98},
            md_bg_color=get_color_from_hex("#212121"), radius=[10, 10, 10, 10], padding=5
        )
        pk_layout = BoxLayout(orientation="vertical", spacing=2)
        
        # أسماء المذيعين المتنافسين ونقاطهم الحية
        self.pk_scores_label = MDLabel(
            text="👑 Omar: 25,000 Pts  ⚡ VS ⚡  Challenger: 20,000 Pts",
            halign="center", font_style="Caption", theme_text_color="Custom", text_color=get_color_from_hex("#FF8A80")
        )
        # شريط التقدم المرئي للتنافس
        self.pk_progress = ProgressBar(max=50000, value=25000, size_hint_y=None, height=10)
        
        pk_layout.add_widget(self.pk_scores_label)
        pk_layout.add_widget(self.pk_progress)
        pk_card.add_widget(pk_layout)
        main_layout.add_widget(pk_card)

        # 2. لوحة معلومات السيادة والتنافس الكلي (الوكالات والعوائل والشاحنين)
        info_panel = MDCard(
            size_hint=(0.95, 0.22), pos_hint={"center_x": 0.5, "top": 0.89},
            md_bg_color=get_color_from_hex("#1A1A1A"), radius=[12, 12, 12, 12], padding=8
        )
        info_layout = BoxLayout(orientation="vertical", spacing=2)
        
        info_layout.add_widget(MDLabel(text="🏛️ مصفوفة صدارة التنافس العام للمنظومة:", font_style="Subtitle2", text_color=get_color_from_hex("#FFD54F")))
        
        # تحديث نصوص الصدارة للوكالات والعوائل وكبار الشاحنين
        self.agency_rank_label = MDLabel(text="• صدارة الوكالات: NH (150k) | GH (120k) | OA (95k)", font_style="Caption", text_color=get_color_from_hex("#00E676"))
        self.family_rank_label = MDLabel(text="• حروب العائلات: 👑 نجوم العرب (45k) VS 💎 ملوك VIP (38k)", font_style="Caption", text_color=get_color_from_hex("#29B6F6"))
        self.whale_rank_label = MDLabel(text="• كبير الشاحنين: قائد المنظومة (1.5M 💎) [الملك الملكي]", font_style="Caption", text_color=get_color_from_hex("#E0E0E0"))
        
        info_layout.add_widget(self.agency_rank_label)
        info_layout.add_widget(self.family_rank_label)
        info_layout.add_widget(self.whale_rank_label)
        info_panel.add_widget(info_layout)
        main_layout.add_widget(info_panel)
        
        # 3. نافذة شات البث والتدقيق الفوري
        chat_scroll = ScrollView(size_hint=(0.9, 0.25), pos_hint={"center_x": 0.5, "bottom": 0.15}, do_scroll_x=False, do_scroll_y=True)
        self.chat_box = BoxLayout(orientation="vertical", spacing=5, size_hint_y=None)
        self.chat_box.bind(minimum_height=self.chat_box.setter('height'))
        
        self.add_chat_message("⚙️ SYSTEM", "All 4 Competition Systems Activated and Cross-Linked.", "#FFD54F")
        self.add_chat_message("👑 Leader Omar", "The platform architecture is now complete.", "#FFFFFF")
        
        chat_scroll.add_widget(self.chat_box)
        main_layout.add_widget(chat_scroll)
        
        # 4. لوحة الإطلاق وضخ الدعم التنافسي الخارق
        bottom_dock = BoxLayout(orientation="horizontal", size_hint=(0.95, 0.08), pos_hint={"center_x": 0.5, "bottom": 0.02}, spacing=10)
        
        # زر الدعم التنافسي الخارق لحقن 50,000 في جميع مستويات التنافس دفعة واحدة
        comp_gift_btn = MDRaisedButton(
            text="🔥 Inject Mega Competition Support (+50,000)",
            md_bg_color=get_color_from_hex("#E53935"),
            size_hint_x=1,
            on_release=self.trigger_matrix_competition
        )
        bottom_dock.add_widget(comp_gift_btn)
        main_layout.add_widget(bottom_dock)
        
        self.add_widget(main_layout)

    def add_chat_message(self, sender, text, color_hex):
        message_label = MDLabel(
            text=f"[b]{sender}:[/b] {text}", markup=True,
            theme_text_color="Custom", text_color=get_color_from_hex(color_hex),
            font_style="Caption", size_hint_y=None, height=25
        )
        self.chat_box.add_widget(message_label)

    def trigger_matrix_competition(self, instance):
        """نبضة الدعم التنافسي الموحد لإشعال الحروب الأربعة برمجياً ومرئياً"""
        # 1. ضخ الدعم في النواة المركزية للتحديات
        giver = "قائد المنظومة"
        amount = 50000
        GLOBAL_COMP_ENGINE.Inject_Global_Support(giver, amount, "Host_A_Omar", "ARAB_STARS", "NH")
        
        # 2. تحديث شريط الـ PK الحي بين المذيعين على الواجهة واختراق المؤشر
        pk = GLOBAL_COMP_ENGINE.live_pk
        self.pk_scores_label.text = f"👑 Omar: {pk['Host_A_Omar']:,} Pts  ⚡ VS ⚡  Challenger: {pk['Host_B_Challenger']:,} Pts"
        self.pk_progress.max = pk['Host_A_Omar'] + pk['Host_B_Challenger']
        self.pk_progress.value = pk['Host_A_Omar']
        
        # 3. تحديث لوحة التنافس العام للوكالات والأسرة وكبار الشاحنين فوراً
        agencies = GLOBAL_COMP_ENGINE.agencies
        f_stars = GLOBAL_COMP_ENGINE.families["ARAB_STARS"]
        f_vip = GLOBAL_COMP_ENGINE.families["VIP_KINGS"]
        whale = GLOBAL_COMP_ENGINE.top_givers[0]
        
        self.agency_rank_label.text = f"• صدارة الوكالات: NH ({agencies['NH']:,}) | GH ({agencies['GH']:,}) | OA ({agencies['OA']:,})"
        self.family_rank_label.text = f"• حروب العائلات: {f_stars['name']} ({f_stars['points']:,}) VS {f_vip['name']} ({f_vip['points']:,})"
        self.whale_rank_label.text = f"• كبير الشاحنين: {whale['name']} ({whale['total_donated']:,} 💎) [{whale['level']}]"
        
        # 4. بث نبضات الشات الحربية التنافسية أمام الجمهور
        self.add_chat_message("⚔️ PK WAR", f"🏆 {giver} Injected +50,000 Points to Host Omar!", "#E53935")
        self.add_chat_message("🛡️ FAMILY WAR", f"🔥 عائلة {f_stars['name']} سحقت ملووك VIP وتقدمت إلى {f_stars['points']:,} نقطة!", "#29B6F6")
        self.add_chat_message("🏛️ AGENCY BLOCK", f"⚡ الوكالة السيادية NH ترفع هيمنتها الكلية إلى {agencies['NH']:,} نقطة!", "#00E676")

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Red"
        sm = ScreenManager()
        sm.add_widget(LiveStreamingRoom(name="live_room"))
        return sm

if __name__ == "__main__":
    GlobalStarsLiveApp().run()
