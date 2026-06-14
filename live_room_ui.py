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
            text="🎥 [ LIVE STREAM FEED ]\nConnecting to Secure Media Server...",
            halign="center",
            theme_text_color="Custom",
            text_color=get_color_from_hex("#757575"),
            font_style="H6",
            pos_hint={"center_x": 0.5, "center_y": 0.5}
        )
        main_layout.add_widget(video_bg)
        main_layout.add_widget(video_placeholder_label)
        
        # 2. شريط الحالة العلوي (الوكالة والماسات المعتمدة)
        top_bar = MDCard(
            size_hint=(0.95, 0.1),
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
        agency_badge = MDLabel(
            text="⚡ Agency: NH Mapped",
            font_style="Caption",
            theme_text_color="Custom",
            text_color=get_color_from_hex("#00E676")
        )
        broadcaster_info.add_widget(broadcaster_name)
        broadcaster_info.add_widget(agency_badge)
        
        # تعديل الخاصية هنا من user_font_size إلى icon_size لحل المشكلة تماماً
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
        
        # 3. نافذة المحادثة الفورية (Live Chat)
        chat_scroll = ScrollView(
            size_hint=(0.9, 0.25),
            pos_hint={"center_x": 0.5, "bottom": 0.15},
            do_scroll_x=False,
            do_scroll_y=True
        )
        self.chat_box = BoxLayout(orientation="vertical", spacing=5, size_hint_y=None)
        self.chat_box.bind(minimum_height=self.chat_box.setter('height'))
        
        self.add_chat_message("⚙️ SYSTEM", "Unified Live Matrix initialized via Core Process.", "#FFD54F")
        self.add_chat_message("👤 User_441", "This platform's speed is insane! Higher than Bigo! 🔥", "#FFFFFF")
        
        chat_scroll.add_widget(self.chat_box)
        main_layout.add_widget(chat_scroll)
        
        # 4. لوحة الدعم الفوري السفلي
        bottom_dock = BoxLayout(
            orientation="horizontal",
            size_hint=(0.95, 0.08),
            pos_hint={"center_x": 0.5, "bottom": 0.02},
            spacing=10
        )
        
        gift_btn = MDRaisedButton(
            text="🎖️ Send Throne Bank Medal",
            md_bg_color=get_color_from_hex("#D4AF37"),
            size_hint_x=0.7,
            on_release=self.trigger_throne_gift
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

    def trigger_throne_gift(self, instance):
        current_diamonds = int(self.diamond_label.text.replace(",", ""))
        new_balance = current_diamonds + 50000
        self.diamond_label.text = f"{new_balance:,}"
        self.add_chat_message("🎖️ CROWN GIFT", "Leader Omar deployed 'وسام بنك العرش' (+50,000 💎)!", "#D4AF37")

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Blue"
        sm = ScreenManager()
        sm.add_widget(LiveStreamingRoom(name="live_room"))
        return sm

if __name__ == "__main__":
    GlobalStarsLiveApp().run()
