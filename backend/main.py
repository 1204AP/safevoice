# # backend/main.py
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from typing import Optional, List, Dict, Any
# import anthropic
# import os

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# LANG_NAMES = {"en": "English", "kn": "Kannada", "hi": "Hindi", "te": "Telugu"}

# # ── MODELS ──────────────────────────────────────────────────────────────────

# class ChatRequest(BaseModel):
#     message: str
#     language: str
#     history: List[Dict[str, str]] = []

# class ExitPlanChatRequest(BaseModel):
#     language: str
#     context: Dict[str, Any] = {}
#     lastAnswer: str
#     questionId: str
#     history: List[Dict[str, str]] = []

# class AllyChatRequest(BaseModel):
#     language: str
#     context: Dict[str, Any] = {}
#     lastAnswer: str
#     questionId: str
#     history: List[Dict[str, str]] = []

# # ── CHAT (Legal Help) ────────────────────────────────────────────────────────

# CHAT_SYSTEM = """You are SafeVoice, a compassionate and knowledgeable legal guidance assistant 
# for domestic abuse survivors in India. You respond in {lang}.

# Your role:
# - Provide empathetic, human-like responses (not robotic or formal)
# - Give clear, actionable legal information relevant to India (Protection of Women from Domestic Violence Act, IPC sections, etc.)
# - Structure responses with:
#   • A short empathetic opening (1-2 sentences)
#   • A LEGAL SUMMARY section (brief, plain language)
#   • IMMEDIATE SAFETY STEPS numbered list (practical, specific)
#   • What to do NEXT (one clear action)
# - Always mention relevant helplines: 181 (Women Helpline), 100 (Police), 1091 (Women in Distress)
# - Never be dismissive. Never blame the victim.
# - Keep responses concise but complete.
# - If urgent danger, prioritize safety over legal advice."""

# @app.post("/chat")
# def chat(req: ChatRequest):
#     lang = LANG_NAMES.get(req.language, "English")
#     system = CHAT_SYSTEM.format(lang=lang)
    
#     messages = []
#     for h in req.history[:-1]:  # exclude the last user message, we add it separately
#         messages.append({"role": h["role"], "content": h["content"]})
#     messages.append({"role": "user", "content": req.message})
    
#     response = client.messages.create(
#         model="claude-opus-4-5",
#         max_tokens=800,
#         system=system,
#         messages=messages
#     )
#     return {"reply": response.content[0].text}

# # ── EXIT PLAN CHAT ───────────────────────────────────────────────────────────

# EXIT_PLAN_SYSTEM = """You are SafeVoice's Safe Exit Planner — a warm, practical friend who helps 
# domestic abuse survivors plan their safety. Respond in {lang}.

# Your job: Have a natural, flowing conversation. Based on what the user shares:
# 1. Give POINTWISE, numbered practical advice (not walls of text)
# 2. Use bold headers like **Step 1: Immediate Safety** 
# 3. Then ask ONE focused follow-up question with 3-5 specific clickable options
# 4. Be like a knowledgeable friend — warm, specific, non-judgmental

# ALWAYS respond in this JSON format:
# {{
#   "reply": "Your empathetic opening + numbered steps/advice (use \\n for newlines, number each point)",
#   "followUpQuestion": "One focused follow-up question to get more details",
#   "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
#   "nextQuestionId": "a_short_snake_case_id"
# }}

# If this is a final summary (no more questions needed), set followUpQuestion to null and options to null.

# Context gathered so far: {context}
# Current question being answered: {questionId}
# User's answer: {lastAnswer}

# Follow-up topics to explore (pick the most relevant one NOT already covered):
# - children situation
# - financial resources  
# - trusted people who can help
# - documents they have (ID, bank cards)
# - immediate safety concerns tonight
# - where they can go (shelter, family, NGO)
# - phone/device safety
# - legal orders needed"""

# @app.post("/exit-plan-chat")
# def exit_plan_chat(req: ExitPlanChatRequest):
#     lang = LANG_NAMES.get(req.language, "English")
#     system = EXIT_PLAN_SYSTEM.format(
#         lang=lang,
#         context=str(req.context),
#         questionId=req.questionId,
#         lastAnswer=req.lastAnswer
#     )
    
