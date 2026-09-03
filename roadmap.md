# Qubee → FIDEL Roadmap

**Goal**: Turn the Qubee codebase into Project FIDEL — an offline-first, mother-tongue AI learning platform for Ethiopian Grades 9–12 — and ultimately Ethiopia's sovereign AI infrastructure.

**Reference documents**:
- `Functionality.md` — what Qubee does today (capability reference)
- `vision.md` — gap analysis: FIDEL proposal vs. current build
- `graphify-out/graph.html` — interactive codebase graph (19,680 nodes)
- `PROJECT_CALL_MAP.md` — file-level dependency map

**Framing assumption**: 1–3 focused builders using AI-assisted development. Timeline is in *focused engineering weeks*, not calendar weeks.

---

## 0. North Star & Guiding Principles

**North Star**: Every Ethiopian Grade 9–12 student can learn the national curriculum in their mother tongue, offline, with a personal AI tutor — regardless of connectivity or income.

### Principles (non-negotiable)
1. **Offline is the product, not a mode.** Connectivity may enhance; it may never gate.
2. **Assemble, don't fork.** FIDEL consumes `@qubee/*` SDK packages. It is not a fork of the Next.js app.
3. **Mother tongue first.** Amharic/Oromo/Tigrinya are first-class; English is a scaffold.
4. **Curriculum-aligned.** Content maps to the actual Ethiopian national curriculum & textbooks (MoE).
5. **Data moat from day one.** Every offline session synced back is a pedagogical dataset point.
6. **Ship one school.** A working pilot in 1 school beats a designed platform for 10 million.
7. **Privacy by design.** PII stripped client-side; analytics only on aggregated clusters.

### Strategy in one sentence
Use Qubee's generation engine + renderer as the **content factory**, wrap it in an **offline PWA player**, add an **Amharic-first language layer**, pilot in one school, then scale distribution, data, and ecosystem in that order.

---

## 1. Architecture Direction (the big decisions)

### 1.1 Two applications, not one
| App | Name | Stack | Where it runs |
|---|---|---|---|
| **Author Studio** | Qubee (this repo) | Next.js, server, LLM APIs | Cloud / teacher machine (needs internet) |
| **FIDEL Player** | New app | Vite + React + Workbox PWA, IndexedDB | Any browser, from USB/SD/cache (offline) |

- Courses are **authored in Qubee**, **exported as self-contained packages** (ZIP: DSL JSON + assets + manifest), and **played in FIDEL Player**.
- The ZIP format already exists: `lib/export/classroom-zip-utils.ts` + `use-export-classroom.ts`. The player is the missing piece.
- Why not make Qubee itself offline? Next.js server app + agent runtime + full feature surface = the 100+ week path. The player only needs `@qubee/renderer` + `@qubee/dsl` + storage → small, fast, robust.

### 1.2 Course package format (v1)
```
/Physics_G10_Unit4.zip
├── manifest.json          # course id, grade, subject, unit, language(s), version
├── course.json            # stages[] → scenes[] (DSL: slides, quizzes, interactives)
├── assets/                # images, audio (TTS), fonts, diagrams
├── locales/am-ET.json     # optional in-package UI strings
└── assessment.json        # micro-assessments per subchapter (mastery model)
```
The **sync envelope** (separate, tiny): `progress.json` + `analytics.ndjson` — student state + anonymized events, synced when online.

### 1.3 AI routing (tiered, cost-controlled)
| Tier | Where | Models | Use |
|---|---|---|---|
| 0 — Fully offline | No AI, or tiny on-device rule engine | — | Render content, quizzes, review, mastery display |
| 1 — School LAN | Ollama on a school machine (already a Qubee provider) | Llama-3.1-8B / Qwen-2.5-7B quantized | Conversation, vocabulary, simple Q&A |
| 2 — Cloud (when online) | Tiered by complexity (proposal §2.1) | High-capacity reasoning for STEM; lightweight for vocab | Linguistic Leveler, deep explanations |
| 3 — Data sync | Background, opportunistic | — | Progress + anonymized analytics upload |

### 1.4 Content model for FIDEL
- **Not** generated on the fly in the field. **Pre-generated and bundled** per unit (deterministic, reviewable, offline).
- Generation pipeline: curriculum text (MoE PDFs) → `@qubee/generation` (outline → scenes) → human-in-the-loop review in Author Studio → export ZIP.
- PDF ingestion: existing material extraction + document parsers (AliDocMind / MinerU per README). Verify which are live.

---

## 2. The Roadmap (Phases)

Timeline summary:

