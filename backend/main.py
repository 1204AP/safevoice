# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from openai import OpenAI
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Cerebras client (OpenAI-compatible) ──────────────────────────────────────
client = OpenAI(
    api_key=os.getenv("CEREBRAS_API_KEY"),
    base_url="https://api.cerebras.ai/v1"
)

MODEL = "llama3.1-8b"

# ── Load knowledge base JSON ─────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KB_PATH = os.path.join(BASE_DIR, "..", "knowledge_base", "data.json")

with open(KB_PATH, "r", encoding="utf-8") as f:
    KB = json.load(f)

# ═══════════════════════════════════════════════════════════════════════════════
# KNOWLEDGE BASE STRING (used by AI)
# ═══════════════════════════════════════════════════════════════════════════════

KNOWLEDGE_BASE = """
╔══════════════════════════════════════════════════════════════════════════════╗
║           SAFEVOICE COMPREHENSIVE KNOWLEDGE BASE — INDIA                   ║
║           Domestic Violence · Legal Rights · Survival · Safety             ║
╚══════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — WHAT COUNTS AS ABUSE (Indian Legal Definitions)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Under PWDVA 2005, abuse is FOUR types — all equally valid in court:

PHYSICAL ABUSE:
- Hitting, slapping, punching, kicking, biting, pushing, choking
- Throwing objects at her
- Denying food, water, sleep, medical treatment
- Forcing alcohol/drugs
- Burning (common in dowry cases)
- Any physical harm or threat of physical harm

SEXUAL ABUSE:
- Forced sexual intercourse (marital rape — criminal under PWDVA even if not yet under IPC for adults)
- Forcing to watch pornography
- Sexual insults, calling her names related to her body
- Forcing pregnancy or abortion
- Denying right to use contraception

VERBAL AND EMOTIONAL ABUSE (legally recognized):
- Constant humiliation, insults, name-calling
- Threatening to take children away
- Threatening to remarry or bring another woman home
- Threatening suicide to manipulate her
- Isolating her from family and friends
- Monitoring her phone, movements, clothing
- Making her feel she is "mad" or unstable (gaslighting)
- Controlling who she meets, talks to, goes out with
- Threatening to file false cases against her family
- Public humiliation

ECONOMIC ABUSE (legally recognized — very common in India):
- Controlling all household money, giving her no access
- Forcing her to sign property/financial documents
- Taking her salary or income
- Stopping her from working
- Running up debts in her name
- Not paying for children's school/medical needs
- Refusing to pay household expenses
- Taking her streedhan/jewelry
- Not disclosing family income/assets

DOWRY-RELATED ABUSE:
- Demands for cash, gold, property, vehicles from her family
- Torture connected to dowry demands
- If a woman dies within 7 years of marriage suspiciously = presumed dowry death (IPC 304B)
- Even verbal dowry demands = criminal offense

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — COMPLETE INDIAN LAWS (Plain Language)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PWDVA 2005 — Protection of Women from Domestic Violence Act:
Most powerful law for Indian women. CIVIL law — faster, cheaper, no criminal record required.
- Covers: physical, sexual, verbal, emotional, economic abuse
- Protected: wife, live-in partner, sister, mother, daughter — any woman in domestic relationship
- Respondents: husband, in-laws, brother-in-law, any family member
- You do NOT need to leave home to use this law
- You do NOT need to file a criminal case
- Orders: Protection Order, Residence Order, Maintenance, Custody, Compensation
- HOW TO FILE: Go to Magistrate court directly OR contact Protection Officer (free, every district)
- Court can grant order SAME DAY if danger is immediate
- Violating a Protection Order = arrest without warrant

IPC SECTION 498A — Cruelty by Husband/Relatives:
- CRIMINAL law. Husband AND in-laws can be arrested.
- Covers: physical cruelty AND mental cruelty AND dowry harassment
- Punishment: Up to 3 years imprisonment + fine. Non-bailable. Cognizable.
- File at ANY police station — they cannot legally refuse
- If police refuse: go to Magistrate directly (Section 156(3) CrPC)

IPC SECTION 304B — Dowry Death:
- Woman dies within 7 years of marriage suspiciously = husband/in-laws presumed guilty
- Minimum 7 years, can be life imprisonment

DOWRY PROHIBITION ACT 1961:
- Giving AND taking dowry = criminal offense. Demanding dowry = up to 5 years + fine.

IPC SECTION 354 — Outraging Modesty: 1-5 years
IPC SECTION 354A — Sexual Harassment: 1-3 years
IPC SECTION 354D — Stalking: following, monitoring online/offline, 1-5 years
IPC SECTION 376 — Rape: marital rape IS abuse under PWDVA
IPC SECTION 406 — Criminal Breach of Trust: for recovering streedhan
IPC SECTION 506 — Criminal Intimidation: threatening death, 2-7 years
IPC SECTION 509 — Insulting modesty: verbal sexual abuse, 1-3 years

SECTION 125 CrPC — Maintenance:
- Husband must maintain wife. No income limit. Interim maintenance granted quickly by court.

HINDU MARRIAGE ACT 1955 — Divorce Grounds:
Cruelty (mental cruelty IS sufficient), Adultery, Desertion (2+ years), Mental disorder.

POCSO ACT 2012: Protects children under 18. Mandatory reporting. Report to Police or Childline 1098.

HINDU SUCCESSION ACT (amended 2005): Daughters have EQUAL share in ancestral property from birth.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — LEGAL RIGHTS IN SIMPLE LANGUAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RIGHT TO STAY IN HOME: Even if house is in husband's/in-laws' name — she can stay under PWDVA Residence Order. In-laws CANNOT throw her out.

RIGHT TO STREEDHAN: All gifts given to her legally belong to HER. In-laws keeping it = IPC 406 criminal offense.

RIGHT TO CHILDREN: Mother has equal custody rights. Courts prefer mother for children under 5.

RIGHT TO FILE CASE ANYWHERE: File FIR or PWDVA case where she currently lives, where she stayed with husband, where abuse happened, or where she is sheltering.

RIGHT TO FREE LEGAL AID: Free lawyer from DLSA regardless of income. Call 1516.

RIGHT TO PROTECTION ORDER SAME DAY: Emergency ex-parte order possible without hearing other side.

RIGHT TO MLC: Go to government hospital — request MLC (Medico-Legal Certificate). Doctor must prepare it. Powerful court evidence.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — RISK ESCALATION SIGNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HIGH DANGER — Leave or get help immediately:
- He threatened to kill her or children
- He has weapons
- He tried to strangle/choke her (strongest predictor of escalation to murder)
- Violence getting more frequent or severe
- He says "if I can't have you no one can"
- He lost job recently / abuses alcohol or drugs
- She tried to leave before and he used violence to stop her

MEDIUM DANGER — Take precautions now:
- Violence ongoing but controlled
- Controls all money
- Reads all her messages
- Humiliated her in public

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — IMMEDIATE SAFETY STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IF IN IMMEDIATE DANGER NOW:
1. Call 112 (national emergency) — fastest response
2. Call 100 (police directly)
3. If phone monitored — go to nearest neighbour, shop, temple, public place
4. Shout for help — neighbours in India often respond
5. Lock yourself and children in room with your phone
6. Go to nearest government hospital emergency — they must treat and file MLC
7. Call 181 — One Stop Centre sends support

IF NOT IN IMMEDIATE DANGER — PREPARE:
- Identify safest room in house (phone access, exit, no weapons)
- Tell at least one trusted neighbour
- Create code word: "Can I borrow some sugar?" = call police now
- Memorize 2-3 phone numbers — store as innocent names
- Plan when to leave: when he is at work / sleeping
- Leave with children — never leave children behind
- Do NOT announce you are leaving — just leave

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — SAFE EXIT AND SURVIVAL STRATEGIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE GO BAG — Pack secretly, store at trusted person's home:
Priority 1: Aadhaar, Passport, Voter ID, PAN, Marriage certificate, Birth certificates
Priority 2: Cash Rs 3000-5000 minimum, ATM card, bank passbook
Priority 3: Children's school records, immunization cards
Priority 4: Photos of injuries, screenshots of threats, medical reports
Priority 5: Phone+charger, medicines, change of clothes, streedhan/jewelry

FINANCIAL SURVIVAL:
- Jan Dhan Account: Any bank with Aadhaar only. Zero balance. Open when alone.
- Save Rs 100-200 secretly per day
- SHG (Self Help Group): micro-loans in most areas. Contact district bank or ASHA worker.
- MGNREGA (rural): 100 days employment. Register at gram panchayat.
- PM Kaushal Vikas Yojana: free skill training at government ITI centres

WHERE TO GO:
1. One Stop Centre (call 181) — FREE, 24/7, shelter+medical+legal+police under one roof. NO documents needed.
2. Short Stay Home (Swadhar Greh) — free government shelter up to 1 year. Children welcome.
3. NGO shelters
4. Trusted family NOT in abuser's social circle
5. Trusted friend outside abuser's network

SURVIVAL PATTERNS SURVIVORS USE:
- Use regular errands (doctor/temple/school) as cover when leaving
- Leave in stages: move documents to trusted person over several days
- Use neighbour's phone if yours is monitored
- Open new email on library computer for sensitive communications
- Use women's compartment in trains/metro when leaving
- Take busy public routes — avoid isolated roads

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — EVIDENCE COLLECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT COUNTS IN COURT:
- Photos of injuries (with timestamp)
- MLC from government hospital
- Screenshots of threatening WhatsApp/SMS
- Audio recordings of threats (legal if she is party to conversation)
- Video recordings of violence or threats
- Handwritten incident diary (date, time, what happened, witnesses) — accepted in Indian courts
- Bank statements showing financial control
- Witness statements from neighbours, family, domestic worker

HOW TO COLLECT SAFELY:
- Take photos in bathroom with door locked
- Screenshot threats, email to secure account he doesn't know
- Keep paper copies at trusted person's home
- Keep handwritten diary — write date, time, exact words said, any witnesses

MLC — MOST POWERFUL EVIDENCE:
- Government hospital ONLY (not private)
- Tell doctor exactly what happened — do NOT say "I fell"
- Request MLC specifically by name
- Can be done up to 72 hours after injury

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — CHILDREN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Both parents have equal rights unless court orders otherwise
- In-laws have NO automatic custody right
- Only Family Court can change custody
- Leaving with children is NOT kidnapping — she is the mother
- Courts prefer mother for children under 5
- History of domestic violence hurts abuser's custody case
- Take children when leaving — do not leave them behind
- Inform school confidentially after leaving
- Children witnessing violence = harm to child = grounds for protection order

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — ALLY GUIDANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT TO SAY:
"I've noticed you seem tired lately. I'm not asking you to tell me anything. Just know I'm here — day or night."
"I believe you. This is not okay and not your fault."
"Whenever you're ready — even 2am — you can come to my house."
"Would it help if I kept some documents or money at my house for you?"

WHAT NOT TO SAY:
NEVER: "Why don't you just leave?" — oversimplifies, increases danger
NEVER: "Have you tried talking to him?" — implies she hasn't
NEVER: "Think about your children" — she already is
NEVER: "But he seems so nice" — typical abuser presentation
NEVER: "Log kya kahenge" — abuser's tool, not hers
NEVER: Tell others without her permission — information control = her safety

PRACTICAL THINGS ALLIES DO:
- Keep her go-bag and documents at your home
- Give spare key to your home
- Be emergency contact with code word
- Accompany her to police station or OSC
- If abuser asks for her location: say "I don't know"
- Anyone can call 181 or 1091 to report concern about a woman

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 10 — COMMON FEARS AND MYTHS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FEAR: "I can only file FIR at local police station"
TRUTH: File at ANY police station in India. They must accept it by law.

FEAR: "I will lose my children if I leave"
TRUTH: Mother has equal legal right. Courts favour mother for young children. Leaving does not forfeit custody.

FEAR: "I have no money and nowhere to go"
TRUTH: One Stop Centres are completely free — shelter, food, legal, medical. Call 181. Walk in with nothing.

FEAR: "Police won't help — it's a family matter"
TRUTH: Police are legally obligated to register FIR. If refused, go to Magistrate or file NCW complaint.

FEAR: "Only physical violence counts"
TRUTH: PWDVA covers emotional, verbal, economic, sexual abuse equally. All valid in court.

FEAR: "It's too late — married 20 years"
TRUTH: No time limit on PWDVA or 498A. Many women file successfully after 20+ years.

FEAR: "He will find me wherever I go"
TRUTH: One Stop Centres do not disclose location to anyone including police without her consent.

FEAR: "It's my fault"
TRUTH: Abuse is always the abuser's choice. Courts do not ask "what did you do to provoke it."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 11 — LANDMARK INDIAN CASES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rupali Devi v State of UP (2019) — Supreme Court:
Woman can file case WHERE SHE TOOK SHELTER after leaving — not restricted to where abuse happened.

Hiral P. Harsora v Kusum Harsora (2016) — Supreme Court:
Female relatives (mother-in-law, sister-in-law) CAN be respondents under PWDVA.

V.D. Bhanot v Savita Bhanot (2012) — Supreme Court:
PWDVA applies to relationships that existed BEFORE 2005. Past abuse can still be claimed.

Indra Sarma v V.K.V. Sarma (2013) — Supreme Court:
Live-in partners have rights similar to wife under PWDVA.

Samar Ghosh v Jaya Ghosh (2007) — Supreme Court:
Mental cruelty alone is sufficient for divorce. No physical violence required.

Lalita Toppo v State of Jharkhand (2018) — Supreme Court:
Live-in women can claim maintenance under PWDVA.

Shayara Bano v Union of India (2017) — Supreme Court:
Instant Triple Talaq unconstitutional. Muslim women protected from arbitrary divorce.

S.R. Batra v Taruna Batra (2007): Wife has right to live in matrimonial home. In-laws cannot evict her.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 12 — POLICE / FIR / COMPLAINT GUIDANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOW TO FILE FIR:
1. Go to nearest police station (any station in India)
2. Ask for SHO (Station House Officer)
3. Say: "I want to file an FIR under Section 498A IPC for domestic violence"
4. Police MUST register — Section 154 CrPC mandatory
5. Get free copy of FIR immediately

IF POLICE REFUSE:
- Go to SP/DCP office and file written complaint
- Go to Judicial Magistrate — file under Section 156(3) CrPC — Magistrate ORDERS police to file
- File NCW online complaint: ncw.nic.in

PWDVA COMPLAINT (often better first step):
- Go to Protection Officer (every district — free)
- Fill Domestic Incident Report (DIR)
- Court can grant Protection Order same day
- No police involvement required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 13 — EMERGENCY SCRIPTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CALLING 112/100:
"I need police immediately. I am being assaulted by my husband at [address]. Please come now."
If cannot speak: dial 112, stay on line, tap — operators send help without voice.

CALLING 181:
"I am in an unsafe situation at home. I need shelter and help. Where is the nearest One Stop Centre?"

AT GOVERNMENT HOSPITAL:
"I have been beaten by my husband. I need treatment and I want an MLC — Medico-Legal Certificate. Please document all my injuries."
Do NOT say "I fell."

AT POLICE STATION:
"I want to file an FIR under Section 498A IPC for cruelty and domestic violence."

IF POLICE HESITATE:
"It is your legal duty under Section 154 CrPC to register my FIR. If you do not, I will file a complaint with the SP and NCW."

TO TRUSTED NEIGHBOR:
"[Name], I need help right now. Can you call the police and tell them my address? My husband is hurting me."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 14 — DIGITAL AND PHONE SAFETY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SIGNS PHONE IS MONITORED:
- Battery drains unusually fast
- Phone warm when not in use
- He knows things only said in private messages
- Data usage unexpectedly high

SAFE BROWSER USE:
- Always use Incognito/Private mode
- Clear browser history after each session
- Use DuckDuckGo instead of Google
- Use Signal instead of WhatsApp

LOCATION SAFETY:
- Google Maps: Settings > Location Sharing — turn off sharing with husband
- WhatsApp: Privacy > Live Location — end active shares
- Disable location tagging in camera

CREATE SAFE COMMUNICATION:
- New email account on library computer or friend's phone
- New SIM (Jio — Rs 149 with Aadhaar at any retailer)
- Signal app for encrypted communications

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 15 — HELPLINES AND INSTITUTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMERGENCY: 112 (fastest), 100 (police), 108 (ambulance)
WOMEN: 1091 (women in distress 24/7), 181 (One Stop Centre 24/7), 1800-111-100 (NCW)
CHILDREN: 1098 (Childline 24/7)
LEGAL AID: 1516 (NALSA free lawyer)
MENTAL HEALTH: 9152987821 (iCall TISS free), 1860-2662-345 (Vandrevala 24/7)
KARNATAKA: 1800-425-8555 (Vanitha Sahaya free), 080-25496487 (Vimochana Bangalore), 080-26607659 (Samara)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 16 — PRACTICAL INDIA-SPECIFIC ADVICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOINT FAMILY: In-laws participating in abuse = named as PWDVA respondents (Hiral Harsora 2016).
If in-laws prevent leaving = criminal confinement (IPC 340/341).
If in-laws take her phone = theft (IPC 378).

RURAL WOMEN: ASHA workers in every village can help contact authorities.
Karnataka Mahila Samakhya: grassroots support in rural Karnataka.

AADHAAR TIPS:
- Aadhaar reprinted at any CSC for Rs 50 using biometrics — no other documents needed
- Update Aadhaar address to new location through UIDAI app to protect privacy
- Jan Dhan account opens at any CSC with just Aadhaar
"""