#     messages = [{"role": "user", "content": f"Here is the conversation so far and my latest answer: {req.lastAnswer}"}]
#     if req.history:
#         messages = []
#         for h in req.history:
#             messages.append({"role": h["role"], "content": h["content"]})
    
#     response = client.messages.create(
#         model="claude-opus-4-5",
#         max_tokens=700,
#         system=system,
#         messages=messages if messages else [{"role": "user", "content": req.lastAnswer}]
#     )
    
#     import json, re
#     raw = response.content[0].text
#     # Try to parse JSON
#     try:
#         # Extract JSON if wrapped in markdown
#         match = re.search(r'\{[\s\S]*\}', raw)
#         if match:
#             data = json.loads(match.group())
#             return data
#     except Exception:
#         pass
#     # Fallback
#     return {
#         "reply": raw,
#         "followUpQuestion": None,
#         "options": None,
#         "nextQuestionId": None
#     }

# # ── ALLY CHAT ────────────────────────────────────────────────────────────────

# ALLY_SYSTEM = """You are SafeVoice's Ally Mode assistant — helping friends and family support 
# a domestic abuse survivor. Respond in {lang}.

# Your job: Like a knowledgeable friend, give:
# 1. SPECIFIC, numbered practical steps (not generic advice)
# 2. Exact conversation scripts when relevant (what to actually say)
# 3. Warning signs to watch for
# 4. What NOT to do (common mistakes allies make)
# 5. Local India-specific resources (1091, iCall, Snehi, local shelters)

# ALWAYS respond in this JSON format:
# {{
#   "reply": "Empathetic opening + specific numbered steps/scripts (use \\n for newlines, number each point, use **headers** for sections)",
#   "followUpQuestion": "One focused question to understand the situation better and give more specific help",
#   "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
#   "nextQuestionId": "a_short_snake_case_id"
# }}

# If enough info gathered for a complete action plan, set followUpQuestion to null and options to null.

# Context so far: {context}
# Question answered: {questionId}  
# Their answer: {lastAnswer}

# Follow-up topics to explore (pick most relevant NOT already covered):
# - relationship to the person (friend/colleague/neighbour/family)
# - how immediate is the danger
# - has the person acknowledged the abuse
# - does the person want help
# - safety of children involved
# - what the ally can practically offer (housing, money, time)
# - has anyone else noticed"""

# @app.post("/ally-chat")
# def ally_chat(req: AllyChatRequest):
#     lang = LANG_NAMES.get(req.language, "English")
#     system = ALLY_SYSTEM.format(
#         lang=lang,
#         context=str(req.context),
#         questionId=req.questionId,
#         lastAnswer=req.lastAnswer
#     )
    
#     messages = []
#     if req.history:
#         for h in req.history:
#             messages.append({"role": h["role"], "content": h["content"]})
#     else:
#         messages = [{"role": "user", "content": req.lastAnswer}]
    
#     response = client.messages.create(
#         model="claude-opus-4-5",
#         max_tokens=700,
#         system=system,
#         messages=messages
#     )
    
#     import json, re
#     raw = response.content[0].text
#     try:
#         match = re.search(r'\{[\s\S]*\}', raw)
#         if match:
#             data = json.loads(match.group())
#             return data
#     except Exception:
#         pass
#     return {
#         "reply": raw,
#         "followUpQuestion": None,
#         "options": None,
#         "nextQuestionId": None
#     }

# # ── LEGACY endpoints (keep for backward compat) ──────────────────────────────

# class AllyRequest(BaseModel):
#     observation: str
#     language: str

# @app.post("/ally")
# def ally_legacy(req: AllyRequest):
#     lang = LANG_NAMES.get(req.language, "English")
#     response = client.messages.create(
#         model="claude-opus-4-5",
#         max_tokens=600,
#         system=f"You are a domestic abuse support assistant. Respond in {lang} with specific numbered steps.",
#         messages=[{"role": "user", "content": f"I observed: {req.observation}. What should I do to help?"}]
#     )
#     return {"guidance": response.content[0].text}

# class ExitPlanRequest(BaseModel):
#     has_children: bool
#     has_income: bool
#     has_trusted_person: bool
#     language: str

