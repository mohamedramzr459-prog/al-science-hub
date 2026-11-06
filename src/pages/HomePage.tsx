import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import SearchBar from '../components/SearchBar';
import Section, { EmptyState } from '../components/Section';
import SubjectCard from '../components/SubjectCard';
import { SUBJECTS } from '../data/subjects';
import { useLanguage } from '../i18n/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  function handleSearch(query: string) {
    navigate(query ? `/subjects?q=${encodeURIComponent(query)}` : '/subjects');
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>{t.appName}</h1>
        <p>{t.tagline}</p>
        <SearchBar onSubmit={handleSearch} />
        <p className="hint">{t.searchHint}</p>
      </section>

      <Section title={t.subjectsTitle} linkTo="/subjects" linkLabel={t.viewAll}>
        <div className="grid">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </Section>

      <Section title={t.continueTitle}>
        <EmptyState text={t.emptyList} />
      </Section>

      <Section title={t.videosTitle} linkTo="/videos" linkLabel={t.viewAll}>
        <EmptyState text={t.emptyList} />
      </Section>

      <Section title={t.papersTitle} linkTo="/papers" linkLabel={t.viewAll}>
        <EmptyState text={t.emptyList} />
      </Section>

      <Section title={t.termTitle} linkTo="/papers" linkLabel={t.viewAll}>
        <EmptyState text={t.emptyList} />
      </Section>

      <Section title={`${t.navAi} · ${t.navPlanner}`}>
        <div className="grid">
          <Link to="/ai-tutor" className="card">
            <span className="badge">
              <Icon name="spark" size={26} />
            </span>
            <h3>{t.navAi}</h3>
            <p className="muted small">{t.aiText}</p>
            <span className="pill">{t.comingSoon}</span>
          </Link>
          <Link to="/planner" className="card">
            <span className="badge">
              <Icon name="calendar" size={26} />
            </span>
            <h3>{t.navPlanner}</h3>
            <p className="muted small">{t.plannerText}</p>
            <span className="pill">{t.comingSoon}</span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
