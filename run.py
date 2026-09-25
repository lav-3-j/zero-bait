import sys
from pathlib import Path
import uvicorn

# Add backend directory to Python path so 'app' is found from root or anywhere
ROOT = Path(__file__).resolve().parent
backend_dir = str(ROOT / "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

if __name__ == "__main__":
    print(f"Starting ZeroBait Server from {ROOT}...")
    print(f"Open your browser at: http://localhost:8000")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
