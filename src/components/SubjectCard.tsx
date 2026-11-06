import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useLanguage } from '../i18n/LanguageContext';
import type { Subject } from '../data/subjects';

export default function SubjectCard({ subject }: { subject: Subject }) {
  const { language, t } = useLanguage();
  return (
    <Link
      to={`/subjects/${subject.id}`}
      className="card"
      style={{ '--accent': subject.color } as CSSProperties}
    >
      <span className="badge">
        <Icon name={subject.icon} size={26} />
      </span>
      <h3>{subject.name[language]}</h3>
      <p className="muted small">{subject.description[language]}</p>
      <p className="muted small">
        {t.grade12} · {t.grade13}
      </p>
    </Link>
  );
}
