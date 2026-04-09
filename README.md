# Cymonic Autonomous Content Factory

The **Cymonic Autonomous Content Factory** is the ultimate multi-agent AI digital marketing campaign builder. Powered by blazing-fast open-source intelligence (Meta's LLaMA 3 via Groq) and seamlessly woven together to eliminate creative burnout and inconsistency. 

This tool serves as an autonomous assembly line where a single source document can instantly be repackaged into multiple highly engaging formats for your brand.

## 🚀 Features

- **Upload & Parse:** Effortlessly supply your facts via text input or by uploading `.txt` / `.md` files.
- **Agentic Workflow:** Connects three specialized "AI Agents" inside an interactive *Agent Room*.
  - 🔍 **Lead Research & Fact-Checker:** Mines your raw text to extract core facts and build a single "Source of Truth" JSON object.
  - ✍️ **Creative Copywriter:** Uses the truth data to generate tailored marketing content in multiple formats.
  - 🛡️ **Editor-in-Chief:** Audits the generated drafts to prevent hallucination, enforce tone, and apply strict brand guidelines.
- **Dynamic Targeting:** Set custom Campaign Tones (e.g., Bold & Disruptive, Urgent & Exciting) and specify granular Target Audiences.
- **Multi-Format Export:** Instantly outputs formatted Blog Posts, Social Media Threads, and Email Teasers.
- **Download Campaign Kit:** Download all generated assets locally as a `.zip` file for instant deployment.

## 🛠️ Technology Stack

- **Frontend:** React + Vite
- **Styling:** Vanilla CSS (Glassmorphism, Neon Dark Mode)
- **AI Core:** Built using the **Groq API** connecting natively to **Llama-3.3-70b**.
- **Icons & Assets:** Lucide React

## 💻 Getting Started

### 1. Requirements
- Node.js (v18+)

### 2. Installation
Clone this repository and install the dependencies:

```bash
git clone https://github.com/anjanamoduvil/Autonomous-Content-Factory.git
cd Autonomous-Content-Factory
npm install
```

### 3. Start the Factory
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) to see the dashboard.

## 🎨 Powered by Cymonic
This application is fully tailored and branded under [Cymonic AI](https://cymonic.ai/). All AI agents operate under Cymonic's architectural guidelines, ensuring marketing assets are uniformly branded.