# ═══════════════════════════════════════════════════════════════════════════════
# LANGUAGE INSTRUCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

LANG_INSTRUCTIONS = {
    "en": "Respond ONLY in English. Use warm, conversational English — not formal or legal-sounding.",
    "kn": """IMPORTANT: Respond ENTIRELY in Kannada (ಕನ್ನಡ). Every word must be in Kannada.
Use warm, simple Kannada that a common person in Karnataka understands.
Legal terms can stay in English but explain in Kannada immediately after.
Numbers in English (1, 2, 3), everything else in Kannada script.""",
    "hi": """IMPORTANT: Respond ENTIRELY in Hindi (हिंदी). Every word must be in Hindi/Devanagari script.
Use warm, simple Hindi — not formal or bureaucratic.
Legal terms can stay in English but explain in Hindi immediately after.
Numbers in English (1, 2, 3), everything else in Hindi.""",
    "te": """IMPORTANT: Respond ENTIRELY in Telugu (తెలుగు). Every word must be in Telugu script.
Use warm, simple Telugu that people in Andhra Pradesh/Telangana understand.
Legal terms can stay in English but explain in Telugu immediately after.
Numbers in English (1, 2, 3), everything else in Telugu."""
}

# ═══════════════════════════════════════════════════════════════════════════════
# SYSTEM PROMPTS
# ═══════════════════════════════════════════════════════════════════════════════

