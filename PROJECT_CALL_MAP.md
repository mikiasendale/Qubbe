# Qubee Project Call Map

Auto-generated from the AST extraction (19,656 nodes / 53,554 edges). `A -> B` means A imports/calls B.

## Repository layout

| Path | Role |
|------|------|
| `app/` | Next.js pages + API routes (server entry points) |
| `components/` | React UI components (client) |
| `lib/` | Core business logic (server + shared) |
| `packages/@qubee/` | Monorepo: `dsl`, `editor`, `generation`, `importer`, `renderer`, `storage` |
| `render-service/` | Standalone rendering service |
| `tests/` | Test suite |

## Main entry points -> what they import

### `app/page.tsx`
- `packages/@qubee/renderer/package.json`
- `lib/hooks/use-i18n.tsx`
- `components/language-switcher.tsx`
- `lib/logger.ts`
- `components/ui/button.tsx`
- `components/ui/input-group.tsx`
- `components/ui/textarea.tsx`
- `lib/utils/index.ts`
- `components/settings/index.tsx`
- `components/generation/generation-toolbar.tsx`
- `components/agent/agent-bar.tsx`
- `lib/hooks/use-theme.tsx`
- `lib/utils/image-storage.ts`
- `lib/document/mime.ts`
- `lib/document/course-materials.ts`

### `app/layout.tsx`
- `lib/hooks/use-theme.tsx`
- `lib/hooks/use-i18n.tsx`
- `components/ui/sonner.tsx`
- `components/server-providers-init.tsx`
- `components/storage-health-notice.tsx`
- `components/access-code-guard.tsx`
- `components/workbench/ProSwapWatcher.tsx`

### `app/classroom/[id]/page.tsx`
- `components/stage.tsx`
- `lib/hooks/use-theme.tsx`
- `lib/store/index.ts`
- `lib/store/settings.ts`
- `lib/store/stage.ts`
- `lib/utils/image-storage.ts`
- `packages/@qubee/renderer/package.json`
- `lib/hooks/use-scene-generator.ts`
- `lib/store/media-generation.ts`
- `lib/store/whiteboard-history.ts`
- `lib/logger.ts`
- `lib/contexts/media-stage-context.tsx`
- `lib/media/media-orchestrator.ts`
- `lib/orchestration/registry/store.ts`
- `lib/classroom/stage-meta-client.ts`

### `app/workspace/page.tsx`
- `packages/@qubee/renderer/package.json`
- `lib/workbench/entry-gate.ts`
- `components/workbench/WorkspaceEntry.tsx`

## Cross-module dependencies (top)

```
 1340  packages/@qubee -> packages/@qubee
  194  app/api -> lib/server
  174  lib/server -> lib/server
  145  components/slide-renderer -> components/slide-renderer
  133  tests/pbl -> lib/pbl
   95  components/edit -> components/edit
   92  components/workbench -> lib/workbench
   89  tests/agent-runtime -> lib/server
   86  components/workbench -> components/workbench
   86  lib/pbl -> lib/pbl
   82  lib/media -> lib/media
   77  tests/workbench -> lib/workbench
   72  lib/video-export -> lib/video-export
   70  components/settings -> components/ui
   65  tests/media -> lib/media
   59  components/scene-renderers -> lib/pbl
   57  lib/document -> lib/document
   55  components/slide-renderer -> packages/@qubee
   51  components/slide-renderer -> lib/store
   48  components/ai-elements -> components/ui
   48  lib/audio -> lib/audio
   48  tests/audio -> lib/audio
   45  packages/mathml2omml -> packages/mathml2omml
   44  components/slide-renderer -> lib/types
   40  components/edit -> lib/store
   40  tests/agent-runtime -> app/api
   37  components/edit -> lib/edit
   37  tests/edit -> components/edit
   37  tests/edit -> lib/edit
   36  lib/server -> lib/types
   35  app/api -> lib/logger.ts
   35  components/scene-renderers -> components/scene-renderers
   35  lib/export -> lib/export
   34  components/ai-elements -> packages/@qubee
   34  components/edit -> packages/@qubee
   33  tests/video-export -> lib/video-export
   33  tests/workbench -> components/workbench
   32  packages/docs -> packages/docs
   32  packages/pptxgenjs -> packages/pptxgenjs
   31  components/ui -> lib/utils
   31  e2e/tests -> e2e/fixtures
   30  lib/workbench -> lib/workbench
   30  render-service/src -> render-service/src
   30  tests/edit -> lib/types
   29  app/api -> lib/config
```

## Server API routes -> downstream lib modules

### `app/api/access-code/status/route.ts`
- `lib/server/api-response.ts`
- `lib/server/access-token.ts`

### `app/api/access-code/verify/route.ts`
- `lib/server/api-response.ts`
- `lib/server/access-token.ts`

