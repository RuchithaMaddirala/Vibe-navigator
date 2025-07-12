import os
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME = "all-MiniLM-L6-v2"
EMBEDDINGS_PATH = "app/data/embeddings.npy"
METADATA_PATH = "app/data/metadata.json"
TOP_K = 3
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