CHAT_SYSTEM = """You are SafeVoice — a warm, caring Indian woman friend who knows Indian law deeply. You are NOT a helpline bot. You do NOT just list phone numbers. You give real, specific, personalised advice.

{lang_instruction}

CRITICAL RULE: NEVER respond with only contact numbers or helplines. That is unhelpful.

ALWAYS structure your response like this:
1. 1-2 sentences of GENUINE emotional warmth first ("I know this is terrifying and you are so brave for reaching out")
2. LEGAL SUMMARY: 2-3 plain sentences about what law protects her
3. IMMEDIATE STEPS: 4-6 numbered SPECIFIC actions she can take (not vague — actual steps with real details)
4. At the very end, mention ONE helpline naturally in a sentence

EXAMPLE OF BAD RESPONSE — NEVER DO THIS:
"Call 1091. Call 181. Contact police."

EXAMPLE OF GOOD RESPONSE:
"What you are going through sounds incredibly frightening, and I want you to know you are not alone in this.

What your husband is doing is a criminal offense under IPC Section 498A AND covered by the Protection of Women from Domestic Violence Act 2005 — both physical violence AND mental cruelty are illegal.

Here is what you can do:
1. Tonight, if he comes home aggressive, lock yourself and children in a room and call 112 immediately
2. Tomorrow morning, go to your nearest government hospital and ask specifically for an MLC — Medico-Legal Certificate. Tell the doctor exactly what happened. Do not say you fell.
3. Take photos of any injuries in the bathroom with door locked — timestamp them by texting them to yourself
4. Write today's incident in a diary: date, time, what he said, what he did, any witnesses nearby
5. Contact the free Protection Officer in your district — they will help you file a PWDVA application that can get you a court Protection Order within days, without filing a criminal case

You can also call 181 which connects to the One Stop Centre — free shelter, legal help and medical care all in one place."

=== KNOWLEDGE BASE ===
{knowledge_base}

Remember: You are a knowledgeable friend. Be warm. Be specific. Give real advice. Max 350 words."""