### `app/api/agent/owner-events/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner.ts`
- `lib/server/agent-runtime/store.ts`
- `lib/server/agent-runtime/event-notify-bus.ts`

### `app/api/agent/runtime/route.ts`
- `lib/config/feature-flags.ts`

### `app/api/agent/sessions/[id]/cancel/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/store.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/agent/sessions/[id]/events/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner.ts`
- `lib/server/agent-runtime/store.ts`
- `lib/agent-runtime/lifecycle.ts`
- `lib/server/agent-runtime/event-notify-bus.ts`

### `app/api/agent/sessions/[id]/messages/route.ts`
- `lib/server/agent-runtime/session-materials.ts`
- `lib/config/feature-flags.ts`
- `lib/server/api-response.ts`
- `lib/server/agent-runtime/store.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/workbench/element-refs.ts`
- `lib/workbench/course-refs.ts`
- `lib/server/agent-runtime/limits.ts`

### `app/api/agent/sessions/[id]/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/store.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/server/api-response.ts`
- `lib/workbench/session-title.ts`

### `app/api/agent/sessions/route.ts`
- `lib/server/agent-runtime/skills.ts`
- `lib/server/classroom-storage.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/store.ts`
- `lib/server/agent-runtime/session-materials.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/server/api-response.ts`
- `lib/workbench/course-refs.ts`

### `app/api/agent/sessions/status/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/store.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/agent/skills/[id]/route.ts`
- `lib/server/agent-runtime/user-skills.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/agent/skills/route.ts`
- `lib/server/skill-export.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/server/agent-runtime/skills.ts`
- `lib/server/agent-runtime/user-skills.ts`

### `app/api/azure-voices/route.ts`
- `lib/server/api-response.ts`
- `lib/server/ssrf-guard.ts`
- `lib/logger.ts`

### `app/api/chat/pi/route.ts`
- `lib/config/feature-flags.ts`
- `lib/chat/pi/config.ts`
- `lib/chat/pi/element-reference.ts`
- `lib/ai/providers.ts`
- `lib/chat/pi/director-loop.ts`
- `lib/server/resolve-model.ts`
- `lib/server/api-response.ts`
- `lib/server/web-search-config.ts`

### `app/api/chat/pi/whiteboard-visibility/route.ts`
- `lib/chat/pi/whiteboard-visibility.ts`
- `lib/persistence/server-auth.ts`
- `lib/server/api-response.ts`

### `app/api/chat/route.ts`
- `lib/orchestration/stateless-generate.ts`
- `lib/ai/providers.ts`
- `lib/types/chat.ts`
- `lib/server/api-response.ts`
- `lib/server/resolve-model.ts`
- `lib/logger.ts`
- `lib/types/provider.ts`

### `app/api/classroom-media/[classroomId]/[...path]/route.ts`
- `lib/server/classroom-storage.ts`
- `lib/server/http-range.ts`
- `lib/logger.ts`

### `app/api/classroom/route.ts`
- `lib/server/classroom-storage.ts`
- `lib/server/api-response.ts`
- `lib/logger.ts`

### `app/api/comfyui-workflows/route.ts`
- `lib/media/comfyui-workflows.ts`

### `app/api/export-video/capability/route.ts`
- `lib/server/api-response.ts`
- `lib/server/render-service.ts`

### `app/api/export-video/render/[jobId]/download/route.ts`
- `lib/server/api-response.ts`
- `lib/server/proxy-fetch.ts`
- `lib/server/render-service.ts`
- `lib/logger.ts`

### `app/api/export-video/render/[jobId]/route.ts`
- `lib/server/api-response.ts`
- `lib/server/proxy-fetch.ts`
- `lib/server/render-service.ts`
- `lib/logger.ts`

### `app/api/export-video/render/route.ts`
- `lib/server/api-response.ts`
- `lib/server/proxy-fetch.ts`
- `lib/server/render-service.ts`
- `lib/server/capped-stream.ts`
- `lib/logger.ts`

### `app/api/extract-document/route.ts`
- `lib/server/provider-config.ts`
- `lib/document/extractors/registry.ts`
- `lib/server/api-response.ts`
- `lib/document/extractors/media-registry.ts`
- `lib/document/mime.ts`
- `lib/persistence/resolve-server-asset.ts`
- `lib/document/pdf-compat.ts`
- `lib/document/extract-media.ts`

### `app/api/folders/[id]/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/server/folder-name-errors.ts`
- `lib/utils/folder-name-validation.ts`

### `app/api/folders/members/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/folders/route.ts`
- `lib/server/folder-persistence.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/server/folder-name-errors.ts`
- `lib/utils/folder-name-validation.ts`

### `app/api/generate-classroom/[jobId]/route.ts`
- `lib/server/api-response.ts`
- `lib/server/classroom-job-store.ts`
- `lib/server/classroom-storage.ts`
- `lib/logger.ts`