# @app.post("/exit-plan")
# def exit_plan_legacy(req: ExitPlanRequest):
#     lang = LANG_NAMES.get(req.language, "English")
#     context = f"Has children: {req.has_children}, Has income: {req.has_income}, Has trusted person: {req.has_trusted_person}"
#     response = client.messages.create(
#         model="claude-opus-4-5",
#         max_tokens=700,
#         system=f"You are a domestic abuse safety planner. Respond in {lang} with a numbered exit plan.",
#         messages=[{"role": "user", "content": f"Create a safety exit plan. Context: {context}"}]
#     )
#     return {"plan": response.content[0].text}

# class ComplaintRequest(BaseModel):
#     entries: List[Dict]
#     language: str

# @app.post("/format-complaint")
# def format_complaint(req: ComplaintRequest):
#     lang = LANG_NAMES.get(req.language, "English")
#     entries_text = "\n\n".join([f"[{e.get('date', '')}] {e.get('text', '')}" for e in req.entries])
#     response = client.messages.create(
#         model="claude-opus-4-5",
#         max_tokens=800,
#         system=f"You are a legal document assistant. Format the following diary entries into a clear, structured complaint document in {lang}.",
#         messages=[{"role": "user", "content": entries_text}]
#     )
#     return {"complaint": response.content[0].text}








# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import anthropic
import os
import json
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

LANG_NAMES = {"en": "English", "kn": "Kannada", "hi": "Hindi", "te": "Telugu"}

# ═══════════════════════════════════════════════════════════════════════════════
# KNOWLEDGE BASE — Comprehensive Indian Laws & Support
# ═══════════════════════════════════════════════════════════════════════════════

