// The slide object model is the canonical contract from @qubee/dsl. The renderer
// no longer vendors its own copy; it re-exports the DSL types here so the public
// `@qubee/renderer/types` surface stays intact.
export * from '@qubee/dsl';
export * from './effects';
