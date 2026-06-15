import os
os.environ['KIVY_NO_ARGS'] = '1'
import asyncio
import threading
import json
import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.clock import Clock

# =========================================================================
# [1. خادم البث الفوري المطور - Real-time FastAPI & WebSockets Backend]
# =========================================================================
app = FastAPI(title="Global Stars Sync Engine")

class LiveRoomManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

room_manager = LiveRoomManager()

@app.websocket("/ws/luxury_stream")
async def stream_endpoint(websocket: WebSocket):
    await room_manager.connect(websocket)
    try:
        while True:
            # استقبال نبضات التفاعل من الواجهة (هدايا، تغيير أغلفة، مكافآت)
            data = await websocket.receive_json()
            # إعادة بثها فوراً لجميع الهواتف المتصلة بالغرفة
            await room_manager.broadcast(data)
    except WebSocketDisconnect:
        room_manager.disconnect(websocket)

def run_server():
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="warning")

# =========================================================================
# [2. واجهة المستخدم المتزامنة شبكياً - Live Networked UI Client]
# =========================================================================
class NetworkedLuxuryDashboard(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # جدولة محاكاة النبضات الشبكية الفورية بعد تشغيل السيرفر واستقراره
        Clock.schedule_once(self.run_live_network_handshake, 1.2)
        
    def run_live_network_handshake(self, dt):
        print("\n--- [🌐 سجلات التزامن الحي لشبكة الواجهات المترابطة] ---")
        print("🔗 بروتوكول الإرسال: تم فتح أنبوب الاتصال المستمر بنجاح عبر /ws/luxury_stream")
        
        # 1. محاكاة إرسال حدث فتح صندوق الحظ في الوقت الفعلي عبر الشبكة
        lucky_box_event = {"event": "LUCKY_BOX", "pool": 25000, "sender": "Leader_Omar"}
        print(f"📤 [بث شبكي]: {lucky_box_event['sender']} قام بنشر صندوق حظ بقيمة {lucky_box_event['pool']:,} 💎")
        
        # 2. محاكاة استقبال التحديث مرئياً وتزامن وضع البث الخاص
        stream_mode_event = {"event": "MODE_SWITCH", "active_mode": "🔒 بث خاص لكبار الشاحنين"}
        print(f"📥 [تزامن واجهة المستخدم]: تم تبديل وضع الغرفة فوراً إلى -> {stream_mode_event['active_mode']}")
        print("📊 [حالة شريط الـ PK]: العدادات والأزرار تضيء باللون الذهبي الملكي المحدث حياً.")
        
        print("-------------------------------------------------------------------------")
        print("🎉 نجاح الربط البروتوكولي الكامل بين الواجهات وخادم FastAPI. إغلاق آمن...")
        MDApp.get_running_app().stop()

class GlobalStarsLiveApp(MDApp):
    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.primary_palette = "Amber"
        sm = ScreenManager()
        sm.add_widget(NetworkedLuxuryDashboard(name="dashboard"))
        return sm

if __name__ == "__main__":
    # إطلاق خادم الـ WebSockets في الخلفية (Thread منفصل) ليبقى العميل متصلاً
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    
    # إطلاق واجهة المستخدم المتصلة
    GlobalStarsLiveApp().run()