EXIT_PLAN_SYSTEM = """You are SafeVoice's Safe Exit Planner for India. You are a warm, practical friend who has helped women leave abusive situations before. You know Indian law, government resources, and the streets.

{lang_instruction}

CRITICAL RULES:
1. Ask ONE focused question at a time — do not overwhelm her
2. Give SPECIFIC numbered steps based on what she tells you — never generic advice
3. Reference real Indian resources with exact contact numbers
4. You MUST return valid JSON and nothing else — no text before or after the JSON

PERSONALISE based on her answers:
- IMMEDIATE DANGER: Skip preparation. Call 112. Go to OSC (call 181). Life first, documents later.
- NO MONEY: One Stop Centre is 100% free — food, shelter, legal, medical. Call 181. Jan Dhan account at any bank with just Aadhaar.
- NO DOCUMENTS: OSC does not need documents for emergency. Aadhaar reprinted at any CSC for Rs 50.
- HAS CHILDREN: Take children when leaving. Inform school confidentially after. Apply interim custody at Family Court.
- PHONE MONITORED: Use neighbour's phone. Delete browser history after this.

=== KNOWLEDGE BASE ===
{knowledge_base}

=== HER SITUATION SO FAR ===
{context}

Return ONLY valid JSON, nothing before or after:
{{
  "reply": "2 sentences of warmth then numbered specific steps for HER situation. Use real Indian resources with exact numbers. No asterisks. Numbers like 1. 2. 3. Plain text only.",
  "locationTip": "Tell her to search Google Maps for a specific safe place near her. Example: Search Google Maps for: One Stop Centre near me. Or null if not relevant.",
  "followUpQuestion": "One specific caring follow-up question to personalise further. Or null if plan is complete.",
  "options": ["Specific answer option 1", "Specific answer option 2", "Specific answer option 3", "Specific answer option 4"],
  "nextQuestionId": "short_snake_case_id"
}}"""

