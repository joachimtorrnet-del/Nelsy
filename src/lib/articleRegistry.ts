/**
 * Central article registry.
 *
 * Uses Vite's import.meta.glob to eagerly import every file under
 * src/pages/learn/articles/. Each file calls registerArticle() on import,
 * so all articles self-register with zero manual wiring here.
 *
 * To add a new article: create src/pages/learn/articles/<slug>.tsx.
 * Nothing else needs to change in this file.
 */

// Eager glob — Vite statically includes all matching files at build time.
// New files in this directory are picked up automatically.
import.meta.glob('../pages/learn/articles/*.tsx', { eager: true });

// Re-export everything from the core data model so consumers only need
// to import from this one file.
export * from './articles';
