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
from kivy.core.window import Window
from kivy.utils import get_color_from_hex

Window.size = (360, 640)

# ==========================================
# [نواة نظام العائلات البرمجي المربوط]
# ==========================================
class FamilySystem:
    def __init__(self):
        # قاعدة بيانات افتراضية سريعة للعائلات المعتمدة في المنظومة
        self.families = {
            "ARAB_STARS": {
                "name": "👑 عائلة نجوم العرب",
                "leader": "Leader Omar",
                "level": 5,
                "xp": 12500,
                "badge_color": "#FFD54F"
            },
            "VIP_KINGS": {
                "name": "💎 ملوك الـ VIP",
                "leader": "User_441",
                "level": 3,
                "xp": 6200,
                "badge_color": "#29B6F6"
            }
        }

    def add_xp(self, family_id, amount):
        """إضافة نقاط خبرة للعائلة ورفع مستواها تلقائياً عند الدعم"""
        if family_id in self.families:
            self.families[family_id]["xp"] += amount
            # معادلة ترقية المستوى تلقائياً لكل 5000 نقطة
            new_lvl = (self.families[family_id]["xp"] // 5000) + 1
            if new_lvl > self.families[family_id]["level"]:
                self.families[family_id]["level"] = new_lvl
                return True
        return False

# تهيئة النظام عالمياً لربطه بكافة غرف البث
GLOBAL_FAMILY_SYS = FamilySystem()


class LiveStreamingRoom(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        main_layout = FloatLayout()
        
        # 1. منطقة خلفية البث المباشر
        video_bg = MDCard(
            md_bg_color=get_color_from_hex("#121212"),
            radius=[0, 0, 0, 0],
            size_hint=(1, 1),
            pos_hint={"center_x": 0.5, "center_y": 0.5}
        )
        video_placeholder_label = MDLabel(
            text="🎥 [ LIVE STREAM FEED ]\nFamily & Agency Framework Active",
            halign="center",
            theme_text_color="Custom",
            text_color=get_color_from_hex("#757575"),
            font_style="H6",
            pos_hint={"center_x": 0.5, "center_y": 0.5}
        )
        main_layout.add_widget(video_bg)
        main_layout.add_widget(video_placeholder_label)
        
        # 2. شريط الحالة العلوي المحدث (يعرض تفاصيل المذيع، الوكالة، والأسرة)
        top_bar = MDCard(
            size_hint=(0.95, 0.12),
            pos_hint={"center_x": 0.5, "top": 0.98},
            md_bg_color=get_color_from_hex("#1A1A1A"),
            radius=[15, 15, 15, 15],
            padding=10,
            elevation=4
        )
        top_bar_layout = BoxLayout(orientation="horizontal", spacing=10)
        
        broadcaster_info = BoxLayout(orientation="vertical", size_hint_x=0.6)
        broadcaster_name = MDLabel(
            text="👑 Leader Omar (Broadcaster)",
            font_style="Subtitle2",
            theme_text_color="Custom",
            text_color=get_color_from_hex("#FFFFFF")
        )
        
        # ربط واجهة العائلة الحالية والوكالة
        current_family = GLOBAL_FAMILY_SYS.families["ARAB_STARS"]
        status_text = f"⚡ Agency: NH  |  {current_family['name']} (Lvl {current_family['level']})"
        self.system_badge = MDLabel(
            text=status_text,
            font_style="Caption",
            theme_text_color="Custom",
            text_color=get_color_from_hex("#00E676")
        )
        broadcaster_info.add_widget(broadcaster_name)
        broadcaster_info.add_widget(self.system_badge)
        
        diamond_counter = BoxLayout(orientation="horizontal", size_hint_x=0.4, spacing=5, pos_hint={"center_y": 0.5})
        diamond_icon = MDIconButton(
            icon="diamond", 
            theme_text_color="Custom", 
            text_color=get_color_from_hex("#29B6F6"),
            icon_size="20sp"
        )
        self.diamond_label = MDLabel(
            text="50,000",
            font_style="Button",
            theme_text_color="Custom",
            text_color=get_color_from_hex("#29B6F6")
        )
        diamond_counter.add_widget(diamond_icon)
        diamond_counter.add_widget(self.diamond_label)
        
        top_bar_layout.add_widget(broadcaster_info)
        top_bar_layout.add_widget(diamond_counter)
        top_bar.add_widget(top_bar_layout)
        main_layout.add_widget(top_bar)
        
        # 3. نافذة المحادثة الفورية (Live Chat) مع دعم إشعارات العائلات
        chat_scroll = ScrollView(
            size_hint=(0.9, 0.25),
            pos_hint={"center_x": 0.5, "bottom": 0.15},
            do_scroll_x=False,
            do_scroll_y=True
        )
        self.chat_box = BoxLayout(orientation="vertical", spacing=5, size_hint_y=None)
        self.chat_box.bind(minimum_height=self.chat_box.setter('height'))
        
        self.add_chat_message("⚙️ SYSTEM", "Family Integration Core successfully linked.", "#FFD54F")
        self.add_chat_message("🛡️ GH_Agent", "All system processes mapped securely.", "#00E676")
        
        chat_scroll.add_widget(self.chat_box)
        main_layout.add_widget(chat_scroll)
        
        # 4. لوحة الدعم السفلي الإستراتيجية
        bottom_dock = BoxLayout(
            orientation="horizontal",
            size_hint=(0.95, 0.08),
            pos_hint={"center_x": 0.5, "bottom": 0.02},
            spacing=10
        )
        
        gift_btn = MDRaisedButton(
            text="🎖️ Send Family Throne Medal",
            md_bg_color=get_color_from_hex("#D4AF37"),
            size_hint_x=0.7,
            on_release=self.trigger_family_throne_gift
        )
        
        exit_btn = MDIconButton(
            icon="close-circle",
            theme_text_color="Custom",
            text_color=get_color_from_hex("#EF5350"),
            icon_size="32sp",
            size_hint_x=0.3
        )
        
        bottom_dock.add_widget(gift_btn)
        bottom_dock.add_widget(exit_btn)
        main_layout.add_widget(bottom_dock)
        
        self.add_widget(main_layout)

    def add_chat_message(self, sender, text, color_hex):
        message_label = MDLabel(
            text=f"[b]{sender}:[/b] {text}",
            markup=True,
            theme_text_color="Custom",
            text_color=get_color_from_hex(color_hex),
            font_style="Caption",
            size_hint_y=None,
            height=30
        )
        self.chat_box.add_widget(message_label)

    def trigger_family_throne_gift(self, instance):
        """معالجة الدعم المالي لعداد المذيع ونقاط خبرة العائلة في نفس النبضة"""
        # 1. تحديث عداد المنح الماسية للمذيع (+50,000 جوهرة)
        current_diamonds = int(self.diamond_label.text.replace(",", ""))
        new_balance = current_diamonds + 50000
        self.diamond_label.text = f"{new_balance:,}"
        
        # 2. ربط ودفع نقاط الخبرة لعائلة "نجوم العرب" (+10000 XP) ومتابعة الترقية
        family_id = "ARAB_STARS"
        is_leveled_up = GLOBAL_FAMILY_SYS.add_xp(family_id, 10000)
        f_data = GLOBAL_FAMILY_SYS.families[family_id]
        
        # 3. تحديث شريط الحالة العلوي فوراً بالبيانات المربوطة الجديدة
        self.system_badge.text = f"⚡ Agency: NH  |  {f_data['name']} (Lvl {f_data['level']})"
        
        # 4. بث الرسالة التفاعلية المزدوجة في شات الغرفة أمام الجمهور
        self.add_chat_message("🎖️ FAMILY SUPPORT", f"Leader Omar supported the broadcaster! (+50,000 💎)", "#D4AF37")
        self.add_chat_message("🔥 FAMILY XP", f"{f_data['name']} gained +10,000 XP! (Total XP: {f_data['xp']:,})", "#29B6F6")
        
        if is_leveled_up:
            self.add_chat_message("🎉 LEVEL UP", f"✨ Congratulation! {f_data['name']} leveled up to Level {f_data['level']}! ✨", "#00E676")

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Blue"
        sm = ScreenManager()
        sm.add_widget(LiveStreamingRoom(name="live_room"))
        return sm

if __name__ == "__main__":
    GlobalStarsLiveApp().run()
