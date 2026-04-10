<div align="center">
  <img src="public/Screenshot_2026-04-10_155242-removebg-preview.png" width="150" alt="Cymonic Logo" />
  <h1>Cymonic Autonomous Content Factory</h1>
  <p><strong>A Next-Generation AI Pipeline for Professional Content Engineering</strong></p>
</div>

---

## 🚀 Brief Description of the Solution

The **Cymonic Autonomous Content Factory** is an enterprise-grade web application designed to distil raw, unstructured input data into highly professional, multi-channel marketing campaigns. Leveraging a sophisticated Multi-Agent AI Orchestrator running entirely in the browser, the application acts as an automated marketing department—capable of intaking voice dictation or raw file dumps and simultaneously compiling bespoke Social Threads, SEO Blog Posts, and Email Newsletters formatted dynamically to specific audience and tone parameters.

## 🎯 How the Project Addresses the Identified Problem

**The Problem:** Modern start-ups and enterprise teams face a significant bottleneck when converting technical raw facts and product specifications into diverse, audience-ready marketing materials. Manual drafting across different formats (blogs, social media, press releases) is extremely time-consuming, expensive, and prone to inconsistent brand voice. Furthermore, utilizing single prompt-based AI chats often yields unstructured, generic "fluff" and frequently disconnects from the core facts.

**Our Solution:** Cymonic solves this by orchestrating a structured **Hive-Mind of 3 independent AI Agents** working in sequence:
1. **The Researcher:** Blindly extracts pure objective facts from the raw input drop, stripping away any potential hallucination variables to generate a "Source of Truth" JSON object.
2. **The Copywriter:** Inherits the strict Fact-Sheet and mathematically maps it against requested "Tone Vectors", safely weaving the facts into distinct formats simultaneously.
3. **The Editor:** A final policing layer that audits the generated drafts against formatting structural criteria and confirms the final data schema.
By segmenting the workflow, we guarantee 100% brand consistency, zero factual dilution, and split-second parallel generation across infinite marketing formats.

## 💻 Tech Stack Used

- **Frontend Core:** React.js, Vite (Fast Hot Module Replacement)
- **Styling:** Custom CSS Grid/Flexbox architectures with advanced Glassmorphism and responsive Tailwind CSS utility injections.
- **Iconography:** `lucide-react`
- **Generative AI Orchestration (Dual-Pipeline Architecture):**
  - **Groq API (`llama-3.1-8b-instant`):** Utilized for ultra-low latency inference during the Research Extraction and Editor Audit phases.
  - **Google Gemini API (`gemini-1.5-flash`):** Specifically deployed as the 'Heavy Lifter' in the Copywriter module to process massive token generations without hitting standard network rate limits.
- **Native Browser APIs:** Web Speech API for real-time voice-to-text dictation mapping.

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
