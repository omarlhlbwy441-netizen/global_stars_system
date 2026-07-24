import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

app = FastAPI(
    title="Global Stars - Live Stream & Game Core",
    description="Full API and Frontend Gateway for Global Stars System",
    version="1.0.0"
)

# Sample API Endpoints for Global Stars System
@app.get("/api/health")
def health_check():
    return {"status": "online", "service": "Global Stars Core System", "version": "1.0.0"}

@app.get("/api/repositories")
def get_repositories():
    return [
        {
            "id": "global_stars_system",
            "name": "Global Stars System App",
            "language": "TypeScript / Python / React",
            "status": "online"
        },
        {
            "id": "Al-Hadiya_AI_Expert",
            "name": "Al-Hadiya AI Expert",
            "language": "Python / FastAPI",
            "status": "online"
        },
        {
            "id": "dtr-system-render",
            "name": "DTR System Gateway",
            "language": "Python / Gateway",
            "status": "online"
        }
    ]

# Serve Static Frontend Files from dist/ if available
dist_dir = os.path.join(os.path.dirname(__file__), "dist")

if os.path.exists(dist_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_dir, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = os.path.join(dist_dir, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_dir, "index.html"))
else:
    @app.get("/")
    def read_root():
        return JSONResponse({"message": "Global Stars API Server is running. Static build loading..."})
