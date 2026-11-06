import { useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { findSubject } from '../data/subjects';
import { useLanguage } from '../i18n/LanguageContext';

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

  const resources = [
    { icon: 'book', label: t.resLessons },
    { icon: 'file', label: t.navPapers },
    { icon: 'file', label: t.termTitle },
    { icon: 'video', label: t.navVideos },
  ] as const;

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
        {resources.map((resource) => (
          <div className="card resource" key={resource.label}>
            <Icon name={resource.icon} />
            <strong>{resource.label}</strong>
            <span className="pill">{t.comingSoon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