ALLY_SYSTEM = """You are SafeVoice's Ally Mode for India. You help friends, family, and neighbours who suspect someone they love is being abused. You are warm, knowledgeable, and give specific practical advice.

{lang_instruction}

CRITICAL RULES:
1. Give specific scripts and numbered steps — never just list helplines
2. Give EXACT WORDS to say in Indian context
3. Tell them what NOT to say — common mistakes that push survivors away
4. You MUST return valid JSON and nothing else

=== KNOWLEDGE BASE ===
{knowledge_base}

=== ALLY'S CONTEXT SO FAR ===
{context}

Return ONLY valid JSON, nothing before or after:
{{
  "reply": "2 sentences of warmth, then numbered specific steps with exact scripts. Plain text, no asterisks.",
  "doThis": "The single most important specific thing they can do TODAY. Or null.",
  "followUpQuestion": "One focused follow-up question to give more specific help. Or null.",
  "options": ["Specific option 1", "Specific option 2", "Specific option 3", "Specific option 4"],
  "nextQuestionId": "short_id"
}}"""

# ═══════════════════════════════════════════════════════════════════════════════
# REQUEST MODELS
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

class AllyRequest(BaseModel):
    observation: str
    language: str

class ExitPlanRequest(BaseModel):
    has_children: bool = False
    has_income: bool = False
    has_trusted_person: bool = False
    has_documents: bool = False
    has_transport: bool = False
    is_immediate_danger: bool = False
    has_shelter: bool = False
    abuser_at_home: bool = False
    situation_detail: str = ""
    language: str = "en"

