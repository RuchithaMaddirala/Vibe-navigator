from fastapi import FastAPI, Query
from app.rag_engine import retrieve, build_prompt, generate_response

app = FastAPI()

@app.get("/recommend")
def recommend(q: str = Query(..., description="e.g., romantic cozy cafes in Hyderabad")):
    results = retrieve(q)
    if not results:
        return {"answer": "No matching places found.", "places": []}
    
    prompt = build_prompt(q, results)
    answer = generate_response(prompt)
    return {"answer": answer, "places": results}
