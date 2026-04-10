<div align="center">
  <img src="public/Screenshot_2026-04-10_155242-removebg-preview.png" width="150" alt="Cymonic Logo" />
  <h1>Cymonic Autonomous Content Factory</h1>
  <p><strong>A Next-Generation AI Pipeline for Professional Content Engineering</strong></p>
</div>

---

## 🚀 Overview

The **Cymonic Autonomous Content Factory** is an enterprise-grade web application designed to automatically distill raw unstructured data into professional, multi-channel marketing campaigns. 

Built with React and Vite, the platform utilizes a sophisticated **Multi-Agent Orchestrator** to analyze facts, emulate specific brand vectors, and compile tailored assets including SEO Blog Posts, Social Threads, Newsletters, and Press Releases entirely autonomously.

## 🛠️ Architecture: Dual-AI Pipeline

To guarantee 100% uptime and completely bypass standard free-tier Token-Per-Minute (TPM) network rate limits, Cymonic employs an advanced **Dual-AI Sharding Protocol**:

1. **Research & Extraction Agent (Groq / Llama 3.1 8B):** High-velocity data extraction model trained to blindly distill pure objective facts and brand vectors from your raw text drops.
2. **Creative Copywriter (Google Gemini 1.5 Flash):** Offloads the massive token generation burden onto the highly-permissive Google Generative AI API. This module acts as the "Heavy Lifter," safely weaving the facts into distinct formats (Markdown, CSV, JSON) without triggering 429 server crashes.
3. **Quality Assurance Editor (Groq / Llama 3.1 8B):** A final policing layer that audits the generated drafts against your structural criteria and confirms the final data schema.

> **High-Availability Fallback:** If the live APIs are ever fully exhausted, the system seamlessly redirects the processing pipeline into "Offline Degradation Mode," injecting beautifully formatted mock content to ensure UI continuity during demonstrations.

## ✨ Features

- **Bulletproof 3-Column Glassmorphism Layout:** Stunning UI aesthetics heavily inspired by modern sci-fi interfaces and clean SaaS principles.
- **Persistent State Dashboard:** Maintains your generated workflows dynamically across stages.
- **Voice-to-Text Input:** Built-in web speech dictation for rapid fact extraction.
- **Format Agnostic Output:** Generates strictly compliant JSON payloads which are compiled into functional Markdown objects for immediate use.
- **SEO & Verbosity Overrides:** Micro-tune your assets at launch by defining exact target demographics and keyword densities.

## ⚙️ Local Development

### 1. Installation

Clone the repository and install the dependencies:
```bash
git clone https://github.com/anjanamoduvil/Autonomous-Content-Factory.git
cd Autonomous-Content-Factory
npm install
```

### 2. Configure Node Environment

You will need two API keys heavily integrated into your `.env.local` to trigger the Dual-Pipeline:

```env
VITE_GROQ_API_KEY=your_groq_llama_key
VITE_GEMINI_API_KEY=your_google_gemini_key
```

### 3. Ignite the Engine

Run the fast-refreshing Vite development server:
```bash
npm run dev
```

Open your browser to `http://localhost:5173/` to view the live dashboard!

---
*Powered by Cymonic Intelligence Network.* 