KNOWLEDGE_BASE = """
=== COMPREHENSIVE INDIAN LAW KNOWLEDGE BASE ===

--- CRIMINAL LAWS ---

IPC Section 498A (Cruelty by Husband/Relatives):
- Protects married women from cruelty by husband or his family
- "Cruelty" includes physical harm, mental torture, dowry demands, threats
- Punishment: Up to 3 years + fine. Non-bailable, cognizable offense
- File FIR at ANY police station in India (not just where you live)
- Police MUST register FIR under Section 154 CrPC — they CANNOT refuse
- Cognizable = police can arrest without a warrant
- No time limit — you can file even years later
- If police refuse: Complain to SP/SSP/Commissioner or Magistrate court directly

IPC Section 354 (Assault to outrage modesty): 1-5 years. Any unwanted physical contact with sexual intent.
IPC Section 354A (Sexual Harassment): Up to 3 years. Unwelcome contact, demands, pornography.
IPC Section 354D (Stalking): Up to 3-5 years. Following, monitoring phone/location without consent.
IPC Section 376 (Rape): Marital rape not yet criminal for adults, BUT forced sex within marriage = cruelty under PWDVA and Section 498A.
IPC Section 406 (Criminal Breach of Trust): For recovering Streedhan — all gifts given to wife belong to HER legally, in-laws cannot keep it.
IPC Section 506 (Criminal Intimidation): Threatening death/harm. Up to 2-7 years.
IPC Section 509 (Insulting modesty): Verbal abuse, obscene messages. Up to 3 years.
Dowry Prohibition Act: Demanding dowry = up to 5 years + fine. Dowry death (Section 304B IPC) = 7 years to life.

--- PWDVA 2005 — Most Powerful Civil Law ---

Protection of Women from Domestic Violence Act 2005 covers ALL types of abuse:
Physical, Sexual, Verbal/Emotional, Economic — all are abuse under this law

Types of orders available WITHOUT filing criminal case:
1. Protection Order: Prohibits abuser from violence, entering workplace/school/home
2. Residence Order: You can STAY in the shared home even if house is in husband's name, OR get alternative accommodation
3. Monetary Relief: Maintenance, medical expenses, property damage compensation
4. Custody Order: Temporary custody of children
5. Compensation Order: For mental/physical harm suffered

How to get Protection Order (FREE and Fast):
- File application (Domestic Incident Report) directly before Magistrate
- OR through Protection Officer (free, government-appointed in every district)
- OR through NGO/service provider
- Court can grant order SAME DAY if there is urgent danger

Maintenance under Section 125 CrPC:
- If husband refuses to maintain wife/children, court orders maintenance
- No income limit. Available to divorced wives until remarriage
- Interim maintenance can be granted quickly while case is pending

Hindu Marriage Act — Divorce Grounds: Cruelty, Desertion (2 years), Adultery, Mental disorder
Streedhan: ALL gifts to wife before/during/after marriage legally BELONG TO HER

--- POCSO Act 2012 (Child Protection) ---
- Protects all children under 18 from sexual abuse
- Mandatory reporting: doctors/teachers who suspect abuse MUST report
- Report to: Police OR Childline 1098 (24/7, free)
- Child's identity CANNOT be disclosed

--- WHERE TO GO (FREE GOVERNMENT RESOURCES) ---

One Stop Centres (Sakhi Centres) — BEST OPTION:
- Government-run, FREE, every district has one
- Provides: shelter + medical aid + police help + legal aid + counseling — ALL UNDER ONE ROOF
- Available 24/7 for emergencies
- How to reach: Call 181 or ask police to take you

Short Stay Homes (Ministry of Women & Child Development):
- Free stay up to 1 year for abuse survivors
- Available in every state
- Contact: District Women & Child Development Officer

Swadhar Greh: Free shelter for women in difficult circumstances

Free Legal Aid — District Legal Services Authority (DLSA):
- Every district has DLSA — they provide free lawyers
- Call 1516 (NALSA National Helpline) for nearest office
- Women can apply regardless of income
- They can file your case, attend court, everything FREE

Protection Officers (under PWDVA):
- Government-appointed in every district
- Help file PWDVA applications, accompany to police/court
- Contact through District Women & Child Development Officer or call 181

--- SAFE PLACES TO GO IN INDIA ---

IMMEDIATE SAFE PLACES:
1. One Stop Centre: Call 181, completely free, shelter+legal+medical
2. Short Stay Home: Free government shelter up to 1 year
3. Women Police Station: Can file complaint AND get immediate safety
4. Government Hospital: Must treat you free in emergency (get Medico-Legal Case/MLC filed)
5. Trusted family member's home (parents, sister, aunt)
6. Trusted friend's home (not mutual friend with abuser)
7. Temple/mosque/church with active women's group

FIND NEARBY SAFE PLACES:
Search on Google Maps: "One Stop Centre near me", "Women police station near me",
"Short stay home for women near me", "Swadhar Greh near me", "DLSA near me"

NGOs INDIA (verified):
- iCall (TISS Mumbai): 9152987821 — Free counseling Mon-Sat 8am-10pm
- Vandrevala Foundation: 1860-2662-345 — 24/7 mental health
- Snehi: 044-24640050
- Majlis Legal Centre (Mumbai): women's legal help
- Aasra: 9820466627 — 24/7 crisis support

NGOs KARNATAKA / BANGALORE:
- Vimochana: 080-25496487 (feminist org, women's rights, legal support)
- Samara: 080-26607659 (counseling, legal support)
- Vanitha Sahaya Kendra (Karnataka): 1800-425-8555 (FREE, toll-free)
- NIMHANS (Bangalore): 080-46110007 (mental health)
- Swathi Mahila Sangha: Women's rights organization

--- PRACTICAL SAFETY PLANNING IN INDIA ---

DOCUMENTS TO COLLECT (highest priority first):
Critical: Aadhaar card, Passport, PAN card, Voter ID, Ration card, Marriage certificate
For children: Birth certificates, school records
Financial: Bank passbook, ATM cards, FD receipts, any property documents in your name
Evidence: Photos of injuries, screenshots of threats, medical reports
Jewelry (Streedhan): Legally yours, take it

GO BAG (pack secretly):
- Cash ₹3000-5000 minimum (enough for auto/bus + few nights)
- Aadhaar + important documents (or scanned copies on email to yourself)
- Change of clothes for you + children
- Medicines (yours + children's)
- Phone charger
- Any jewelry (your streedhan)

DEVICE SAFETY (CRITICAL):
- Delete browser history after this session
- Use incognito/private browsing for all searches
- WhatsApp can be monitored — use Signal for sensitive messages
- Check for tracking apps: Settings > Apps > look for unfamiliar apps
- Disable location sharing in Google Maps, WhatsApp
- Change passwords on a device he cannot access
- Enable 2-factor authentication

FINANCIAL INDEPENDENCE (INDIA):
- Jan Dhan Account: Open at any bank with just Aadhaar — no minimum balance required
- Open account when he is NOT with you
- SHG (Self Help Group): Micro-loans, many villages/cities have these, district bank can refer
- PM Ujjwala Yojana: Free LPG connection if below poverty line
- MGNREGA (rural): 100 days guaranteed employment
- Pradhan Mantri Kaushal Vikas Yojana: Free skill training

CODE WORD SAFETY:
- Tell a trusted neighbor: "Can I borrow some sugar?" = "Call police immediately"
- Tell a trusted family member: "I need help with Priya's school" = "I need to be picked up now"

--- HELPLINES (ALL INDIA) ---
- 112: National Emergency (Police/Fire/Ambulance) — FASTEST
- 100: Police
- 1091: Women in Distress (24/7)
- 181: Women Helpline + One Stop Centre referral (24/7)
- 1098: Childline for children (24/7)
- 1516: NALSA Free Legal Aid
- 9152987821: iCall Mental Health (TISS)
- 1860-2662-345: Vandrevala Foundation (24/7 mental health)
- Karnataka specific: 1800-425-8555 Vanitha Sahaya Kendra (FREE)

--- IMPORTANT MYTHS VS FACTS ---

MYTH: I can only file FIR at local police station
FACT: File at ANY police station in India. They must accept it.

MYTH: I need to leave the house if it's in husband's name
FACT: Under PWDVA Residence Order, you have the legal right to stay OR get alternative accommodation

MYTH: Police won't help in family matters
FACT: Domestic violence is a criminal offense. Police are legally obligated to act.

MYTH: Only physical violence counts as abuse
FACT: PWDVA covers emotional, verbal, economic, sexual abuse — not just physical

MYTH: I'll lose custody of children if I leave
FACT: Mother has equal right. Court decides based on child's best interest — not who left.

MYTH: My in-laws can take my children
FACT: Only a Family Court can decide custody. In-laws have no automatic legal right.

MYTH: I need to return dowry/jewelry if I leave
FACT: Streedhan legally belongs to the wife. It CANNOT be taken back.

MYTH: I can't get maintenance if I have a job
FACT: Under PWDVA, maintenance is based on lifestyle maintained during marriage, not just income gap.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# LANGUAGE INSTRUCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

LANG_INSTRUCTIONS = {
    "en": "Respond ONLY in English. Use warm, conversational English — not formal or legal-sounding.",
    "kn": """IMPORTANT: Respond ENTIRELY in Kannada (ಕನ್ನಡ). Every word must be in Kannada.
