import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from app.config import *

# Setup Gemini
genai.configure(api_key=GOOGLE_API_KEY)
llm = genai.GenerativeModel("models/gemini-2.5-flash")

# Load embeddings and metadata
embeddings = np.load(EMBEDDINGS_PATH)
with open(METADATA_PATH) as f:
    metadata = json.load(f)

# Normalize embeddings
def normalize(x):
    return x / np.linalg.norm(x, axis=1, keepdims=True)

embeddings = normalize(embeddings)
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

# Sentence transformer for queries
embedder = SentenceTransformer(MODEL_NAME)

def retrieve(query: str):
    vec = embedder.encode([query])
    vec = normalize(np.array(vec)).astype("float32")
    D, I = index.search(vec, TOP_K)
    return [metadata[i] for i in I[0]]

def build_prompt(query: str, results: list):
    context = ""
    for place in results:
        context += f"- {place['name']} ({place.get('rating', '?')}⭐): {place.get('summary', '')}\n"
        review = place.get("reviews", ["No review"])[0]
        context += f"  Review: {review}\n"
    prompt = f"""
User is looking for: "{query}"

Here are the top matching places:
{context}

Give a warm, friendly recommendation of 1–2 spots in a conversational tone. Use real user reviews to support your suggestion.
"""
    return prompt

def generate_response(prompt: str) -> str:
    response = llm.generate_content(prompt)
    return response.text.strip()
