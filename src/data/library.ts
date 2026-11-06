import type { Language } from '../i18n/translations';
import type { Subject } from './subjects';

/*
 * HOW TO ADD A PAPER OR NOTE
 * --------------------------
 * 1. Find the real file or page on the official / original website
 *    (for example the Department of Examinations, NIE, or a teacher's page).
 * 2. Copy its web link (it must start with https://).
 * 3. Copy one of the example blocks at the bottom of this file, remove the
 *    two slashes (//) at the start of each line, and fill in the details.
 * 4. Keep a comma after the closing brace  },
 *
 * Never add an item whose link you have not opened and checked yourself.
 */

export type ItemKind = 'note' | 'past-paper' | 'term-test';

export interface LibraryItem {
  /** A short unique name made of letters, numbers and dashes. Never reuse one. */
  id: string;
  kind: ItemKind;
  subject: Subject['id'];
  /** Leave this out if the item applies to both Grade 12 and Grade 13. */
  grade?: 12 | 13;
  /** The language the item itself is written in. */
  language: Language;
  title: string;
  /** Full web link to the original item. Must start with https:// */
  url: string;
  /** Who published it, for example "Department of Examinations". */
  sourceName: string;
  /** Unit or topic, for example "Mechanics". Optional. */
  unit?: string;
  /** Exam year, for example 2023. Optional. */
  year?: number;
  /** Date you added it, written YYYY-MM-DD. Newest items show first on Home. */
  addedOn?: string;
}

export const LIBRARY: LibraryItem[] = [
  // EXAMPLE (this is only a template, it is not a real paper):
  // {
  //   id: 'physics-2023-al-paper-1-en',
  //   kind: 'past-paper',
  //   subject: 'physics',
  //   language: 'en',
  //   title: 'A/L Physics 2023 - Paper I',
  //   url: 'https://example.com/the-real-link-to-the-paper.pdf',
  //   sourceName: 'Department of Examinations',
  //   year: 2023,
  //   addedOn: '2026-11-06',
  // },
];

/** Items that have a working web link. Items with a broken link are hidden. */
export function allItems(): LibraryItem[] {
  return LIBRARY.filter((item) => safeUrl(item.url) !== null);
}

/** Only web links starting with http:// or https:// are ever shown as links. */
export function safeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : null;
  } catch {
    return null;
  }
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function sortItems(items: LibraryItem[]): LibraryItem[] {
  return [...items].sort(
    (a, b) =>
      (b.year ?? 0) - (a.year ?? 0) ||
      (b.addedOn ?? '').localeCompare(a.addedOn ?? '') ||
      a.title.localeCompare(b.title)
  );
}

/** Newest-added first, used for the "latest" lists on the Home page. */
export function latestItems(kinds: ItemKind[], limit: number): LibraryItem[] {
  return allItems()
    .filter((item) => kinds.includes(item.kind))
    .sort(
      (a, b) =>
        (b.addedOn ?? '').localeCompare(a.addedOn ?? '') ||
        (b.year ?? 0) - (a.year ?? 0) ||
        a.title.localeCompare(b.title)
    )
    .slice(0, limit);
}

/** Unit names found in the library for one subject (and optionally one grade). */
export function unitsFor(subject: Subject['id'], kinds: ItemKind[], grade?: 12 | 13): string[] {
  const units = new Set<string>();
  for (const item of allItems()) {
    if (item.subject !== subject || !item.unit || !kinds.includes(item.kind)) continue;
    if (grade && item.grade && item.grade !== grade) continue;
    units.add(item.unit);
  }
  return [...units].sort((a, b) => a.localeCompare(b));
}

export function countFor(subject: Subject['id'], kinds: ItemKind[], grade?: 12 | 13): number {
  return allItems().filter(
    (item) =>
      item.subject === subject &&
      kinds.includes(item.kind) &&
      (!grade || !item.grade || item.grade === grade)
  ).length;
    }