### `app/api/generate-classroom/route.ts`
- `lib/server/api-response.ts`
- `lib/server/classroom-job-runner.ts`
- `lib/server/classroom-job-store.ts`
- `lib/server/classroom-storage.ts`
- `lib/server/classroom-generation.ts`
- `lib/logger.ts`

### `app/api/generate/agent-profiles/route.ts`
- `lib/server/api-response.ts`
- `lib/audio/constants.ts`
- `lib/ai/llm.ts`
- `lib/server/resolve-model.ts`
- `lib/audio/voice-design.ts`
- `lib/logger.ts`
- `lib/constants/agent-defaults.ts`

### `app/api/generate/image/route.ts`
- `lib/server/provider-config.ts`
- `lib/media/image-providers.ts`
- `lib/server/api-response.ts`
- `lib/server/usage-storage.ts`
- `lib/media/types.ts`
- `lib/server/ssrf-guard.ts`
- `lib/logger.ts`

### `app/api/generate/scene-actions/route.ts`
- `lib/types/generation.ts`
- `lib/server/api-response.ts`
- `lib/ai/llm.ts`
- `lib/pbl/legacy/read.ts`
- `lib/server/llm-error-response.ts`
- `lib/server/resolve-model.ts`
- `lib/types/stage.ts`
- `lib/logger.ts`

### `app/api/generate/scene-content/route.ts`
- `lib/types/generation.ts`
- `lib/server/api-response.ts`
- `lib/ai/llm.ts`
- `lib/persistence/resolve-vision-images.ts`
- `lib/server/llm-error-response.ts`
- `lib/server/resolve-model.ts`
- `lib/config/feature-flags.ts`
- `lib/document/bundle.ts`

### `app/api/generate/scene-outlines-stream/route.ts`
- `lib/types/generation.ts`
- `lib/prompts/loader.ts`
- `lib/constants/generation.ts`
- `lib/server/api-response.ts`
- `lib/server/resolve-model.ts`
- `lib/document/bundle.ts`
- `lib/persistence/resolve-vision-images.ts`
- `lib/config/feature-flags.ts`

### `app/api/generate/tts/route.ts`
- `lib/server/provider-config.ts`
- `lib/audio/tts-providers.ts`
- `lib/audio/constants.ts`
- `lib/server/api-response.ts`
- `lib/audio/qwen-voice-clone.ts`
- `lib/server/usage-storage.ts`
- `lib/server/ssrf-guard.ts`
- `lib/audio/voxcpm.ts`

### `app/api/generate/video/route.ts`
- `lib/server/provider-config.ts`
- `lib/media/video-providers.ts`
- `lib/server/api-response.ts`
- `lib/server/usage-storage.ts`
- `lib/media/types.ts`
- `lib/server/ssrf-guard.ts`
- `lib/logger.ts`

### `app/api/generate/voice/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/audio/voice-registration.ts`
- `lib/audio/qwen-voice-clone.ts`
- `lib/server/ssrf-guard.ts`
- `lib/audio/voice-design.ts`
- `lib/logger.ts`
- `lib/audio/wav-validate.ts`

### `app/api/health/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`

### `app/api/materials/[id]/route.ts`
- `lib/server/agent-runtime/session-materials.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/config/feature-flags.ts`
- `lib/server/api-response.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/materials/route.ts`
- `lib/persistence/owner-materials.ts`
- `lib/server/agent-runtime/session-materials.ts`
- `lib/workbench/material-upload-policy.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/config/feature-flags.ts`
- `lib/server/api-response.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/persistence/server-provider.ts`

### `app/api/parse-pdf/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/document/pdf-compat.ts`
- `lib/document/extract.ts`
- `lib/server/ssrf-guard.ts`
- `lib/pdf/types.ts`
- `lib/types/pdf.ts`
- `lib/logger.ts`

### `app/api/pbl/v2/evaluate/route.ts`
- `lib/pbl/v2/agents/evaluator.ts`
- `lib/server/api-response.ts`
- `lib/server/resolve-model.ts`
- `lib/pbl/v2/api/sse.ts`
- `lib/pbl/v2/types.ts`
- `lib/logger.ts`

### `app/api/pbl/v2/instructor/route.ts`
- `lib/pbl/v2/agents/instructor.ts`
- `lib/server/api-response.ts`
- `lib/server/resolve-model.ts`
- `lib/pbl/v2/api/sse.ts`
- `lib/pbl/v2/api/locale.ts`
- `lib/pbl/v2/types.ts`
- `lib/logger.ts`

### `app/api/pbl/v2/open-task/route.ts`
- `lib/pbl/v2/types.ts`
- `lib/server/api-response.ts`
- `lib/server/resolve-model.ts`
- `lib/pbl/v2/api/sse.ts`
- `lib/pbl/v2/api/locale.ts`
- `lib/pbl/v2/agents/instructor.ts`
- `lib/pbl/v2/operations/runtime/quiz-snapshot.ts`
- `lib/logger.ts`

