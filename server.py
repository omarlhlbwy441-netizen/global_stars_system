from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import json

app = FastAPI(title="Global Stars - Live Stream & Game Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        # إدارة غرف البث (كل غرفة لها قائمة من الاتصالات)
        self.active_rooms: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = []
        self.active_rooms[room_id].append(websocket)

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.active_rooms:
            self.active_rooms[room_id].remove(websocket)
            if not self.active_rooms[room_id]:
                del self.active_rooms[room_id]

    async def broadcast_to_room(self, room_id: str, message: dict):
        if room_id in self.active_rooms:
            for connection in self.active_rooms[room_id]:
                await connection.send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/live/{room_id}")
async def live_room_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket, room_id)
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            # معالجة أنواع البيانات (محادثة، هدايا، مراهنات لعبة الخضار)
            action = payload.get("action")
            
            if action == "chat":
                await manager.broadcast_to_room(room_id, {"type": "chat", "user": payload.get("user"), "text": payload.get("text")})
            
            elif action == "gift":
                # هنا سيتم خصم الجواهر من قاعدة البيانات لاحقاً
                await manager.broadcast_to_room(room_id, {"type": "gift", "user": payload.get("user"), "gift_name": payload.get("gift_name")})
                
            elif action == "bet":
                await manager.broadcast_to_room(room_id, {"type": "game_update", "message": f"تم تسجيل رهان على {payload.get('item')}"})
                
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
        await manager.broadcast_to_room(room_id, {"type": "system", "text": "غادر أحد المشاهدين الغرفة."})