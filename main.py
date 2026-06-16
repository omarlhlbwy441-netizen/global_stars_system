from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI(title="Global Stars System - Design Core", version="1.0.0")

# إعدادات CORS للسماح بالاتصال من تطبيقات الواجهة
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "success", "message": "نواة نظام Global Stars تعمل بكفاءة"}

# ==========================================
# محرك لعبة الخضار (Yummy Party) - اتصال الوقت الفعلي
# ==========================================
class GameConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast_game_state(self, message: dict):
        # بث حالة اللعبة (مثل العد التنازلي 23s، أو نتيجة العجلة) لجميع اللاعبين
        for connection in self.active_connections:
            await connection.send_json(message)

game_manager = GameConnectionManager()

@app.websocket("/ws/yummy-party")
async def websocket_endpoint(websocket: WebSocket):
    await game_manager.connect(websocket)
    try:
        while True:
            # استقبال رهانات اللاعبين (مثال: رهان على الجزر بقيمة 100 عملة)
            data = await websocket.receive_json()
            print(f"تم استلام رهان جديد: {data}")
            
            # هنا سيتم لاحقاً معالجة الرهان، التحقق من الرصيد، وتخزينه في PostgreSQL
            await websocket.send_json({"status": "تم قبول الرهان", "data": data})
    except WebSocketDisconnect:
        game_manager.disconnect(websocket)
