from kivymd.app import MDApp
from kivymd.uix.screenmanager import MDScreenManager
from kivymd.uix.screen import MDScreen
from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.button import MDRaisedButton, MDIconButton
from kivymd.uix.label import MDLabel
from kivymd.uix.textfield import MDTextField
from kivy.core.window import Window

Window.size = (360, 640)

class LiveRoomScreen(MDScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = "live_room"
        
        main_layout = MDBoxLayout(orientation='vertical')
        
        # 1. مساحة عرض فيديو البث المباشر (Camera/Video Placeholder)
        video_area = MDBoxLayout(md_bg_color=(0.1, 0.1, 0.1, 1), size_hint_y=0.4)
        video_area.add_widget(MDLabel(text="[ كاميرا البث المباشر ]", halign="center", theme_text_color="Custom", text_color=(1,1,1,1)))
        main_layout.add_widget(video_area)
        
        # 2. منطقة التفاعل (المحادثات والهدايا) ولعبة الخضار
        interaction_layout = MDBoxLayout(orientation='horizontal', size_hint_y=0.6)
        
        # قسم المحادثات (يسار الشاشة)
        chat_layout = MDBoxLayout(orientation='vertical', size_hint_x=0.5, padding=10)
        self.chat_history = MDLabel(text="مرحباً بك في البث!\n", theme_text_color="Secondary", valign="top")
        self.chat_input = MDTextField(hint_text="اكتب رسالة...", size_hint_y=None, height=40)
        
        send_btn = MDRaisedButton(text="إرسال", on_release=self.send_chat)
        gift_btn = MDRaisedButton(text="🎁 إرسال هدية", md_bg_color=(0.8, 0.2, 0.5, 1), on_release=self.send_gift)
        
        chat_layout.add_widget(self.chat_history)
        chat_layout.add_widget(self.chat_input)
        chat_layout.add_widget(send_btn)
        chat_layout.add_widget(gift_btn)
        
        # قسم لعبة الخضار (يمين الشاشة)
        game_layout = MDBoxLayout(orientation='vertical', size_hint_x=0.5, padding=10, md_bg_color=(0.15, 0.15, 0.2, 1))
        game_layout.add_widget(MDLabel(text="عجلة Yummy Party", halign="center", font_style="Subtitle1", theme_text_color="Primary"))
        game_layout.add_widget(MDLabel(text="الوقت: 15 ثانية", halign="center", theme_text_color="Error"))
        
        # أزرار الرهانات
        game_layout.add_widget(MDRaisedButton(text="🥕 جزر (10)", on_release=lambda x: self.place_bet("جزر"), md_bg_color=(1, 0.5, 0, 1)))
        game_layout.add_widget(MDRaisedButton(text="🍅 طماطم (10)", on_release=lambda x: self.place_bet("طماطم"), md_bg_color=(0.8, 0.1, 0.1, 1)))
        game_layout.add_widget(MDRaisedButton(text="🍖 لحم (50)", on_release=lambda x: self.place_bet("لحم"), md_bg_color=(0.5, 0.2, 0.2, 1)))
        
        interaction_layout.add_widget(chat_layout)
        interaction_layout.add_widget(game_layout)
        
        main_layout.add_widget(interaction_layout)
        self.add_widget(main_layout)

    def send_chat(self, instance):
        if self.chat_input.text:
            self.chat_history.text += f"أنت: {self.chat_input.text}\n"
            self.chat_input.text = ""

    def send_gift(self, instance):
        self.chat_history.text += f"✨ أرسلت هدية للمضيف!\n"

    def place_bet(self, item):
        self.chat_history.text += f"🎮 راهنت على {item}\n"

class GlobalStarsApp(MDApp):
    def build(self):
        self.theme_cls.primary_palette = "DeepPurple"
        self.theme_cls.theme_style = "Dark"
        
        sm = MDScreenManager()
        sm.add_widget(LiveRoomScreen())
        return sm

if __name__ == "__main__":
    GlobalStarsApp().run()