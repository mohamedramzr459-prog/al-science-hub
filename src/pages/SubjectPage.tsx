import { useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon, { type IconName } from '../components/Icon';
import { countFor, unitsFor, type ItemKind } from '../data/library';
import { findSubject } from '../data/subjects';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/library.css';

export default function SubjectPage() {
  const { subjectId } = useParams();
  const { language, t } = useLanguage();
  const [grade, setGrade] = useState<12 | 13>(12);
  const subject = findSubject(subjectId);

  if (!subject) {
    return (
      <div className="container">
        <div className="empty">{t.notFound}</div>
        <p className="mt">
          <Link to="/subjects">{t.backToSubjects}</Link>
        </p>
      </div>
    );
  }

  const gradeText = grade === 12 ? t.grade12 : t.grade13;

  function libraryLink(path: string, extra: Record<string, string> = {}): string {
    const query = new URLSearchParams({ subject: subject!.id, grade: String(grade), ...extra });
    return `${path}?${query.toString()}`;
  }

  const resources: { icon: IconName; label: string; to: string; kinds: ItemKind[] }[] = [
    { icon: 'book', label: t.resLessons, to: libraryLink('/notes'), kinds: ['note'] },
    { icon: 'file', label: t.navPapers, to: libraryLink('/papers', { kind: 'past-paper' }), kinds: ['past-paper'] },
    { icon: 'file', label: t.termTitle, to: libraryLink('/papers', { kind: 'term-test' }), kinds: ['term-test'] },
  ];

  const units = unitsFor(subject.id, ['note'], grade);

  return (
    <div className="container">
      <p>
        <Link to="/subjects">{t.backToSubjects}</Link>
      </p>

      <div className="card" style={{ '--accent': subject.color } as CSSProperties}>
        <span className="badge">
          <Icon name={subject.icon} size={28} />
        </span>
        <h1>{subject.name[language]}</h1>
        <p className="muted">{subject.description[language]}</p>
      </div>

      <div className="tabs" role="group" aria-label={t.gradeLabel}>
        {([12, 13] as const).map((g) => (
          <button key={g} type="button" aria-pressed={grade === g} onClick={() => setGrade(g)}>
            {g === 12 ? t.grade12 : t.grade13}
          </button>
        ))}
      </div>

      <h2>
        {subject.name[language]} · {gradeText}
      </h2>
      <p className="muted">{t.syllabusNote}</p>

      <div className="grid">
        {resources.map((resource) => {
          const count = countFor(subject.id, resource.kinds, grade);
          return (
            <Link to={resource.to} className="card resource" key={resource.label}>
              <Icon name={resource.icon} />
              <strong>{resource.label}</strong>
              <span className="pill">{count > 0 ? `${count} ${t.itemsLabel}` : t.nothingYet}</span>
            </Link>
          );
        })}
        <div className="card resource">
          <Icon name="video" />
          <strong>{t.navVideos}</strong>
          <span className="pill">{t.comingSoon}</span>
        </div>
      </div>

      {units.length > 0 ? (
        <>
          <h3 className="mt">{t.unitsTitle}</h3>
          <div className="lib-chips">
            {units.map((unit) => (
              <Link key={unit} className="pill lib-chip" to={libraryLink('/notes', { unit })}>
                {unit}
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
    }
