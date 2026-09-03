# FIDEL Proposal vs. Current Qubee Build — Gap Analysis

*Generated from graphify knowledge graph analysis (19,680 nodes, 47,977 edges, 753 communities)*

---

## Executive Summary

| Dimension | FIDEL Proposal | Current Qubee Build | Status |
|-----------|---------------|---------------------|--------|
| **Target Market** | Ethiopia Grades 9-12 (10M+ students) | Global classroom platform | ❌ Different scope |
| **Languages** | Amharic, Afaan Oromo, Tigrinya (first-class) | 13 languages: zh, en, ja, ru, ar, pt, ko, es, fr, vi, de | ❌ No Ethiopian languages |
| **Architecture** | Offline-first (USB/SD, browser-only) | Server-dependent Next.js + API routes | ❌ Fundamental mismatch |
| **Core AI** | Linguistic Leveler + Exam Predictor + Parental Proxy | Agent workbench + generation pipeline | ❌ Different core features |
| **Business Model** | Cross-subsidization (private→public) | MIT open source | ❌ Different model |
| **Sovereign AI** | Ethio-Brain (fine-tuned on Ethiopian data) | Provider-neutral (bring your own) | ❌ Opposite philosophy |
| **Sector Apps** | Agriculture, Healthcare, Bureaucracy, Finance | General classroom platform | ❌ No sector apps |

---

## Detailed Capability Gap Matrix

### 1. Language & Localization ❌ CRITICAL GAP

| Feature | FIDEL | Qubee | Gap |
|---------|-------|-------|-----|
| **Amharic** | First-class (UI + TTS + ASR + content) | Not supported | ❌ Missing |
| **Afaan Oromo** | First-class | Not supported | ❌ Missing |
| **Tigrinya** | First-class | Not supported | ❌ Missing |
| **Ethiopian scripts** | Ge'ez/Amharic script rendering | Latin/CJK only | ❌ Missing |
| **RTL support** | Needed for Arabic-script languages | Partial (Arabic only) | ⚠️ Partial |

**Qubee Current**: 13 languages (zh, en, ja, ru, ar, pt, ko, es, fr, vi, de) — all major global languages, zero Ethiopian.

---

### 2. Offline-First Architecture ❌ FUNDAMENTAL GAP

| Feature | FIDEL | Qubee | Gap |
|---------|-------|-------|-----|
| **USB/SD card boot** | Core requirement | Not designed for | ❌ Missing |
| **Local-first file system** | `/Grade/Subject/Unit/Content.pdf` | Server-dependent | ❌ Missing |
| **Service Worker / PWA** | Required | Not implemented | ❌ Missing |
| **Local AI inference** | On-device when possible | Server-only | ❌ Missing |
| **Zero-latency rendering** | Core requirement | Network-dependent | ❌ Missing |
| **Sync when online** | Background sync | Real-time only | ❌ Missing |

**Qubee Current**: Next.js 15 App Router, requires Node.js server, API routes for all AI operations. No service worker, no PWA manifest, no offline caching strategy.

---

### 3. Core FIDEL Features ❌ MISSING

| Feature | FIDEL Spec | Qubee Status |
|---------|------------|--------------|
| **Linguistic Leveler** | Highlight text → simplified English + mother tongue audio (Amharic/Oromo/Tigrinya) + diagram | ❌ No sentence-level simplification, no mother tongue TTS, no auto-diagram retrieval |
| **National Exam Predictor** | 15 years exam data → predicted questions, mastery map (R/Y/G), targeted revision queues | ❌ No exam data, no mastery heat map, no revision queues |
| **Parental Proxy** | Daily 2-min audio summary in parent's language + follow-up question | ❌ No parent features |
| **Code-in-Context Simulator** | Python sidebar for STEM chapters (editable, real-time) | Has PBL simulator (roleplay), but no Python STEM sidebar |
| **Adaptive Micro-assessments** | 5-q per subchapter, drives AI tutor adaptation | Has quiz generation but not adaptive micro-assessment loop |

---

### 4. Business Model ❌ OPPOSITE PHILOSOPHY

| Feature | FIDEL | Qubee |
|---------|-------|-------|
| **Model** | Cross-subsidization (private→public) | MIT open source |
| **Private Tier** | 500 schools × 3,000-5,000 ETB/mo | N/A |
| **Public Tier** | Free for gov schools, zero-rated data | Free (MIT) |
| **Revenue → Compute** | Surplus funds GPU cluster | N/A |
| **Surplus → R&D** | Explicit reinvestment | N/A |
| **Licensing** | Proprietary tiers | MIT |

---

### 5. Strategic Data Assets ❌ MISSING

| Asset | FIDEL Vision | Qubee Status |
|-------|--------------|--------------|
| **National Pedagogical Dataset** | Real-time map of 10M students' comprehension | ❌ No national-scale analytics |
| **Ministry Dashboard** | Live curriculum bottleneck detection | ❌ No ministry integration |
| **Sovereign AI (Ethio-Brain)** | Fine-tuned Llama/Qwen on Ethiopian QA pairs | ❌ Provider-neutral, no fine-tuning |
| **Ethio-Language API** | Commercial Amharic/Oromo/Tigrinya API | ❌ No language API |
| **Student API** | Tiered developer access (Starter/Advanced/Elite) | ❌ No student developer program |
| **Data Privacy** | Client-side PII stripping, aggregated clusters | Standard web app privacy |

