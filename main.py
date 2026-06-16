from kivymd.app import MDApp
from kivymd.uix.screen import MDScreen
from kivymd.uix.button import MDRaisedButton
from kivymd.uix.label import MDLabel
from kivy.core.window import Window

# إعداد حجم الشاشة التقريبي للهاتف (للتجربة)
Window.size = (360, 640)

class YummyPartyScreen(MDScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
        # عنوان اللعبة
        self.add_widget(
            MDLabel(
                text="Yummy Party - لعبة الخضار",
                halign="center",
                pos_hint={"center_y": 0.85},
                font_style="H5"
            )
        )
        
        # منطقة عجلة الحظ أو العداد الزمني (سيتم برمجتها لاحقاً)
        self.add_widget(
            MDLabel(
                text="العداد الزمني: 23s",
                halign="center",
                pos_hint={"center_y": 0.65},
                theme_text_color="Error"
            )
        )
        
        # زر مراهنة تجريبي (مثال: الجزر)
        self.bet_btn = MDRaisedButton(
            text="مراهنة بـ 10 ذهب (جزر)",
            pos_hint={"center_x": 0.5, "center_y": 0.4},
            md_bg_color=(1, 0.5, 0, 1) # لون برتقالي
        )
        self.bet_btn.bind(on_release=self.place_bet)
        self.add_widget(self.bet_btn)

    def place_bet(self, instance):
        # هذه الدالة سترتبط لاحقاً بـ WebSockets لإرسال الرهان للخادم
        print("تم إرسال الرهان بنجاح إلى الخادم!")

class GlobalStarsApp(MDApp):
    def build(self):
        self.theme_cls.primary_palette = "BlueGray"
        self.theme_cls.theme_style = "Dark" # تفعيل الوضع الليلي للمنظومة
        return YummyPartyScreen()

if __name__ == "__main__":
    GlobalStarsApp().run()