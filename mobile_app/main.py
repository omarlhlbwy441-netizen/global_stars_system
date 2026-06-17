from kivymd.app import MDApp
from kivymd.uix.screen import MDScreen
from kivymd.uix.button import MDRaisedButton
from kivymd.uix.label import MDLabel
from kivy.core.window import Window

# تحديد حجم شاشة افتراضي يحاكي الهاتف أثناء الفحص
Window.size = (360, 640)

class GlobalStarsApp(MDApp):
    def build(self):
        self.theme_cls.primary_palette = "DeepPurple"
        self.theme_cls.theme_style = "Dark"
        
        screen = MDScreen()
        
        self.status_label = MDLabel(
            text="نظام البثوث والوكالات - بانتظار الاتصال بالخادم...",
            halign="center",
            pos_hint={"center_x": 0.5, "center_y": 0.7},
            theme_text_color="Primary"
        )
        
        connect_btn = MDRaisedButton(
            text="دخول النظام",
            pos_hint={"center_x": 0.5, "center_y": 0.5},
            on_release=self.connect_to_core
        )
        
        screen.add_widget(self.status_label)
        screen.add_widget(connect_btn)
        return screen
        
    def connect_to_core(self, instance):
        self.status_label.text = "جاري الاتصال بنواة السيرفر المباشر..."
        # سيتم برمجة طلبات الـ API هنا لربطها بلعبة الخضار والبثوث

if __name__ == '__main__':
    GlobalStarsApp().run()