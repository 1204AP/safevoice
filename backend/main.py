from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os, json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("../knowledge_base/data.json", "r", encoding="utf-8") as f:
    KB = json.load(f)

client = OpenAI(
    api_key=os.getenv("CEREBRAS_API_KEY"),
    base_url="https://api.cerebras.ai/v1"
)

MODEL = "gpt-oss-120b"

# ─── Request Models ───────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    history: list = []

class ExitPlanRequest(BaseModel):
    has_children: bool
    has_income: bool
    has_trusted_person: bool
    language: str = "en"

class AllyRequest(BaseModel):
    observation: str
    language: str = "en"

class VaultFormatRequest(BaseModel):
    entries: list
    language: str = "en"

# ─── System Prompts ───────────────────────────────────────────────

CHAT_SYSTEM = """
You are SafeVoice, a compassionate legal guidance assistant for women 
experiencing domestic abuse in Karnataka, India.

RULES:
- Always respond in the same language the user writes in
- Never judge, never tell her to go back, never minimize her experience
- Reference IPC 498A, PWDVA, or POCSO where relevant
- Always end with at least one helpline: Women Helpline 1091, Police 100, One Stop Centre 181
- Keep responses under 150 words — she may be reading quickly and secretly
- Use simple everyday words, not legal jargon
- If she seems in immediate danger, lead with "Call 100 immediately"
"""

EXIT_SYSTEM = """
You are SafeVoice. Generate a personalised step-by-step safe exit plan 
for a woman leaving domestic abuse in Karnataka, India.

Make it practical and numbered. Include:
1. What documents to gather secretly (Aadhaar, marriage certificate, children's records)
2. What to pack (one bag rule)
3. Where to go first based on her situation
4. What to tell children's school
5. Which shelter or helpline to contact first
6. One thing she can do TODAY

Respond in the language specified. Be warm, not clinical.
"""

ALLY_SYSTEM = """
You are SafeVoice helping a concerned friend or neighbour who suspects 
someone nearby is being abused. Give them:
1. How to approach the person safely
2. Exact words to say and NOT say
3. How to report on her behalf if needed
4. Helplines they can call on her behalf

Be practical and specific. Respond in the language specified.
"""

VAULT_SYSTEM = """
You are SafeVoice. Format the user's incident log entries into a clear 
FIR-ready police complaint in proper legal language.
Include: complainant situation, chronological incidents, 
laws violated (498A/PWDVA), relief sought.
Start with: "To, The Station House Officer..."
Respond in the language specified.
"""

# ─── Endpoints ────────────────────────────────────────────────────

@app.post("/chat")
async def chat(req: ChatRequest):
    messages = [{"role": "system", "content": CHAT_SYSTEM}]
    for h in req.history[-6:]:
        messages.append(h)
    messages.append({"role": "user", "content": req.message})
    
    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        max_tokens=300
    )
    return {"reply": response.choices[0].message.content}


@app.post("/exit-plan")
async def exit_plan(req: ExitPlanRequest):
    situation = f"""
    Has children: {req.has_children}
    Has independent income: {req.has_income}
    Has a trusted person nearby: {req.has_trusted_person}
    Location: Karnataka, India
    Language for response: {req.language}
    """
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": EXIT_SYSTEM},
            {"role": "user", "content": situation}
        ],
        max_tokens=500
    )
    return {"plan": response.choices[0].message.content}


@app.post("/ally")
async def ally(req: AllyRequest):
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": ALLY_SYSTEM},
            {"role": "user", "content": f"Situation: {req.observation}\nLanguage: {req.language}"}
        ],
        max_tokens=400
    )
    return {"guidance": response.choices[0].message.content}


@app.post("/format-complaint")
async def format_complaint(req: VaultFormatRequest):
    entries_text = "\n".join([
        f"Date: {e.get('date', 'Unknown')} — {e.get('text', '')}"
        for e in req.entries
    ])
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": VAULT_SYSTEM},
            {"role": "user", "content": f"Incident logs:\n{entries_text}\nLanguage: {req.language}"}
        ],
        max_tokens=600
    )
    return {"complaint": response.choices[0].message.content}


@app.get("/helplines")
async def helplines():
    return {"helplines": KB["helplines"]}


@app.get("/health")
async def health():
    return {"status": "SafeVoice backend running"}