import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import type { TKey } from '../i18n/translations';

interface ComingSoonPageProps {
  titleKey: TKey;
  textKey: TKey;
  stage: number;
}

export default function ComingSoonPage({ titleKey, textKey, stage }: ComingSoonPageProps) {
  const { t } = useLanguage();
  return (
    <div className="container">
      <div className="card center">
        <span className="pill">
          {t.comingSoon} · {t.stageLabel} {stage}
        </span>
        <h1 className="mt">{t[titleKey]}</h1>
        <p className="muted">{t[textKey]}</p>
        <Link to="/subjects" className="button">
          {t.navSubjects}
        </Link>
      </div>
    </div>
  );
}
