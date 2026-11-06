import type { CSSProperties } from 'react';
import Icon from './Icon';
import { findSubject } from '../data/subjects';
import { hostOf, safeUrl, type ItemKind, type LibraryItem } from '../data/library';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES, type TKey } from '../i18n/translations';
import '../styles/library.css';

const KIND_LABEL: Record<ItemKind, TKey> = {
  note: 'kindNote',
  'past-paper': 'kindPastPaper',
  'term-test': 'kindTermTest',
};

export default function LibraryItemCard({ item }: { item: LibraryItem }) {
  const { language, t } = useLanguage();
  const subject = findSubject(item.subject);
  const link = safeUrl(item.url);
  const host = hostOf(item.url);
  const itemLanguage = LANGUAGES.find((l) => l.code === item.language)?.label ?? item.language;

  const meta: string[] = [];
  if (subject) meta.push(subject.name[language]);
  if (item.grade) meta.push(item.grade === 12 ? t.grade12 : t.grade13);
  if (item.unit) meta.push(item.unit);
  if (item.year) meta.push(String(item.year));
  meta.push(itemLanguage);

  return (
    <article className="card lib-item" style={{ '--accent': subject?.color ?? '#1d4ed8' } as CSSProperties}>
      <div className="lib-top">
        <span className="badge">
          <Icon name={item.kind === 'note' ? 'book' : 'file'} size={24} />
        </span>
        <span className="pill">{t[KIND_LABEL[item.kind]]}</span>
      </div>

      <h3 lang={item.language}>{item.title}</h3>

      <div className="lib-meta">
        {meta.map((text, index) => (
          <span className="pill" key={`${index}-${text}`}>
            {text}
          </span>
        ))}
      </div>

      <p className="muted small lib-source">
        {t.sourceLabel}: <strong>{item.sourceName}</strong>
        {host ? ` (${host})` : ''}
      </p>

      {link ? (
        <a className="button" href={link} target="_blank" rel="noopener noreferrer">
          {t.openSource}
        </a>
      ) : null}
    </article>
  );
}
