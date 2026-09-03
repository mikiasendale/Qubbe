# Qubee Functionality Reference

*Generated from knowledge graph analysis of 19,680 nodes / 47,977 edges across 753 communities*

---

## Overview

**Qubee** (formerly OpenMAIC) is an open-source, MIT-licensed multi-agent interactive classroom platform that turns any topic or document into an immersive, agent-driven learning experience. Built as a Next.js 15 + React 19 + TypeScript monorepo with a `@qubee/*` SDK of 6 publishable packages.

**Core Concept**: One prompt → full interactive classroom with AI teachers, AI peers, whiteboard, TTS/ASR, simulations, PBL, quizzes, and export to PPTX/HTML.

---

## System Architecture

### Monorepo Structure (9 workspace packages)

| Package | Scope | Purpose |
|---------|-------|---------|
| `@qubee/dsl` | Core | Domain-specific language for classroom scenes, shapes, stages, outlines |
| `@qubee/renderer` | Core | React renderer for DSL scenes (slides, quizzes, simulations, PBL) |
| `@qubee/editor` | Core | Pro-mode editor for slide/canvas editing (drag, resize, AI-assisted) |
| `@qubee/generation` | Core | Two-stage generation pipeline: outline → scene content |
| `@qubee/storage` | Core | Swappable persistence: browser, HTTP, Postgres, S3 |
| `@qubee/importer` | Core | PPTX → Qubee slide importer |
| `packages/docs` | Standalone | Documentation site (Next.js, deployed separately) |
| `render-service` | Standalone | MP4 video export (Chromium + FFmpeg container) |
| `mathml2omml` / `pptxgenjs` | Vendored | MathML→OfficeMath & PPTX generation (modified forks) |

### Key Directories

```
app/                    # Next.js App Router (pages + API routes)
components/             # React UI components (client)
lib/                    # Core business logic (server + shared)
  ├── server/           # Agent runtime, orchestration, playback, action engine
  ├── orchestration/    # LangGraph state machines
  ├── playback/         # Classroom playback engine
  ├── action/           # 28+ action types (speech, whiteboard, spotlight, laser)
  ├── persistence/      # Document/asset/agent-session stores
  ├── brand/            # Brand configuration (logos, theme, product name)
  └── video-export-app/ # Video export cover config
skills/qubee/           # OpenClaw/ClawHub skill for agent workbench integration
public/                 # Static assets (logos, avatars, vendor bundles)
```

---

## Core Capabilities

### 1. Agent Workbench (Pro Mode)
- **Chat-first workspace** that plans curriculum, builds/revises every page
- **Durable sessions**: server-backed runs survive restarts; cancel/resume/steer anytime
- **Session materials**: upload docs/audio/video, web search; agent builds from them
- **20+ built-in skills**: slides, quizzes, interactives, PBL, images, video, voices, PPTX import
- **Provider-neutral**: bring your own models, media, search, storage

### 2. Classroom Generation Pipeline (Two-Stage)
```
Stage 1: Outline Generation
  Input: topic + materials + preferences
  → Agent produces structured outline (stages, scenes, learning objectives)
  → User reviews/edits outline

Stage 2: Scene Content Generation
  → For each scene: agent generates slides, quizzes, interactives, PBL
  → Parallel generation with streaming updates
  → Real-time preview in workbench
```

### 3. Multi-Agent Classroom Playback
- **AI Teachers**: lecture, draw on whiteboard, explain concepts
- **AI Peers**: discuss, ask questions, collaborate with learner
- **Real-time interaction**: learner can interrupt, ask questions, steer discussion
- **State machine**: LangGraph orchestration manages agent turns, discussions, tool use

### 4. Scene Types (Rich Content)
| Scene Type | Features |
|------------|----------|
| **Slides** | Text, images, LaTeX, charts, tables, code blocks, speaker notes |
| **Quizzes** | Multiple choice, free response, auto-grading, feedback |
| **Interactive HTML** | Simulations, visualizations, games, mind maps, 3D |
| **PBL v2** | Project-based learning with classroom UI, milestones, rubrics |
| **Whiteboard** | Drawing, shapes, LaTeX, alignment, multi-user |
| **Video Export** | MP4 with deterministic covers, fidelity profiles |