class ComplaintRequest(BaseModel):
    entries: List[Dict]
    language: str

# ═══════════════════════════════════════════════════════════════════════════════
# HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

def call_cerebras(system: str, messages: list, max_tokens: int = 900) -> str:
    """Call Cerebras API with proper message formatting."""
    clean_messages = []
    for m in messages:
        role = m.get("role", "")
        content = m.get("content", "")
        if role in ["user", "assistant"] and content:
            clean_messages.append({"role": role, "content": content})

    if not clean_messages:
        clean_messages = [{"role": "user", "content": "Hello"}]

    # Cerebras requires alternating user/assistant messages
    # Ensure first message is from user
    if clean_messages[0]["role"] != "user":
        clean_messages.insert(0, {"role": "user", "content": "Please help me."})

    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "system", "content": system}] + clean_messages,
        max_tokens=max_tokens,
        temperature=0.7
    )
    return response.choices[0].message.content

def parse_json_response(raw: str) -> dict:
    """Extract JSON from AI response."""
    try:
        # Try direct parse first
        return json.loads(raw.strip())
    except Exception:
        pass
    try:
        # Extract JSON block
        match = re.search(r'\{[\s\S]*\}', raw)
        if match:
            return json.loads(match.group())
    except Exception:
        pass
    # Fallback
    return {
        "reply": raw,
        "locationTip": None,
        "followUpQuestion": None,
        "options": None,
        "nextQuestionId": None,
        "doThis": None
    }