Use warm, simple Kannada that a common person in Karnataka understands — not academic Kannada.
Legal terms can stay in English but explain them in Kannada immediately after.
Write numbers in English (1, 2, 3) but everything else in Kannada script.
Warm phrases to use: "ನಿಮ್ಮ ಸ್ಥಿತಿ ಅರ್ಥವಾಗುತ್ತದೆ" (I understand your situation), "ನೀವು ಒಂಟಿಯಲ್ಲ" (You are not alone), "ನಾವು ಇದನ್ನು ಒಟ್ಟಿಗೆ ನಿಭಾಯಿಸೋಣ" (We'll handle this together)""",
    "hi": """IMPORTANT: Respond ENTIRELY in Hindi (हिंदी). Every word must be in Hindi/Devanagari script.
Use warm, simple Hindi — not formal or bureaucratic. Common spoken Hindi.
Legal terms can stay in English but explain in Hindi immediately after.
Write numbers in English (1, 2, 3) but everything else in Hindi.
Warm phrases: "आप अकेली नहीं हैं" (You are not alone), "हम मिलकर इसका हल निकालेंगे" (We'll find a solution together), "मैं समझती हूं यह कितना मुश्किल है" (I understand how difficult this is)""",
    "te": """IMPORTANT: Respond ENTIRELY in Telugu (తెలుగు). Every word must be in Telugu script.
Use warm, simple Telugu that people in Andhra Pradesh/Telangana understand.
Legal terms can stay in English but explain in Telugu immediately after.
Write numbers in English (1, 2, 3) but everything else in Telugu.
Warm phrases: "మీరు ఒంటరిగా లేరు" (You are not alone), "మనం కలిసి దీన్ని పరిష్కరిద్దాం" (We'll solve this together)"""
}

