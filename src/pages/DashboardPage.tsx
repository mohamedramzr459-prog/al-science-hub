import { useLanguage } from '../i18n/LanguageContext';

export default function DashboardPage() {
  const { t } = useLanguage();
  const stats = [t.dashProgress, t.dashStudy, t.dashSaved, t.dashQuiz];

  return (
    <div className="container">
      <h1>{t.dashboardTitle}</h1>
      <p className="muted">{t.dashNote}</p>
      <div className="grid mt">
        {stats.map((label) => (
          <div className="card" key={label}>
            <p className="muted small">{label}</p>
            <p className="stat">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
