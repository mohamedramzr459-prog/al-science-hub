import { useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import LibraryItemCard from '../components/LibraryItemCard';
import { EmptyState } from '../components/Section';
import { allItems, sortItems, type ItemKind } from '../data/library';
import { SUBJECTS, findSubject } from '../data/subjects';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES } from '../i18n/translations';
import '../styles/library.css';

type Mode = 'papers' | 'notes';

const MODE_KINDS: Record<Mode, ItemKind[]> = {
  papers: ['past-paper', 'term-test'],
  notes: ['note'],
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

function Field({ label, value, onChange, children }: FieldProps) {
  return (
    <label className="lib-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

export default function LibraryPage({ mode }: { mode: Mode }) {
  const { language, t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const [text, setText] = useState(params.get('q') ?? '');

  const subject = params.get('subject') ?? '';
  const grade = params.get('grade') ?? '';
  const lang = params.get('lang') ?? '';
  const unit = params.get('unit') ?? '';
  const year = params.get('year') ?? '';
  const kind = params.get('kind') ?? '';

  function setParam(name: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value);
    else next.delete(name);
    if (name === 'subject') next.delete('unit');
    setParams(next, { replace: true });
  }

  function clearAll() {
    setText('');
    setParams({}, { replace: true });
  }

  const kinds = MODE_KINDS[mode];
  const base = allItems().filter((item) => kinds.includes(item.kind));

  const units = [
    ...new Set(
      base
        .filter((item) => !subject || item.subject === subject)
        .map((item) => item.unit)
        .filter((value): value is string => Boolean(value))
    ),
  ].sort((a, b) => a.localeCompare(b));

  const years = [
    ...new Set(base.map((item) => item.year).filter((value): value is number => typeof value === 'number')),
  ].sort((a, b) => b - a);

  const needle = text.trim().toLowerCase();

  const results = sortItems(
    base.filter((item) => {
      if (subject && item.subject !== subject) return false;
      if (grade && item.grade && String(item.grade) !== grade) return false;
      if (lang && item.language !== lang) return false;
      if (unit && item.unit !== unit) return false;
      if (year && String(item.year ?? '') !== year) return false;
      if (kind && item.kind !== kind) return false;
      if (!needle) return true;
      const names = findSubject(item.subject)?.name;
      const haystack = [
        item.title,
        item.unit ?? '',
        item.sourceName,
        item.year ? String(item.year) : '',
        ...(names ? Object.values(names) : []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    })
  );

  const hasFilters = Boolean(subject || grade || lang || unit || year || kind || needle);

  const carry = new URLSearchParams();
  if (subject) carry.set('subject', subject);
  if (grade) carry.set('grade', grade);
  const suffix = carry.toString() ? `?${carry.toString()}` : '';

  return (
    <div className="container">
      <h1>{mode === 'papers' ? t.libPapersTitle : t.resLessons}</h1>
      <p className="muted">{t.libIntro}</p>

      <div className="lib-tabs">
        <Link to={`/papers${suffix}`} aria-current={mode === 'papers' ? 'page' : undefined}>
          {t.navPapers}
        </Link>
        <Link to={`/notes${suffix}`} aria-current={mode === 'notes' ? 'page' : undefined}>
          {t.navNotes}
        </Link>
      </div>

      <div className="search">
        <Icon name="search" size={20} />
        <input
          type="search"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setParam('q', event.target.value.trim());
          }}
          placeholder={t.libSearchPlaceholder}
          aria-label={t.libSearchPlaceholder}
        />
      </div>

      <div className="lib-filters">
        <Field label={t.filterSubject} value={subject} onChange={(v) => setParam('subject', v)}>
          <option value="">{t.filterAll}</option>
          {SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name[language]}
            </option>
          ))}
        </Field>

        <Field label={t.gradeLabel} value={grade} onChange={(v) => setParam('grade', v)}>
          <option value="">{t.filterAll}</option>
          <option value="12">{t.grade12}</option>
          <option value="13">{t.grade13}</option>
        </Field>

        <Field label={t.languageLabel} value={lang} onChange={(v) => setParam('lang', v)}>
          <option value="">{t.filterAll}</option>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </Field>

        {mode === 'papers' ? (
          <Field label={t.filterType} value={kind} onChange={(v) => setParam('kind', v)}>
            <option value="">{t.filterAll}</option>
            <option value="past-paper">{t.kindPastPaper}</option>
            <option value="term-test">{t.kindTermTest}</option>
          </Field>
        ) : null}

        {units.length > 0 ? (
          <Field label={t.filterUnit} value={unit} onChange={(v) => setParam('unit', v)}>
            <option value="">{t.filterAll}</option>
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </Field>
        ) : null}

        {years.length > 0 ? (
          <Field label={t.filterYear} value={year} onChange={(v) => setParam('year', v)}>
            <option value="">{t.filterAll}</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </Field>
        ) : null}
      </div>

      <div className="lib-bar">
        <p className="muted small" aria-live="polite">
          {results.length} {t.itemsLabel}
        </p>
        {hasFilters ? (
          <button type="button" className="lib-clear" onClick={clearAll}>
            {t.clearFilters}
          </button>
        ) : null}
      </div>

      {base.length === 0 ? (
        <EmptyState text={t.libEmpty} />
      ) : results.length === 0 ? (
        <EmptyState text={t.libNoMatch} />
      ) : (
        <div className="grid">
          {results.map((item) => (
            <LibraryItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