# ═══════════════════════════════════════════════════════════════════════════════
# MODELS
# ═══════════════════════════════════════════════════════════════════════════════

class ChatRequest(BaseModel):
    message: str
    language: str
    history: List[Dict[str, str]] = []

class ExitPlanChatRequest(BaseModel):
    language: str
    context: Dict[str, Any] = {}
    lastAnswer: str
    questionId: str
    history: List[Dict[str, str]] = []
    userCity: Optional[str] = None

class AllyChatRequest(BaseModel):
    language: str
    context: Dict[str, Any] = {}
    lastAnswer: str
    questionId: str
    history: List[Dict[str, str]] = []

class NearbyPlacesRequest(BaseModel):
    lat: float
    lng: float
    placeType: str

# ═══════════════════════════════════════════════════════════════════════════════
# CHAT — Legal Help with Warmth
# ═══════════════════════════════════════════════════════════════════════════════

CHAT_SYSTEM = """You are SafeVoice — a warm, caring friend who knows Indian law deeply. NOT a robot. NOT a helpline script. A real friend who happens to know exactly what to do.

{lang_instruction}

=== YOUR PERSONALITY ===
- Emotionally present FIRST, then practical
- You acknowledge how hard this is before advice — genuinely, not formulaically
- You speak directly like a friend, not a government pamphlet
- You say things like "I know this is terrifying" not "I understand your concern"
- You understand Indian context: joint families, financial dependence, log kya kahenge (what will people say), children, social pressure
- You give advice that WORKS in Indian society — not Western ideals

=== KNOWLEDGE BASE ===
{knowledge_base}

=== HOW TO RESPOND ===
1. Start with 1-2 sentences of GENUINE emotional acknowledgment
2. LEGAL SUMMARY: 2-3 plain-language sentences about what law covers this
3. IMMEDIATE SAFETY STEPS: 3-5 numbered specific actions (not "seek help" — actual steps)
4. NEXT RECOMMENDED ACTION: One clear thing to do next
5. One relevant helpline woven in naturally (not dumped at end)

=== TONE ===
Talk like you're sitting across from them over chai. Warm. Direct. Knowledgeable. Never preachy. Never dismissive of cultural realities. Never just list emergency numbers.

Max 320 words. Quality over length."""

@app.post("/chat")
def chat(req: ChatRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    system = CHAT_SYSTEM.format(
        lang_instruction=lang_instruction,
        knowledge_base=KNOWLEDGE_BASE
    )
    messages = []
    for h in req.history:
        messages.append({"role": h["role"], "content": h["content"]})
    if not messages or messages[-1]["role"] != "user":
        messages.append({"role": "user", "content": req.message})

    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=900,
        system=system,
        messages=messages
    )
    return {"reply": response.content[0].text}

# ═══════════════════════════════════════════════════════════════════════════════
# EXIT PLAN CHAT
# ═══════════════════════════════════════════════════════════════════════════════