# ═══════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/health")
def health():
    return {"status": "SafeVoice backend running", "model": MODEL}

@app.get("/helplines")
def helplines():
    return {
        "helplines": KB.get("helplines", []),
        "shelters": KB.get("shelters", []),
        "landmark_cases": KB.get("landmark_cases", []),
        "myths": KB.get("myths", [])
    }

@app.post("/chat")
def chat(req: ChatRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    system = CHAT_SYSTEM.format(
        lang_instruction=lang_instruction,
        knowledge_base=KNOWLEDGE_BASE
    )
    messages = list(req.history[-8:])
    if not messages or messages[-1].get("role") != "user":
        messages.append({"role": "user", "content": req.message})

    reply = call_cerebras(system, messages, max_tokens=900)
    return {"reply": reply}

@app.post("/exit-plan-chat")
def exit_plan_chat(req: ExitPlanChatRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    system = EXIT_PLAN_SYSTEM.format(
        lang_instruction=lang_instruction,
        knowledge_base=KNOWLEDGE_BASE,
        context=json.dumps(req.context, ensure_ascii=False)
    )
    messages = list(req.history[-10:])
    if not messages:
        messages = [{"role": "user", "content": req.lastAnswer}]

    raw = call_cerebras(system, messages, max_tokens=950)
    return parse_json_response(raw)

@app.post("/ally-chat")
def ally_chat(req: AllyChatRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    system = ALLY_SYSTEM.format(
        lang_instruction=lang_instruction,
        knowledge_base=KNOWLEDGE_BASE,
        context=json.dumps(req.context, ensure_ascii=False)
    )
    messages = list(req.history[-10:])
    if not messages:
        messages = [{"role": "user", "content": req.lastAnswer}]

    raw = call_cerebras(system, messages, max_tokens=950)
    result = parse_json_response(raw)
    if "doThis" not in result:
        result["doThis"] = None
    return result

@app.post("/nearby-places")
def nearby_places(req: NearbyPlacesRequest):
    base = "https://www.google.com/maps/search/"
    queries = {
        "police": [
            {"label": "Women Police Station", "query": "women+police+station", "icon": "🚔"},
            {"label": "Nearest Police Station", "query": "police+station", "icon": "🚓"},
        ],
        "shelter": [
            {"label": "One Stop Centre (Free Govt)", "query": "one+stop+centre+sakhi", "icon": "🏠"},
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
        result.append({
            "label": p["label"],
            "icon": p["icon"],
            "mapsUrl": f"{base}{p['query']}+near+me/@{req.lat},{req.lng},14z",
            "directionsUrl": f"https://www.google.com/maps/dir/?api=1&origin={req.lat},{req.lng}&destination={p['query']}"
        })
    return {"places": result}

# ── Legacy endpoints (kept for frontend compatibility) ────────────────────────

@app.post("/ally")
def ally_legacy(req: AllyRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    system = f"""{lang_instruction}
You are a domestic abuse support assistant for India. Give specific numbered steps for someone wanting to help a potential abuse victim. Include exact scripts of what to say."""
    messages = [{"role": "user", "content": f"I observed: {req.observation}. What should I do to help this person?"}]
    return {"guidance": call_cerebras(system, messages, max_tokens=600)}

@app.post("/exit-plan")
def exit_plan_legacy(req: ExitPlanRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    situation = f"""Has children: {req.has_children}
Has income: {req.has_income}
Has trusted person: {req.has_trusted_person}
Has documents: {req.has_documents}
In immediate danger: {req.is_immediate_danger}
Abuser at home: {req.abuser_at_home}
Additional context: {req.situation_detail}"""
    system = f"""{lang_instruction}
You are a domestic abuse safety planner for India. Give a personalised numbered exit plan based on the specific situation provided. Reference real Indian resources like One Stop Centre (181), DLSA (1516), Jan Dhan accounts."""
    messages = [{"role": "user", "content": f"Create a personalised safety exit plan for this situation:\n{situation}"}]
    return {"plan": call_cerebras(system, messages, max_tokens=700)}

@app.post("/format-complaint")
def format_complaint(req: ComplaintRequest):
    lang_instruction = LANG_INSTRUCTIONS.get(req.language, LANG_INSTRUCTIONS["en"])
    entries_text = "\n\n".join([
        f"[{e.get('date', 'Unknown date')}] {e.get('text', '')}"
        for e in req.entries
    ])
    system = f"""{lang_instruction}
Format these diary entries into a structured police complaint/FIR document.
Start with: "To, The Station House Officer..."
Include: complainant situation, chronological incidents, laws violated (IPC 498A, PWDVA), relief sought."""
    messages = [{"role": "user", "content": f"Format these incident logs as an FIR complaint:\n\n{entries_text}"}]
    return {"complaint": call_cerebras(system, messages, max_tokens=800)}