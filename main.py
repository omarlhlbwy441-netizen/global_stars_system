from fastapi import FastAPI, WebSocket
import random

app = FastAPI(title="Global Stars Core", version="1.0")

@app.get("/")
def read_root():
    return {"message": "مرحباً بكم في نظام البثوث والوكالات"}

# --- مسار الوكالات ---
@app.post("/api/v1/agencies/create")
def create_agency(name: str, owner_id: str):
    return {"status": "success", "agency_name": name, "owner": owner_id, "message": "تم تسجيل الوكالة بنجاح"}

# --- مسار البث المباشر (WebSockets) ---
@app.websocket("/ws/stream/{stream_id}")
async def live_stream(websocket: WebSocket, stream_id: str):
    await websocket.accept()
    await websocket.send_text(f"تم الاتصال بخادم البثوث المباشرة للغرفة: {stream_id}")

# --- مسار لعبة الخضار ---
@app.post("/api/v1/games/vegetable/play")
def play_vegetable_game(bet_amount: int, choice: str):
    items = ["طماطم", "خيار", "جزر", "باذنجان"]
    winning_item = random.choice(items)
    if choice == winning_item:
        return {"status": "win", "result": winning_item, "prize": bet_amount * 2}
    return {"status": "lose", "result": winning_item, "lost": bet_amount}