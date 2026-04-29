# Supervisor Feedback Analyzer — Trinethra Module

An AI-assisted tool for DeepThought psychology interns to analyze supervisor feedback transcripts. Built with Next.js and integrated with local Ollama.

## Setup Instructions

### 1. Prerequisites
- **Node.js**: Install the latest LTS version.
- **Ollama**: Download and install from [ollama.com](https://ollama.com).

### 2. Pull the LLM Model
Ensure Ollama is running and pull a model (llama3.2 is recommended for balance of speed and reasoning):
```bash
ollama pull llama3.2
```

### 3. Install Dependencies & Setup Database
Navigate to the project folder and run:
```bash
npm install
npx prisma generate
npx prisma db push
```

### 4. Run the Application
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture Overview

- **Frontend**: Next.js App Router (React) with **CSS Modules**. The UI uses modern glassmorphism and radial gradients for a premium feel.
- **Backend**: Next.js **Route Handlers** (API).
- **Database**: **SQLite** managed with **Prisma ORM**. Stores transcript history and AI results locally.
- **AI Integration**: Communicates with the local **Ollama HTTP API** (`http://localhost:11434/api/generate`).
- **Context Handling**: Domain knowledge (`context.md`), rubrics (`rubric.json`), and sample transcripts are stored in the `/data` directory and used to prime the LLM.

## Design Challenges Tackled

### Challenge 1: One Prompt or Many?
I chose a **Single Unified Prompt**. For a 10-15 minute transcript, a single well-structured prompt with clear instructions for a JSON structure is optimal for speed. It simplifies coordination and provides the LLM with the full context needed to cross-reference evidence against the rubric in one pass.

### Challenge 2: Structured Output Reliability
I implemented **Strict JSON Mode** by passing `format: 'json'` to Ollama. Additionally, the backend includes a fallback **regex-based parser** to handle cases where the model might wrap the response in markdown code blocks, ensuring high reliability for the frontend.

## Chosen Ollama Model
**Model: `llama3.2` (3B)**
Chosen because it is lightweight enough to run on most hardware while possessing strong enough instruction-following capabilities to adhere to the complex rubric requirements and output clean JSON.

## Future Improvements
- **Side-by-Side Review**: Add a split-screen view where the intern can highlight the transcript and see the AI link it to specific evidence in real-time.
- **Manual Edit History**: Allow the intern to edit the AI's suggestions and save the final "human-verified" version to a database for future model fine-tuning.
- **Batch Processing**: Allow uploading multiple transcripts at once to generate a summary dashboard for the whole team.
