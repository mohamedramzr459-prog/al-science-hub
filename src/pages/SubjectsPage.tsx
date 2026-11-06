import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SubjectCard from '../components/SubjectCard';
import { SUBJECTS } from '../data/subjects';
import { useLanguage } from '../i18n/LanguageContext';

export default function SubjectsPage() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const query = (params.get('q') ?? '').trim();
  const needle = query.toLowerCase();

  const results = SUBJECTS.filter(
    (subject) =>
      !needle ||
      subject.id.includes(needle) ||
      Object.values(subject.name).some((name) => name.toLowerCase().includes(needle))
  );

  return (
    <div className="container">
      <h1>{t.subjectsTitle}</h1>
      <SearchBar
        key={query}
        initialValue={query}
        onSubmit={(value) => setParams(value ? { q: value } : {})}
      />
      <p className="muted small mt">{t.searchHint}</p>

      <div className="mt">
        {results.length === 0 ? (
          <div className="empty">{t.noResults}</div>
        ) : (
          <div className="grid">
            {results.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