EXIT_PLAN_SYSTEM = """You are SafeVoice's Safe Exit Planner. Imagine you are a close friend — someone who has helped women leave abusive situations in India before, knows the system, and genuinely cares.

{lang_instruction}

=== YOUR APPROACH ===
You are making a REAL plan with them — step by step, conversation by conversation.
- Acknowledge fear and difficulty genuinely before each set of advice
- Give SPECIFIC numbered steps, not vague guidance
- Reference actual Indian resources: One Stop Centres (call 181), DLSA (call 1516), Swadhar Greh, Jan Dhan accounts
- Mention Google Maps search terms they can actually use: "One Stop Centre near me", "women police station near me"
- Give realistic timelines: "You can open a Jan Dhan account in about 30 minutes at any bank"
- Consider practical Indian barriers: no money, no documents, children, in-laws in same house, no income
- Sound like you're sitting with them making this plan together

=== KNOWLEDGE BASE ===
{knowledge_base}

=== GATHERED CONTEXT ===
{context}

=== RESPONSE FORMAT (STRICT — valid JSON only) ===
{{
  "reply": "1-2 sentences of genuine warmth acknowledging their situation, then numbered steps. Plain text, no asterisks. Use numbers (1. 2. 3.) for steps. Be specific about Indian resources.",
  "locationTip": "Tell them to search Google Maps for specific safe places near them (e.g. 'Search on Google Maps: One Stop Centre near me — these are free government shelters'). Null if not yet relevant.",
  "followUpQuestion": "One caring, specific follow-up question OR null if plan is complete",
  "options": ["Specific Indian-context option 1", "Specific option 2", "Specific option 3", "Specific option 4"],
  "nextQuestionId": "short_snake_id"
}}

=== TOPICS TO COVER PROGRESSIVELY ===
Immediate danger tonight → children → trusted person → finances/cash → documents → where to physically go → phone safety → legal protection → longer term plan

NEVER just list helplines. Give a real plan."""

@app.post("/exit-plan-chat")
def exit_plan_chat(req: ExitPlanChatRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    system = EXIT_PLAN_SYSTEM.format(
        lang_instruction=lang_instruction,
        knowledge_base=KNOWLEDGE_BASE,
        context=json.dumps(req.context, ensure_ascii=False)
    )
    messages = []
    if req.history:
        for h in req.history:
            messages.append({"role": h["role"], "content": h["content"]})
    if not messages:
        messages = [{"role": "user", "content": req.lastAnswer}]

    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=950,
        system=system,
        messages=messages
    )
    raw = response.content[0].text
    try:
        match = re.search(r'\{[\s\S]*\}', raw)
        if match:
            data = json.loads(match.group())
            return data
    except Exception:
        pass
    return {"reply": raw, "locationTip": None, "followUpQuestion": None, "options": None, "nextQuestionId": None}

# ═══════════════════════════════════════════════════════════════════════════════
# ALLY CHAT
# ═══════════════════════════════════════════════════════════════════════════════

ALLY_SYSTEM = """You are SafeVoice's Ally Mode — helping friends, family, neighbours who suspect someone they love is being abused. You are warm, practical, and deeply understand the Indian context of supporting survivors.

{lang_instruction}

=== UNDERSTAND THE ALLY'S POSITION ===
They are scared of making things worse. They don't know if it's their place to interfere. They feel helpless. They face cultural pressure ("family matter"). They want to help but feel paralyzed.
You respond like a knowledgeable friend helping them navigate this carefully and effectively.

=== KNOWLEDGE BASE ===
{knowledge_base}

=== WHAT GREAT ALLY SUPPORT LOOKS LIKE ===
1. EXACT scripts — word for word what to say in Indian context
2. What NOT to say (common mistakes that push survivors away)
3. How to build trust slowly — usually NOT a one-conversation fix
4. When to involve authorities vs when not to (calling police immediately often makes things worse unless immediate danger)
5. How to keep ally safe if abuser is also dangerous to them
6. Practical offers: safe phone, safe address, cash, listening without judgment
7. Understanding that survivor may not be ready to leave — that's okay and common

=== GATHERED CONTEXT ===
{context}

=== RESPONSE FORMAT (STRICT — valid JSON only) ===
{{
  "reply": "Warmth first, then specific numbered steps. Include exact conversation scripts where relevant (what to actually say, in Indian context). Plain text, no asterisks.",
  "doThis": "The single most important thing they can do TODAY, very specific. Or null.",
  "followUpQuestion": "One focused follow-up to give more specific help. Or null if plan is complete.",
  "options": ["Specific option 1", "Specific option 2", "Specific option 3", "Specific option 4"],
  "nextQuestionId": "short_id"
}}

NEVER give generic "be supportive" advice. Give scripts, steps, specific Indian resources."""

