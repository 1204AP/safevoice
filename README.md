# SafeVoice
### Silent AI Legal Support for Women Facing Domestic Abuse

SafeVoice is an **anonymous, multilingual, AI-powered legal guidance platform** designed for women experiencing **domestic abuse**, especially in contexts where calling for help is unsafe or impossible.

Unlike most women’s safety apps that focus on **stranger danger**, SafeVoice is built for the reality that abuse often happens **inside the home**, from someone the victim knows and fears.

The platform provides **silent legal guidance, safety planning, discreet access to help, and evidence support** — all without requiring a login or storing sensitive personal data.

---

## Problem Statement

Women facing domestic violence often stay silent not because they want to, but because they are trapped by:

- Fear of retaliation
- Financial dependence
- Social and family pressure
- Lack of private access to legal help
- Language barriers in understanding legal rights

Most existing safety applications focus on:
- SOS alerts
- Location sharing
- Emergency calling

But these fail in situations where:
- The abuser is sitting nearby
- The phone is monitored
- The victim cannot safely make a call
- Legal resources are inaccessible or too complex

SafeVoice addresses this gap.

---

## Our Solution

SafeVoice is a **private, multilingual AI assistant** that helps users:

- Understand what kind of abuse they may be facing
- Learn what legal protections are available
- Access safety planning support
- Discreetly gather evidence
- Explore local help and support pathways
- Use the app safely without drawing attention

The system is designed to feel **supportive, silent, and practical**, rather than overwhelming or intimidating.

---

## Key Features

### 1. AI Legal Guidance Chatbot
Users can describe their situation in **plain everyday language**, and the AI responds with:

- Relevant legal guidance
- Immediate next steps
- Safety-oriented advice
- Actionable support information

Example:
> “My husband beats me when he drinks and I have two children.”

The AI can help interpret this and guide the user toward relevant support options.

---

### 2. Multilingual Support
SafeVoice is designed to support women who may not be comfortable using English.

Languages supported/planned:
- English
- Kannada
- Hindi
- Telugu

This makes the platform more accessible for women in Karnataka and surrounding regions.

---

### 3. Disguise Mode
A stealth interface that helps the app remain discreet if someone walks in or checks the phone.

This feature is intended to reduce the risk of discovery in unsafe environments.

---

### 4. Evidence Vault *(Novel Feature)*
A private, local-only evidence logging tool where users can safely store:

- Typed incident notes
- Photos
- Audio recordings
- Date/time-stamped entries

#### Why this matters:
Many women do not report abuse immediately.  
When they are finally ready, they often lack a structured record.

SafeVoice helps them build a **private, verifiable incident history** that can later assist in legal or police reporting.

#### Privacy-first approach:
- Stored **locally on device**
- No cloud upload
- No public account required
- Intended to be encrypted in future versions

---

### 5. Safe Exit Planner *(Novel Feature)*
An AI-generated **personalized escape and safety checklist** for women preparing to leave an abusive environment.

The plan can adapt to practical factors such as:
- Presence of children
- Financial dependence
- Immediate risk
- Need for shelter or local support

Example outputs may include:
- What documents to collect
- What emergency items to keep ready
- What to tell a trusted person
- What first safe step to take

This turns abstract “get help” advice into **real-world action steps**.

---

### 6. Ally Mode *(Novel Feature)*
A separate interface for:
- Friends
- Neighbours
- Classmates
- Relatives
- Bystanders

Many people suspect abuse but do not know how to help safely.

Ally Mode provides:
- What to say
- What not to say
- How to approach someone safely
- How to support without escalating danger

This expands the app’s impact beyond just the direct victim.

---

## Why SafeVoice is Different

Most safety apps are built for:
- Street harassment
- Stranger attacks
- Emergency SOS use cases

SafeVoice is built for:
- Domestic abuse
- Coercive control
- Silent help-seeking
- Legal literacy
- Privacy-first access to support

### Core differentiators:
- Anonymous usage
- No login required
- Silent interface
- Multilingual access
- Abuse-aware AI interaction
- Personalized safety planning
- Evidence support
- Ally support mode

---

## Tech Stack

### Frontend
- **React.js**
- Responsive UI for mobile-friendly usage

### Backend
- **Python**
- **FastAPI**

### Knowledge Base
- Static structured legal and support data in **JSON**
- Includes legal and safety-related informational content

### AI / Intelligence Layer
Planned or integrated support for:
- LLM-based legal guidance
- Rule-based safety flow logic
- Retrieval from knowledge base

---

## Project Structure

```bash
safevoice/
│
├── frontend/           # React frontend
├── backend/            # FastAPI backend
├── knowledge_base/     # Legal and support knowledge data
└── README.md
```

---

## Frontend Components

The frontend includes dedicated modules such as:

- `AllyMode.js`
- `ChatScreen.js`
- `DisguiseMode.js`
- `EvidenceVault.js`
- `ExitPlanner.js`
- `LanguageSelector.js`
- `Navigation.js`

These components collectively provide the user-facing safety and support experience.

---

## Backend Overview

The backend is responsible for:

- Handling user queries
- Connecting frontend interactions to AI logic
- Returning chatbot responses
- Managing future legal/safety prompt routing

Main files include:

- `main.py`
- `test.py`

---

## Knowledge Base

The knowledge base currently uses:

- `data.json`

This is intended to store structured information such as:

- Legal awareness content
- Safety response patterns
- Abuse support information
- Localized guidance data

---

## Privacy & Safety Design Principles

SafeVoice is built around **privacy-first and survivor-sensitive design**.

### Design principles:
- No forced sign-up
- No unnecessary personal data collection
- Silent interaction model
- Minimal digital trace
- Discreet interface options
- Supportive, non-judgmental guidance

### Important Note
SafeVoice is designed as a **support and guidance tool**, not a replacement for:
- emergency response
- legal representation
- law enforcement
- medical intervention

---

## Feasibility

This project is intentionally designed to be **hackathon-feasible** while still addressing a real and high-impact problem.

### Core MVP includes:
- AI chatbot
- Multilingual flow
- Disguise mode
- Evidence Vault
- Safe Exit Planner
- Ally Mode

These features can be demonstrated effectively as a strong prototype and expanded into a deployable social-impact product.

---

## Future Scope

Potential future enhancements include:

- Voice input / voice output
- Local shelter and helpline integration
- FIR / complaint drafting assistant
- Legal document summarization
- Offline-first support
- Secure local encryption for Evidence Vault
- Region-specific NGO / legal aid directory
- Role-based safety workflows for NGOs and social workers

---

## Impact

SafeVoice is designed not just as a chatbot, but as a **quiet intervention tool** for women who may not have any safe way to ask for help.

Its goal is to provide:

- clarity
- privacy
- dignity
- actionability
- access to support

at the exact moment when silence is most dangerous.

---

**Team Nova**

- Adithi B Prabhu
- Ananya J C
- Anusha

---

## Disclaimer

This project is a prototype created for educational and hackathon purposes.  
It should not be treated as a substitute for professional legal, medical, or emergency support.
