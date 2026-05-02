from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import shutil
import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()


app = FastAPI(title="FabricAI Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Dynamic path setup (FIX)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "best.pt")

# 🔥 LOAD YOUR MODEL
model = YOLO(model_path)

# 🔹 Mapping function
def map_to_main_class(label):
    if "cotton" in label.lower():
        return "Cotton"
    elif "silk" in label.lower():
        return "Silk"
    elif "wool" in label.lower():
        return "Wool"
    elif "polyester" in label.lower():
        return "Polyester"
    else:
        return label

@app.get("/")
def read_root():
    return {"message": "FabricAI Backend is running!", "mode": "AI"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "mode": "AI", "message": "Using trained YOLO model"}

@app.post("/classify/")
async def classify_fabric(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 🔥 MODEL PREDICTION
    results = model.predict(file_path)

    probs = results[0].probs

    predictions = []

    # Top 5 predictions
    for i in range(min(5, len(probs.data))):
        class_id = int(probs.top5[i])
        label = model.names[class_id]
        confidence = float(probs.top5conf[i])

        predictions.append({
            "fabric_type": map_to_main_class(label),
            "confidence": round(confidence, 2)
        })

    # Cleanup
    os.remove(file_path)

    return {
        "success": True,
        "predictions": predictions,
        "mode": "AI"
    }


if __name__ == "__main__":
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host=host, port=port, reload=True)