### 5. Media & AI Providers (Pluggable)
| Category | Providers |
|----------|-----------|
| **LLM** | OpenAI, Anthropic, Azure, Google, Bedrock, Ollama, OpenRouter, Together, Replicate, Groq, etc. |
| **TTS** | OpenAI, ElevenLabs, MiniMax, VoxCPM2 (voice cloning), Azure, Coqui |
| **ASR** | OpenAI Whisper, FunASR, MiniMax, Azure, Deepgram |
| **Search** | Brave, Baidu, Bocha, MiniMax, SearXNG, Exa, Tavily |
| **Image Gen** | OpenAI DALL-E, MiniMax, Replicate, ComfyUI, Azure |
| **Storage** | Browser (IndexedDB), HTTP, Postgres, S3 |

### 6. Persistence Layer (`@qubee/storage`)
- **Document Store**: scenes, outlines, outlines, materials (Postgres, HTTP, browser)
- **Runtime Store**: classroom playback state, agent sessions
- **Asset Store**: binary blobs (images, audio, video) with content hashing, signed URLs
- **KV Store**: key-value for caching, sessions, feature flags
- **Agent Session Store**: durable agent runtime state (lease-based execution)
- **Material Store**: uploaded files, web search results, extracted content
- **Skill Store**: user skills, agent configurations

### 7. Video Export (Standalone Render Service)
- **Headless Chromium + FFmpeg** in Docker container
- **Deterministic covers**: quiz/PBL thumbnails, fidelity polish
- **Interactive HTML capture**: records full interactive session
- **CPU resource profiles**: configurable quality/speed tradeoffs
- **MP4 output**: configurable resolution, bitrate, codec

### 7. Agent Workbench Integration (OpenClaw Skill)
- **ClawHub skill**: `clawhub install qubee`
- **Works with**: OpenClaw, Codex, DeepSeek, WorkBuddy
- **Messaging apps**: Feishu, Slack, Discord, Telegram, 20+ via OpenClaw
- **Modes**: Hosted (access code) or Self-hosted (local repo)
- **Skill flow**: Clone → Startup → Provider Keys → Generation → Track Progress

---

## God Nodes (Core Abstractions)

| Rank | Node | Edges | Role |
|------|------|-------|------|
| 1 | `cn()` | 563 | Tailwind class utility (ubiquitous styling) |
| 2 | `react` | 452 | React import (ubiquitous) |
| 3 | `useI18n()` | 331 | Internationalization hook |
| 4 | `SHAPE_TYPE` | 188 | Shape type enum (core DSL) |
| 5 | `shapes` | 184 | Shape registry |
| 6 | `ShapeType` | 182 | Shape type definitions |
| 7 | `Scene` | 162 | Core scene entity |
| 8 | `createLogger()` | 127 | Logging utility |
| 9 | `PBLProjectV2` | 115 | PBL v2 project entity |

---

## Surprising Cross-Community Connections

| Connection | Type | Files |
|------------|------|-------|
| `Fold()` → `FloatingInsertToolbar()` | INFERRED (indirect call) | test → component |
| `UpdateRequest` → `PBLProjectV2` | EXTRACTED (reference) | API route → types |
| `createPersistenceHandler()` → `validateAppScene/Stage()` | INFERRED | API route → validators |
| `WebSearchVisualizer()` → `cn()` | EXTRACTED | visualizer → utils |
| `Fold()` indirect call chain | Multiple | editor components |

---

## Import Cycles (Refactoring Targets)

1. **pptxgenjs** (3-4 file cycles): gen-objects ↔ gen-tables ↔ pptxgen ↔ slide
2. **mathml2omml** (7+ 3-file cycles): index ↔ msubsup/mfrac/mmultiscripts/mroot/msub/msup/munderover/under_or_over ↔ walker

---

## Community Map (Top 27 of 753)

