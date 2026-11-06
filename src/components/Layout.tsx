import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Icon, { type IconName } from './Icon';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import { LANGUAGES, type TKey } from '../i18n/translations';

interface NavItem {
  to: string;
  icon: IconName;
  label: TKey;
  mobile: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: 'home', label: 'navHome', mobile: true },
  { to: '/subjects', icon: 'grid', label: 'navSubjects', mobile: true },
  { to: '/papers', icon: 'file', label: 'navPapers', mobile: true },
  { to: '/videos', icon: 'video', label: 'navVideos', mobile: true },
  { to: '/ai-tutor', icon: 'spark', label: 'navAi', mobile: false },
  { to: '/planner', icon: 'calendar', label: 'navPlanner', mobile: false },
  { to: '/dashboard', icon: 'user', label: 'navDashboard', mobile: true },
];

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '');

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={34} height={34} />
          <span>{t.appShort}</span>
        </Link>

        <nav className="top-nav" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navClass}>
              <Icon name={item.icon} size={18} />
              <span>{t[item.label]}</span>
            </NavLink>
          ))}
        </nav>

        <div className="lang-switch" role="group" aria-label={t.languageLabel}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              aria-pressed={language === l.code}
              onClick={() => setLanguage(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t.themeToLight : t.themeToDark}
          title={theme === 'dark' ? t.themeToLight : t.themeToDark}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
        </button>
      </div>
    </header>
  );
}

function BottomNav() {
  const { t } = useLanguage();
  return (
    <nav className="bottom-nav" aria-label="Quick">
      {NAV_ITEMS.filter((item) => item.mobile).map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navClass}>
          <Icon name={item.icon} size={22} />
          <span>{t[item.label]}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <p>
          <strong>{t.appName}</strong>
        </p>
        <p>
          <strong>{t.founded}</strong>
        </p>
        <p>{t.footerAbout}</p>
        <p>{t.footerNote}</p>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