@app.post("/ally-chat")
def ally_chat(req: AllyChatRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    system = ALLY_SYSTEM.format(
        lang_instruction=lang_instruction,
        knowledge_base=KNOWLEDGE_BASE,
        context=json.dumps(req.context, ensure_ascii=False)
    )
    messages = []
    if req.history:
        for h in req.history:
            messages.append({"role": h["role"], "content": h["content"]})
    if not messages:
        messages = [{"role": "user", "content": req.lastAnswer}]

    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=950,
        system=system,
        messages=messages
    )
    raw = response.content[0].text
    try:
        match = re.search(r'\{[\s\S]*\}', raw)
        if match:
            data = json.loads(match.group())
            return data
    except Exception:
        pass
    return {"reply": raw, "doThis": None, "followUpQuestion": None, "options": None, "nextQuestionId": None}

# ═══════════════════════════════════════════════════════════════════════════════
# NEARBY PLACES
# ═══════════════════════════════════════════════════════════════════════════════

class NearbyPlacesRequest(BaseModel):
    lat: float
    lng: float
    placeType: str

@app.post("/nearby-places")
def nearby_places(req: NearbyPlacesRequest):
    base = "https://www.google.com/maps/search/"
    queries = {
        "police": [
            {"label": "Women Police Station", "query": "women+police+station", "icon": "🚔"},
            {"label": "Nearest Police Station", "query": "police+station", "icon": "🚓"},
        ],
        "shelter": [
            {"label": "One Stop Centre (Free Govt Shelter)", "query": "one+stop+centre+sakhi", "icon": "🏠"},
            {"label": "Short Stay Home for Women", "query": "short+stay+home+women+government", "icon": "🏡"},
            {"label": "Swadhar Greh", "query": "swadhar+greh", "icon": "🤝"},
            {"label": "Women NGO Shelter", "query": "women+shelter+domestic+violence", "icon": "💙"},
        ],
        "hospital": [
            {"label": "Government Hospital (Free)", "query": "government+hospital", "icon": "🏥"},
            {"label": "Primary Health Centre", "query": "primary+health+centre+PHC", "icon": "⚕️"},
        ],
        "legal": [
            {"label": "District Legal Services Authority", "query": "district+legal+services+authority+DLSA", "icon": "⚖️"},
            {"label": "Family Court", "query": "family+court", "icon": "🏛️"},
        ],
    }
    places = queries.get(req.placeType, queries["shelter"])
    result = []
    for p in places:
        encoded_query = p["query"] + f"+near+me"
        result.append({
            "label": p["label"],
            "icon": p["icon"],
            "mapsUrl": f"{base}{encoded_query}/@{req.lat},{req.lng},14z",
            "directionsUrl": f"https://www.google.com/maps/dir/?api=1&origin={req.lat},{req.lng}&destination={p['query']}"
        })
    return {"places": result}

# ═══════════════════════════════════════════════════════════════════════════════
# LEGACY ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════════

class AllyRequest(BaseModel):
    observation: str
    language: str

@app.post("/ally")
def ally_legacy(req: AllyRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=600,
        system=f"{lang_instruction} You are a domestic abuse support assistant. Give specific numbered steps.",
        messages=[{"role": "user", "content": f"I observed: {req.observation}. What should I do to help?"}]
    )
    return {"guidance": response.content[0].text}

class ExitPlanRequest(BaseModel):
    has_children: bool
    has_income: bool
    has_trusted_person: bool
    language: str

@app.post("/exit-plan")
def exit_plan_legacy(req: ExitPlanRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    ctx = f"Has children: {req.has_children}, Has income: {req.has_income}, Has trusted person: {req.has_trusted_person}"
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=700,
        system=f"{lang_instruction} You are a domestic abuse safety planner. Give numbered exit plan.",
        messages=[{"role": "user", "content": f"Create a safety exit plan. Context: {ctx}"}]
    )
    return {"plan": response.content[0].text}

class ComplaintRequest(BaseModel):
    entries: List[Dict]
    language: str

@app.post("/format-complaint")
def format_complaint(req: ComplaintRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    entries_text = "\n\n".join([f"[{e.get('date', '')}] {e.get('text', '')}" for e in req.entries])
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=800,
        system=f"{lang_instruction} Format diary entries into a structured legal complaint document.",
        messages=[{"role": "user", "content": entries_text}]
    )
    return {"complaint": response.content[0].text}