---

### 6. Sector-Specific Applications ❌ COMPLETELY MISSING

| Sector | FIDEL Application | Qubee Status |
|--------|-------------------|--------------|
| **Agriculture** | Gebere-AI (crop disease vision on 2G) | ❌ No vision models, no agriculture domain |
| **Healthcare** | Rural triage for HEWs (Amharic, offline) | ❌ No healthcare domain |
| **Bureaucracy** | Amharic/Ge'ez OCR for handwritten docs | ❌ No OCR, no Ge'ez support |
| **Financial Inclusion** | Alternative credit scoring (Telebirr, airtime, coop data) | ❌ No fintech features |

---

## Qubee Strengths (Reusable for FIDEL)

| Strength | FIDEL Relevance |
|----------|-----------------|
| **@qubee/dsl** — Rich scene DSL (slides, quizzes, PBL, charts, LaTeX, 3D) | ✅ Core content format |
| **@qubee/renderer** — React renderer with interactive elements | ✅ Frontend rendering |
| **@qubee/editor** — Pro-mode slide/canvas editor with AI assist | ✅ Content authoring |
| **@qubee/generation** — Two-stage outline→scene pipeline | ✅ Generation backbone |
| **@qubee/storage** — Swappable persistence (Postgres, HTTP, S3, browser) | ✅ Persistence layer |
| **@qubee/importer** — PPTX import | ✅ Content ingestion |
| **Agent Runtime** — LangGraph orchestration, 28+ action types | ✅ Agent orchestration |
| **Playback Engine** — Real-time classroom playback | ✅ Classroom delivery |
| **Action Engine** — 28+ actions (speech, whiteboard, spotlight, laser) | ✅ Classroom interactions |
| **Video Export** — Headless Chromium + FFmpeg, deterministic | ✅ Video export |
| **TTS/ASR Framework** — Pluggable providers (OpenAI, ElevenLabs, VoxCPM2, MiniMax) | ⚠️ Framework exists, needs Ethiopian voices |
| **OpenClaw Skill** — Agent workbench integration | ✅ Workbench integration |

---

## Migration Effort Estimate

| Workstream | Effort | Notes |
|------------|--------|-------|
| **Offline-first architecture** | 6-8 weeks | Service worker, local-first sync, IndexedDB storage, PWA manifest |
| **Ethiopian languages (3)** | 8-12 weeks | i18n entries, font support (Ge'ez), locale data, UI RTL |
| **TTS/ASR Ethiopian voices** | 4-6 weeks | VoxCPM2 fine-tuning, ElevenLabs custom voices, browser TTS fallback |
| **Linguistic Leveler** | 6-8 weeks | Sentence simplification + mother tongue TTS + diagram retrieval |
| **Exam Predictor** | 8-10 weeks | 15-year data ingestion, mastery map, revision queue engine |
| **Parental Proxy** | 4-6 weeks | Audio summary generation, multilingual TTS |
| **Code-in-Context Simulator** | 6-8 weeks | Python sandbox (Pyodide), STEM chapter integration |
| **Offline-first PWA** | 8-10 weeks | Service worker, IndexedDB, background sync, USB/SD distribution |
| **National Dataset/Analytics** | 10-12 weeks | Event pipeline, aggregation, ministry dashboard |
| **Ethio-Brain Fine-tuning** | 12-16 weeks | Data pipeline, Llama/Qwen fine-tuning, eval harness |
| **Student API** | 8-10 weeks | Tiered access, compute allocation, billing |
| **Sector Apps (4)** | 20-24 weeks | 4 parallel tracks (agri, health, bureau, finance) |
| **Cross-subsidization Billing** | 6-8 weeks | Tiered licensing, private/public routing, analytics |

**Total Estimated**: **100-130 engineer-weeks** (2-3 years with 2-3 engineers)

---

## Recommended Approach

Given the fundamental architectural differences, **don't try to fork Qubee directly for FIDEL**. Instead:

1. **Extract reusable packages**: `@qubee/dsl`, `@qubee/renderer`, `@qubee/storage`, `@qubee/generation` as SDK dependencies
2. **Build FIDEL as new application** with:
   - Offline-first PWA architecture (Vite + React, not Next.js)
   - Local-first data layer (IndexedDB + sync engine)
   - Ethiopian language stack from ground up
   - FIDEL-specific features as new modules

3. **Use Qubee as component library**, not as base application

```bash
# Suggested FIDEL stack
pnpm add @qubee/dsl @qubee/renderer @qubee/storage @qubee/generation @qubee/editor @qubee/importer
# Build FIDEL app on Vite + React + PWA + IndexedDB
```

---

## Immediate Next Steps

1. **Validate Ethiopian TTS/ASR**: Test VoxCPM2, ElevenLabs, browser SpeechSynthesis for Amharic/Oromo/Tigrinya
2. **Prototype offline PWA**: Vite + Workbox + IndexedDB + background sync
3. **Scope Linguistic Leveler**: Design prompt chain for simplification + mother tongue TTS
4. **Assess exam data availability**: 15 years Ethiopian exam papers → structured data
5. **Engage Ministry/Partners**: Secure exam data, curriculum alignment, distribution channels

---

*Analysis based on graphify knowledge graph: 19,680 nodes, 47,977 edges, 753 communities. Queries executed via `graphify query/path/explain`.*