| ID | Label | Size | Cohesion | Key Nodes |
|----|-------|------|----------|-----------|
| 0 | UI Components - Conversation & Chat | 272 | 0.01 | Conversation, ConversationContent, ConversationEmptyState |
| 1 | UI Components - Image Elements & Filters | 133 | 0.03 | BaseImageElement, ImageOutline, useClipImage, imageFiltersToCss |
| 2 | API Routes - Video Generation & Persistence | 151 | 0.03 | POST, VideoSettingsProps, MediaReadyLifecycleData |
| 3 | Shape Types & Action Button Constants | 185 | 0.01 | SHAPE_TYPE, ACTION_BUTTON_*, ShapeType |
| 4 | Shapes & Action Button Constants | 184 | 0.01 | shapes, ACTION_BUTTON_* |
| 5 | Asset Storage & Content Hashing | 104 | 0.03 | CachedObjectUrl, ContentHash, AssetByteStore, AssetSignedReadHeaders |
| 6 | UI Components - Code Block & Canvas | 129 | 0.04 | CanvasProps, CodeBlockContext, CodeBlockCopyButton |
| 7 | Shape Types & UI Constants | 180 | 0.01 | ShapeType, accent*, actionButton* |
| 8 | Agent Session - Postgres Storage | 71 | 0.03 | AgentSessionLogger, PgAgentSessionEntryTreeHandle, ensureAgentSessionSchema |
| 10 | Document Store & Ownership | 107 | 0.02 | StageLinkLifecycleData, createOwnerBoundDocumentStore, OwnershipMode |
| 11 | Audio & File Upload Components | 116 | 0.03 | AudioInsertPicker, extensionFrom, fileToDataUrl, AudioToolbarOverlay |
| 12 | Document Store & Stage Utilities | 71 | 0.03 | DocumentRows, OutlineRow, reassembleDocument, BrowserDocumentStore |
| 13 | Scene Validation & Outline Editing | 100 | 0.02 | validateAppScene, OutlinesEditorProps, RegenerateDetails |
| 14 | Document Storage Configuration | 100 | 0.02 | canonicalizeLegacy*, configureDocumentStorage, DocumentStorageOptions |
| 15 | API Routes - Dynamic Routes | 116 | 0.03 | GET/POST/DELETE handlers |
| 16 | Asset Store & Runtime Storage | 117 | 0.03 | AssetStore, RuntimeStore, assertSignedUrlTtlWithinGrace |
| 17 | Line Drag & Resize Handlers | 89 | 0.04 | EditIntent, computeLineDrag, getLineSnapPoints, LineDragInput |
| 18 | Settings & Provider Configuration | 111 | 0.03 | ConfiguredProvider, GenerationToolbar, ModelSettingsPopover, SettingsDialog |
| 19 | Postgres Schemas & Document Store | 86 | 0.04 | AGENT_SESSION_PG_SCHEMA, AssetCollectionPass, ensureDocumentSchema |
| 20 | External Editor Integration | 94 | 0.03 | OpenInChatGPT, OpenInClaude, OpenInCursor, OpenInContent |
| 21 | PBL & Scene Renderers | 76 | 0.04 | PBLRenderer, SceneRenderer, SceneThumbnailContent, ZoomWrapper |
| 22 | Chat Composer & Layout | 111 | 0.03 | chatColumn, composerLayout, isComposerLive, AtSignButton |
| 23 | Session & Pane State Management | 90 | 0.04 | DraggableWidth, fetchSessions, PaneCollapseState, useChatWidth |
| 24 | Visualizers & Scene Retry | 97 | 0.03 | ActionsVisualizer, WebSearchVisualizer, StreamingOutlineVisualizer |
| 25 | Chart, LaTeX, Table & Text Elements | 91 | 0.04 | ChartElement, LatexElement, TableElement, TextElement |

*727 more communities (216 thin omitted)*

---

## Hyperedges (Group Relationships)

| Hyperedge | Members | Confidence |
|-----------|---------|------------|
| Avataaars Avatar Family (SVG variants) | 12 avatars | 1.00 EXTRACTED |
| Avataaars Avatar Collection | 4 avatars | 1.00 EXTRACTED |
| AI Model Providers in Qubee | 11 logos | 0.85 INFERRED |
| Avatar Variant Groups (PNG+SVG) | 11 files | 0.85 INFERRED |
| LLM Provider Brand Logos | 14 logos | 0.85 INFERRED |
| OpenMAIC Educational Persona Avatar Set | 21 avatars | 0.85 INFERRED |

---

## Suggested Investigation Questions

1. **How does `react` bridge 50+ communities?** — Highest betweenness centrality (0.181), connects UI, API, editor, renderer, generation
2. **Why does `createLogger()` connect persistence, API, and editor?** — Cross-cutting observability
3. **Trace `SHAPE_TYPE` → `shapes` → `ShapeType`** — Core DSL type system hub
4. **How does `Scene` connect renderer, editor, and playback?** — Central scene entity
5. **Why does `createLogger()` appear in persistence API routes?** — Observability in serverless handlers

---

## Key Flows (Graph Traces)