| Phase | Name | Weeks | Exit criteria |
|---|---|---|---|
| 0 | Foundations & decisions | 1–2 | Decisions logged; pilot school; ethics/data agreement |
| 1 | Offline chain proof | 3–6 | A Grade-10 Physics chapter plays fully offline from ZIP |
| 2 | Amharic language layer | 7–10 | Amharic UI + Amharic TTS + basic simplification works |
| 3 | Core tutor features | 11–16 | Linguistic Leveler + micro-assessments + mastery map |
| 4 | Single-school pilot | 17–22 | 1 school, 1 subject runs for a full term with data |
| 5 | Scale the language & content | 23–30 | 3 languages, 2 subjects, parental proxy, USB image |
| 6 | Exam layer & data moat | 31–44 | Exam predictor v1 + national analytics dashboard v1 |
| 7 | Sovereign AI & ecosystem | 45+ | Ethio-Brain fine-tune v1, student API pilot |

---

### PHASE 0 — Foundations & Decisions (Weeks 1–2)

**Goal**: Decide the non-code questions that would otherwise waste months.

| # | Task | Output | Owner |
|---|---|---|---|
| 0.1 | Draft the 1-page pilot plan: 1 school, Grade 10 Physics, Amharic, term-long | Pilot spec | You |
| 0.2 | Secure a pilot school + a willing Physics teacher (the single most important relationship) | MOU/letter | You |
| 0.3 | Obtain Ethiopian Grade 10 Physics curriculum + MoE textbooks (PDFs) for the units in scope | Content corpus | You |
| 0.4 | Map content licensing & data agreement with school/MoE: what data is collected, who owns it, aggregated-only reporting | Ethics/data sheet | You + advisor |
| 0.5 | Inventory current repo capability gaps (re-verify `vision.md` findings against `main`) | Confirmed gap list | Dev |
| 0.6 | Decide repo layout for the FIDEL Player (new repo vs. `apps/` in this monorepo) | Repo decision | Dev |
| 0.7 | Set up the dev environment + CI baseline; confirm `pnpm build` green on a clean clone | Green CI | Dev |

**Decisions to log** (record in this file or a `DECISIONS.md`):
- Pilot school & teacher
- First unit(s) of Physics G10 content
- Whether FIDEL Player is a new repo (recommended) or monorepo `apps/`
- Storage & privacy commitments

**Exit**: signed pilot letter, content PDFs in hand, data sheet agreed, clean CI.

---

### PHASE 1 — Offline Chain Proof (Weeks 3–6)

**Goal**: Prove the entire loop with zero new product features:
`Qubee author → export ZIP → open offline → play & interact → progress saved → sync back`.

This is the **highest-risk, highest-learning** phase — do it first, keep it ugly.

#### 1.1 Player shell (new app)
| Task | Detail |
|---|---|
| Scaffold Vite + React + TS app | Consume `@qubee/renderer`, `@qubee/dsl` as workspace packages |
| Course package loader | Unzip ZIP (fflate or similar) → IndexedDB via `@qubee/storage` `document/browser.ts` pattern |
| Renderer integration | Render `course.json` scenes through `@qubee/renderer` (reuse existing scene components from `components/scene-renderers/`) |
| Quiz interaction | Verify quizzes/interactives work offline (they are client-side — confirm no server dependency) |
| Progress persistence | Save per-scene state to IndexedDB (`runtime/browser.ts` + `kv`) |
| Manifest/versioning | Track course version; re-import on update |

#### 1.2 Export side (Qubee repo)
| Task | Detail |
|---|---|
| Course export audit | Extend `use-export-classroom.ts` if needed: ensure a *course* (not just classroom) exports with full asset inlining |
| Fonts & assets | Ensure CJK + (later) Ethiopic fonts bundle in the ZIP, not fetched from CDN |
| Deterministic build | Same input → same ZIP (hash in manifest) |

#### 1.3 Offline proof scenario (the milestone)
- Generate a real sample chapter: **Grade 10 Physics — Projectile Motion** (pick the unit your teacher chose)
- Export ZIP from Qubee
- Load ZIP into FIDEL Player **with network disabled**
- Play through: slides render, LaTeX renders, quiz answers + feedback work, progress persists across refresh

#### 1.4 Sync stub
- Append-only `progress.ndjson` + `analytics.ndjson` in IndexedDB
- When `navigator.onLine` → POST to a minimal sync endpoint (later becomes the national dataset collector)

**Exit**: The Projectile Motion unit plays fully offline; progress survives reload; sync stub ships events when online. You have film of this on a laptop with wifi off.

---

### PHASE 2 — Amharic Language Layer (Weeks 7–10)