### `app/api/pbl/v2/simulator/route.ts`
- `lib/pbl/v2/agents/simulator.ts`
- `lib/server/api-response.ts`
- `lib/server/resolve-model.ts`
- `lib/pbl/v2/api/sse.ts`
- `lib/pbl/v2/api/locale.ts`
- `lib/pbl/v2/types.ts`
- `lib/logger.ts`

### `app/api/pbl/v2/task/update/route.ts`
- `lib/server/api-response.ts`
- `lib/pbl/v2/types.ts`
- `lib/pbl/v2/operations/kernel/progress.ts`
- `lib/pbl/v2/operations/kernel/task-completion.ts`

### `app/api/persistence/[...path]/route.ts`
- `lib/persistence/document-access.ts`
- `lib/persistence/server-provider.ts`
- `lib/document-store/validators.ts`
- `lib/persistence/asset-collection-grace.ts`
- `lib/persistence/owner-bound-document-store.ts`
- `lib/persistence/server-auth.ts`
- `lib/persistence/stage-meta.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/provider/probe-models/route.ts`
- `lib/server/api-response.ts`
- `lib/server/model-fetch.ts`
- `lib/server/ssrf-guard.ts`
- `lib/logger.ts`

### `app/api/proxy-media/route.ts`
- `lib/server/ssrf-guard.ts`
- `lib/server/api-response.ts`
- `lib/logger.ts`

### `app/api/quiz-grade/route.ts`
- `lib/server/api-response.ts`
- `lib/ai/llm.ts`
- `lib/server/resolve-model.ts`
- `lib/logger.ts`

### `app/api/server-providers/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/logger.ts`

### `app/api/skills/[id]/route.ts`
- `lib/server/skill-export.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/user-skills.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/stage-meta/[stageId]/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/stage-access.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/stages/[id]/freshness/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/route-response.ts`

### `app/api/stages/[id]/generation-complete/route.ts`
- `lib/server/stage-access.ts`
- `lib/config/feature-flags.ts`
- `lib/persistence/stage-meta.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/stages/[id]/manifest/route.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/stages/[id]/publish/route.ts`
- `lib/server/stage-access.ts`
- `lib/config/feature-flags.ts`
- `lib/persistence/stage-meta.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/stages/[id]/route.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/server/api-response.ts`
- `lib/server/agent-runtime/stage-limits.ts`

### `app/api/stages/[id]/scenes/route.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/config/feature-flags.ts`
- `lib/server/api-response.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/stages/[id]/status/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/stage-access.ts`

### `app/api/stages/[id]/unpublish/route.ts`
- `lib/server/stage-access.ts`
- `lib/config/feature-flags.ts`
- `lib/persistence/stage-meta.ts`
- `lib/server/agent-runtime/with-owner.ts`

### `app/api/stages/route.ts`
- `lib/config/feature-flags.ts`
- `lib/server/agent-runtime/owner-scoped-documents.ts`
- `lib/server/agent-runtime/route-response.ts`
- `lib/server/agent-runtime/with-owner.ts`
- `lib/server/api-response.ts`
- `lib/document-store/persistence-types.ts`
- `lib/server/agent-runtime/stage-limits.ts`

### `app/api/transcription/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/audio/asr-providers.ts`
- `lib/server/ssrf-guard.ts`
- `lib/audio/types.ts`
- `lib/logger.ts`

### `app/api/usage/route.ts`
- `lib/server/usage-storage.ts`
- `lib/server/api-response.ts`
- `lib/logger.ts`

### `app/api/verify-image-provider/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/media/image-providers.ts`
- `lib/server/ssrf-guard.ts`
- `lib/media/types.ts`
- `lib/logger.ts`

### `app/api/verify-model/route.ts`
- `lib/server/api-response.ts`
- `lib/server/resolve-model.ts`
- `lib/ai/llm.ts`
- `lib/logger.ts`

### `app/api/verify-pdf-provider/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/server/ssrf-guard.ts`
- `lib/logger.ts`
- `lib/pdf/constants.ts`
- `lib/pdf/alidocmind-client.ts`

### `app/api/verify-video-provider/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/media/video-providers.ts`
- `lib/server/ssrf-guard.ts`
- `lib/media/types.ts`
- `lib/logger.ts`

### `app/api/web-search/route.ts`
- `lib/server/provider-config.ts`
- `lib/server/api-response.ts`
- `lib/server/search-query-builder.ts`
- `lib/ai/llm.ts`
- `lib/web-search/index.ts`
- `lib/web-search/format.ts`
- `lib/server/resolve-model.ts`
- `lib/web-search/types.ts`