### Generation Flow
```
User Prompt → Outline Generation (lib/generation/outline) 
  → Scene Content Generation (lib/generation/scene) 
  → DSL Output (packages/@qubee/dsl) 
  → Renderer (packages/@qubee/renderer) 
  → Classroom Playback (lib/playback)
```

### Persistence Flow
```
Client Action → API Route (app/api/persistence/[...path]) 
  → createPersistenceHandler() 
  → validateAppScene/Stage() (lib/document-store/validators) 
  → Document Store (lib/persistence/*)
```

### Agent Runtime Flow
```
User Message → Agent Session (lib/server/agent-runtime) 
  → LangGraph Orchestration (lib/orchestration) 
  → Action Engine (lib/action) 
  → Playback Engine (lib/playback)
```

### Video Export Flow
```
Classroom Session → Render Service (render-service/) 
  → Headless Chromium → FFmpeg 
  → MP4 + Cover Thumbnails
```

---

## Configuration & Environment

### Key Environment Variables (`packages/@qubee/*` prefixes)
| Variable | Purpose |
|----------|---------|
| `QUBEE_PACKAGES` | Workspace package globs |
| `QUBEE_AGENT_RUNTIME_ENABLED` | Enable agent runtime |
| `QUBEE_ENABLE_VOCATIONAL` | Vocational learning features |
| `NEXT_PUBLIC_QUBEE_EDITOR_ENABLED` | Editor UI flag |
| `NEXT_PUBLIC_QUBEE_PLAYBACK_RENDERER_ENABLED` | Playback renderer flag |
| `DATABASE_URL` | Postgres connection |
| `QUBEE_AGENT_SKILLS_DIR` | Skills directory path |

### Font CDN (External Dependency)
- **Host**: `https://file.maic.chat/fonts/` (CJK fonts: SourceHanSans, SourceHanSerif, LXGWWenKai, ZhuQueFangSong, WenDingPLKaiTi, ZcoolHappy)
- **Note**: Functional dependency on original project's font host

---

## Deployment

| Target | Command |
|--------|---------|
| **Vercel** | One-click deploy (button in README) |
| **Docker** | `docker compose up` (includes Postgres, render-service) |
| **Self-hosted** | `pnpm install && pnpm build && pnpm start` |
| **Render Service** | Separate container for video export |

---

## Extending Qubee (Secondary Development)

### Fork & Customize
1. Fork repo → `git clone https://github.com/mikiasendale/Qubbe`
2. Modify `@qubee/*` packages under `packages/@qubee/*`
3. Rebuild: `pnpm --filter @qubee/* build`

### Consume SDK
```bash
pnpm add @qubee/dsl @qubee/renderer @qubee/editor @qubee/generation @qubee/storage @qubee/importer
```

### Custom Providers
- Implement `ModelProvider` interface in `lib/server/agent-runtime/providers/`
- Add to `lib/server/agent-runtime/provider-registry.ts`
- Configure via `.env.local` or `server-providers.yml`

### Custom Scene Types
1. Add shape type to `@qubee/dsl` (`SHAPE_TYPE` enum)
2. Create renderer component in `@qubee/renderer/src/elements/`
3. Register in `renderer/src/elements/index.ts`
4. Add editor UI in `@qubee/editor/src/react/`

---

## Interactive Graph Exploration

Open `graphify-out/graph.html` in browser for interactive community view (753 community nodes, 2094 cross-community edges).

### Query Examples
```bash
# Trace cross-community bridge
graphify query "How does react connect UI components to API routes?"

# Shortest path between concepts
graphify path "Scene" "PBLProjectV2"

# Explain a node
graphify explain "cn()"
```

---

## Token Cost Summary

| Run | Input Tokens | Output Tokens |
|-----|--------------|---------------|
| This analysis | 0 | 0 |
| **Total** | **0** | **0** |

*Note: Semantic extraction used local processing; no external LLM tokens consumed.*

---

## License & Attribution

- **License**: MIT (retained from original THU-MAIC 2026)
- **Original Paper**: "From MOOC to QUBEE: Reimagine Online Teaching and Learning through LLM-driven Agents" (JCST 2026)
- **Third-party**: `packages/mathml2omml` (LGPL-3.0), `packages/pptxgenjs` (MIT)
- **Font CDN**: `file.maic.chat` (functional dependency)

---

*Generated by graphify on 2026-09-03 | Graph: 19,680 nodes · 47,977 edges · 753 communities*