**Goal**: The player speaks Amharic. UI, content, and voice.

#### 2.1 Locale
| Task | Detail |
|---|---|
| Add `am-ET` locale | Follow documented process in `lib/i18n/locales.ts` (copy template → translate strings) |
| Ge'ez-capable fonts | Bundle **Noto Serif Ethiopic** (+ Noto Sans Ethiopic); add to export ZIP asset pipeline |
| RTL/script checks | Amharic is LTR (Ge'ez), but verify all UI handles the script + font fallback correctly |
| Player i18n | Ensure the player consumes locale files from the ZIP (course locale) not just app-level |

#### 2.2 Amharic TTS — the critical research task (start in Phase 1!)
| Option | Effort | Fidelity | Notes |
|---|---|---|---|
| Browser SpeechSynthesis `am` voices | Days | Low–med | Availability varies by OS/device — test on target devices (Android tablets/phones) |
| ElevenLabs Amharic voice | Days (API) | High | Cloud-only; fine for Author Studio preview, not offline player |
| VoxCPM2 fine-tune on Amharic | Weeks | Med–high | Qubee already integrates VoxCPM2 (`lib/audio/voxcpm.ts`); needs Amharic training data (~1–5 hrs studio audio) |
| Pre-generated audio per scene | 1–2 wks tooling | High | **Most robust offline answer**: generate TTS in Author Studio → bundle `.mp3` in the ZIP → player just plays files |

**Recommendation**: Ship **pre-generated audio** in course packages first (offline-safe, deterministic). Keep a runtime-TTS fallback for live/online sessions. Test browser voices on the actual pilot devices early.

#### 2.3 Amharic keyboard / script input
- Test the player's chat/input paths with an Amharic keyboard (mobile + desktop)
- If the teacher uses English-medium textbook: nothing more needed this phase

**Exit**: Player UI fully in Amharic with Ge'ez fonts; a generated scene speaks Amharic audio offline; typing Amharic works.

---

### PHASE 3 — Core Tutor Features (Weeks 11–16)

**Goal**: The features that make it a *tutor*, not a textbook app. All run against the existing `@qubee/generation` + agent runtime stack, **authored in cloud, bundled offline**.

#### 3.1 Linguistic Leveler (v1)
*The killer feature. Text-level simplification + mother-tongue explanation + audio + diagram.*

| Task | Detail |
|---|---|
| Text enrichment in the generation pipeline | New prompt stage: for each slide/paragraph, produce: (a) simplified-English version (grade-calibrated), (b) Amharic conceptual explanation, (c) TTS audio for both |
| DSL extension | Add per-element `simplifiedText`, `motherTongueExplanation`, `audioUrls` fields (check schema evolution path in `@qubee/dsl`) |
| Player interaction | Tap/highlight any sentence → overlay shows simplified + Amharic + audio button (built from existing overlay/context-menu patterns) |
| Diagram anchor | Where a diagram exists in assets, associate it with the concept (v1: manual/editor-assigned) |
| Evaluation | 10 students + teacher review: "does this actually help?" — iterate prompts |

#### 3.2 Micro-assessments + mastery state
| Task | Detail |
|---|---|
| Assessment model | 3–5 question micro-quiz per subchapter, stored in package (`assessment.json`) |
| Mastery computation | Extend the **existing PBL v2 learner-state engine** (`lib/pbl/v2/runtime/learner-state.ts`, proficiency tiers) rather than building new |
| Mastery map UI | Red/Yellow/Green heat map per topic in the player |
| Adaptation (v1, offline) | Simple rules: fail ≥2× → re-show explanation + prerequisite link; pass → advance. (Cloud adaptation later) |

#### 3.3 Code-in-Context simulator (optional v1 feature — schedule after 3.1/3.2)
| Task | Detail |
|---|---|
| Pyodide (Python in browser) | Bundle Pyodide ~10 MB in the player for offline execution |
| Simulated scripts | Author Studio generates editable Python per STEM concept (e.g., projectile trajectory plot) |
| Player sidebar | Reuse the DSL "interactive" scene type with an embedded Pyodide runner |

**Exit**: A unit plays in Amharic with: tap-to-simplify + audio, end-of-chapter micro-quizzes, a working R/Y/G mastery map, progress synced. Teacher says "my students can use this alone."

---

### PHASE 4 — Single-School Pilot (Weeks 17–22)

**Goal**: Real students, real term, real data.

| # | Task |
|---|---|
| 4.1 | Digitize the pilot unit(s) into Qubee Author Studio (teacher + you), with Linguistic Leveler enrichment |
| 4.2 | Deploy FIDEL Player: on the school's shared tablets/PCs via USB image; optionally LAN Ollama machine |
| 4.3 | Teacher training (½ day): how students use it, how progress is checked |
| 4.4 | Instrument analytics (anonymized): sessions, highlights, quiz results, time-on-task, common struggles |
| 4.5 | Weekly teacher check-ins: what's working, what's confusing; log every issue |
| 4.6 | Data review: build the first **weekly school report** (aggregated) — the seed of the ministry dashboard |
| 4.7 | Usability fixes sprint: the player should feel finished — onboarding in Amharic, error states offline, device quirks |

**Pilot KPIs** (decide targets with the teacher):
- % of students using it weekly (target ≥70%)
- Avg micro-quiz completion per student/week
- Mastery map movement over the term
- Teacher time saved / lesson prep change
- Qualitative: student confidence, Amharic-first comprehension

**Exit**: Term-end report with real numbers; decision gate: **scale (Phase 5) or fix (repeat 3–4)**.

---

### PHASE 5 — Scale Language & Content (Weeks 23–30)

#### 5.1 Languages: Afaan Oromo + Tigrinya
- Repeat Phase 2 for Oromo & Tigrinya (locale + fonts + TTS route)
- Language selection per student at first launch
- Note: Oromo/Tigrinya TTS availability is worse than Amharic — the **pre-generated audio** approach is the safety net

#### 5.2 Content factory (the boring, vital work)
- Define the **content production pipeline**: textbook PDF → structured units → generation → teacher review → QA checklist → export
- Build a **review dashboard** in Author Studio so teachers approve AI output quickly
- Produce: G10 Physics + G10 Mathematics first (term 2), then the units the partner schools request
- Track a content scoreboard: units done, in review, QA-failed

#### 5.3 Distribution images
- USB/SD card image build script: player + course packages + offline fonts
- Zero-rated / offline distribution testing on low-end Android devices (2G-class behavior)

#### 5.4 Parental Proxy (v1)
- Auto-generate a **2-minute daily audio summary** in the parent's language from the student's session log (Author Studio batch or on-device rules + cloud TTS)
- Deliver via the student's device at home (play aloud); SMS/Telegram delivery later

**Exit**: 3 languages live; 2 subjects × 1 grade content complete and QA'd; a school can flash USB images; parental summaries demoed.

---

### PHASE 6 — Exam Layer & National Data (Weeks 31–44)

#### 6.1 National Exam Predictor
*Needs data you don't have yet — start conversations early (Phase 0).*

| Task | Detail |
|---|---|
| Secure exam data access | Past 10–15 yrs Ethiopian Grade-12 exams (MoE/regional bureaus/private collections) — begin the request in Phase 0 |
| Digitize & structure | Question bank: topic tags, difficulty, language, answer key — this becomes the **gold training set** too |
| Topic-frequency model | Map questions → curriculum topics → frequency + trend weights |
| Predicted-question generator | Prompt chain: topic frequency + curriculum shifts → practice sets (reuse generation pipeline) |
| Targeted revision queues | Highest-leverage topics from mastery + exam weight → next-study list |

#### 6.2 National analytics (v1 dashboard)
- Aggregated (school/woreda/region only) event pipeline from sync endpoint
- Curriculum-bottleneck view: which paragraphs/concepts get highlighted most + quiz failure clusters (the proposal's §4.1 loop)
- **This is the MoE relationship asset.** Demo it early to the ministry contact.

**Exit**: 5+ years of structured exam data; predictor demo on G12 Physics; live dashboard showing 3+ pilot schools (or the term-1 pilot data beautifully).

---

### PHASE 7 — Sovereign AI & Ecosystem (Weeks 45+, Year 2)

#### 7.1 Ethio-Brain (sovereign model)
| Task | Detail |
|---|---|
| QA-pair corpus | Every student question + accepted AI explanation + teacher corrections → curated pairs (privacy-stripped, consent-based) |
| Fine-tune v1 | Qwen-3 / Llama-4 (per proposal) on the corpus; eval harness for Amharic STEM quality |
| Host | Owned GPU (first A100-class) or sovereign-aligned cloud; the A100 lease is already in the FIDEL financial model |
| Ethio-Language API | Productize as commercial API (Amharic/Oromo/Tigrinya) — Phase 3 of the proposal |

#### 7.2 Student API (developer ecosystem)
- Tiered access: Starter → Advanced → Elite (proposal §6.5)
- Compute subsidized by institutional revenue
- First national hackathon across the 4 sectors (agri, health, bureaucracy, finance)

#### 7.3 Sector applications (each = its own venture track)
- **Gebere-AI** (agri vision), **HEW triage**, **Amharic OCR**, **credit scoring** — none should be built inside the learning platform; they are **separate products** the Student API enables

#### 7.4 Business model activation
- Private school licensing (500 × 3–5k ETB/mo) — the earlier `vision.md` shows the whole model
- Public sector stays free; surplus funds compute & the data moat

**Exit**: Ethio-Brain v1 benchmarked better than base models on Ethiopian STEM QA; first student-built app deployed; 10+ paying private schools.

---

## 3. Dependency Graph

```
Phase 0 ──► Phase 1 (offline chain) ──► Phase 4 (pilot) ──► Phase 5 ──► Phase 6 ──► Phase 7
   │              │                        ▲
   │              ▼                        │
   └──► Phase 2 (Amharic) ──► Phase 3 (tutor features) ──┘
```
- **Phase 2 TTS research must START during Phase 1** (longest lead time: data collection + fine-tune).
- **Exam data requests must START in Phase 0** (bureaucracy is the longest lead time in Ethiopia).
- **Teacher relationship must START in Phase 0** — everything depends on it.

---

## 4. Weekly Rhythm (while building)

| Day | Habit |
|---|---|
| Mon | Ship the week's core slice; update the roadmap checklist |
| Tue–Thu | Deep work on the current phase's top task |
| Fri | Pilot feedback review / teacher sync / content QA; log decisions; update risk register |
| Fri | Commit + tag; keep CI green |

Track per phase: **tasks done / exit criteria met / what the pilot teacher said**.

---

## 5. Risk Register (top 10)

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | TTS for Amharic/Oromo/Tigrinya is poor or unavailable | High | High | Pre-generated audio in Author Studio; test browser voices on real devices in Phase 1; VoxCPM2 fine-tune as fallback |
| 2 | Exam data access stalls in bureaucracy | High | High | Start Phase 0; pursue private school collections in parallel; digitize whatever you can get |
| 3 | Content generation quality in Amharic/STEM is weak | Med | High | Teacher-in-the-loop review dashboard; iterate prompts; start with the highest-quality unit |
| 4 | Low-end devices can't run the player | Med | High | Test on target devices from Phase 1; optimize bundle; offline-first design avoids network, not device limits |
| 5 | The pilot school loses interest | Med | High | Teacher is a co-designer, not a user; weekly check-ins; make the teacher's life measurably easier |
| 6 | Rendering LaTeX/Ge'ez/scripts offline has font gaps | Med | Med | Fonts bundled in ZIP; early smoke test (Phase 1) |
| 7 | Scope creep into "make Qubee itself offline" | High | High | Guardrail in DECISIONS.md; player is a separate app |
| 8 | Data/privacy concerns from school/MoE | Med | High | Aggregated-only by design; consent forms; privacy sheet from Phase 0 |
| 9 | Solo burnout (if solo) | High | Med | Ruthless MVP scope; ship the pilot before polishing |
| 10 | Curriculum mismatch (textbook editions) | Med | Med | Build the digitization tooling generic; map editions explicitly |

---

## 6. KPIs by Horizon

| Horizon | KPI |
|---|---|
| Phase 1 done | One unit plays fully offline; demo video exists |
| Phase 3 done | Leveler + quizzes usable in Amharic; teacher approves |
| Phase 4 done (pilot) | ≥70% weekly usage; mastery movement visible; teacher report positive |
| Phase 5 done | 3 languages; 2 subjects; USB image flashing works |
| Phase 6 done | 5 yrs exam data structured; predictor demo; live dashboard |
| Phase 7 done | Ethio-Brain v1 beats base models; 10+ paying schools; first student app |

---

## 7. What I Would Do This Week (the immediate slice)

1. **Phase 0.1–0.3**: Draft the pilot plan; message the teacher you know; download the MoE Grade 10 Physics PDFs for the first unit.
2. **Phase 1 kickoff (task C from earlier)**: In this repo, generate a real Projectile Motion chapter with the Qubee generation pipeline, export the ZIP, and open it in a plain browser page that renders the course JSON through `@qubee/renderer` — proving the chain.
3. **Phase 2 research kickoff (parallel)**: Test Amharic browser TTS on the actual pilot devices; record 30–60 min of clean Amharic studio audio for a VoxCPM2 fine-tune trial.
4. Log all of it in this file's checklist.

---

*This roadmap is a living document. Update exit criteria as the pilot teacher teaches you what matters. The vision is real; the path is: one unit, offline, in Amharic, in one school — then compound.*
