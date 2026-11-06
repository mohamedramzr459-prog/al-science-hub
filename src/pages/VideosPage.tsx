import { useMemo, useState } from 'react';
import { SUBJECTS } from '../data/subjects';
import { getVideos, type VideoCategory } from '../data/videos';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/videos.css';

const STORAGE_KEY = 'alhub-favorite-videos';

const TEXT = {
  en: {
    title: 'Video Learning Library',
    subtitle: 'Explore A/L video lessons in three languages.',
    search: 'Search videos, topics, teachers...',
    subject: 'Subject',
    grade: 'Grade',
    language: 'Video language',
    category: 'Lesson type',
    all: 'All',
    favorites: 'My favourites',
    theory: 'Theory',
    revision: 'Revision',
    practical: 'Practical',
    empty: 'No videos have been added yet.',
    noMatch: 'No videos match your filters.',
    open: 'Watch original video',
    channel: 'Channel',
    unit: 'Unit',
    clear: 'Clear filters',
    count: 'videos found',
    addHint: 'Verified video resources will appear here as they are added.',
  },
  ta: {
    title: 'காணொளிக் கற்றல் நூலகம்',
    subtitle: 'மூன்று மொழிகளிலும் உயர்தரக் காணொளிப் பாடங்களைக் கற்கலாம்.',
    search: 'காணொளி, பாடம், ஆசிரியர் தேடுக...',
    subject: 'பாடம்',
    grade: 'தரம்',
    language: 'காணொளி மொழி',
    category: 'பாட வகை',
    all: 'அனைத்தும்',
    favorites: 'விருப்பமானவை',
    theory: 'கோட்பாடு',
    revision: 'மீட்டல்',
    practical: 'செய்முறை',
    empty: 'இன்னும் காணொளிகள் சேர்க்கப்படவில்லை.',
    noMatch: 'பொருந்தும் காணொளிகள் இல்லை.',
    open: 'மூலக் காணொளியைப் பார்க்க',
    channel: 'அலைவரிசை',
    unit: 'அலகு',
    clear: 'வடிகட்டிகளை நீக்கு',
    count: 'காணொளிகள்',
    addHint: 'சரிபார்க்கப்பட்ட காணொளிகள் சேர்க்கப்படும்போது இங்கு தோன்றும்.',
  },
  si: {
    title: 'වීඩියෝ ඉගෙනුම් පුස්තකාලය',
    subtitle: 'භාෂා තුනකින් උසස් පෙළ වීඩියෝ පාඩම් අධ්‍යයනය කරන්න.',
    search: 'වීඩියෝ, මාතෘකා, ගුරුවරු සොයන්න...',
    subject: 'විෂය',
    grade: 'ශ්‍රේණිය',
    language: 'වීඩියෝ භාෂාව',
    category: 'පාඩම් වර්ගය',
    all: 'සියල්ල',
    favorites: 'ප්‍රියතම',
    theory: 'න්‍යාය',
    revision: 'පුනරීක්ෂණ',
    practical: 'ප්‍රායෝගික',
    empty: 'තවම වීඩියෝ එක් කර නැත.',
    noMatch: 'ඔබේ පෙරහන්වලට ගැළපෙන වීඩියෝ නැත.',
    open: 'මුල් වීඩියෝව නරඹන්න',
    channel: 'නාලිකාව',
    unit: 'ඒකකය',
    clear: 'පෙරහන් ඉවත් කරන්න',
    count: 'වීඩියෝ හමු විය',
    addHint: 'සත්‍යාපිත වීඩියෝ එක් කරන විට මෙහි දිස්වනු ඇත.',
  },
} as const;

const LANGUAGE_NAMES = {
  en: 'English',
  ta: 'தமிழ்',
  si: 'සිංහල',
};

function readFavorites(): string[] {
  try {
    const value = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? '[]'
    );
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === 'string')
      : [];
  } catch {
    return [];
  }
}

export default function VideosPage() {
  const { language } = useLanguage();
  const t = TEXT[language];

  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [videoLanguage, setVideoLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  const videos = getVideos();

  function toggleFavorite(id: string) {
    setFavorites(previous => {
      const next = previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage may be unavailable.
      }

      return next;
    });
  }

  function clearFilters() {
    setQuery('');
    setSubject('');
    setGrade('');
    setVideoLanguage('');
    setCategory('');
    setOnlyFavorites(false);
  }

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    return videos.filter(video => {
      if (subject && video.subject !== subject) return false;
      if (grade && String(video.grade) !== grade) return false;
      if (videoLanguage && video.language !== videoLanguage) return false;
      if (category && video.category !== category) return false;
      if (onlyFavorites && !favorites.includes(video.id)) return false;

      if (!search) return true;

      const text = [
        ...Object.values(video.title),
        ...Object.values(video.description),
        video.unit,
        video.channel,
      ].join(' ').toLowerCase();

      return text.includes(search);
    });
  }, [
    videos,
    query,
    subject,
    grade,
    videoLanguage,
    category,
    onlyFavorites,
    favorites,
  ]);

  return (
    <div className="container videos-page">
      <header className="videos-hero">
        <span className="video-eyebrow">A/L SCIENCE HUB</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <input
          className="video-search"
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder={t.search}
          aria-label={t.search}
        />
      </header>

      <div className="video-filter-grid">
        <label>
          {t.subject}
          <select value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="">{t.all}</option>
            {SUBJECTS.map(item => (
              <option key={item.id} value={item.id}>
                {item.name[language]}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t.grade}
          <select value={grade} onChange={e => setGrade(e.target.value)}>
            <option value="">{t.all}</option>
            <option value="12">12</option>
            <option value="13">13</option>
          </select>
        </label>

        <label>
          {t.language}
          <select
            value={videoLanguage}
            onChange={e => setVideoLanguage(e.target.value)}
          >
            <option value="">{t.all}</option>
            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </label>

        <label>
          {t.category}
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">{t.all}</option>
            <option value="theory">{t.theory}</option>
            <option value="revision">{t.revision}</option>
            <option value="practical">{t.practical}</option>
          </select>
        </label>
      </div>

      <div className="video-toolbar">
        <button
          type="button"
          className={onlyFavorites ? 'video-active' : ''}
          onClick={() => setOnlyFavorites(value => !value)}
        >
          ★ {t.favorites}
        </button>

        <span>{results.length} {t.count}</span>

        <button type="button" onClick={clearFilters}>
          {t.clear}
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="video-empty">
          <div className="video-empty-icon">▶</div>
          <h2>{t.empty}</h2>
          <p>{t.addHint}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="video-empty">
          <h2>{t.noMatch}</h2>
        </div>
      ) : (
        <div className="grid video-grid">
          {results.map(video => (
            <article className="card video-card" key={video.id}>
              <div className="video-thumbnail">
                <span>▶</span>
              </div>

              <div className="video-card-content">
                <div className="video-tags">
                  <span>{video.grade}</span>
                  <span>{LANGUAGE_NAMES[video.language]}</span>
                  <span>{t[video.category]}</span>
                </div>

                <h2>{video.title[language]}</h2>
                <p className="muted">
                  {video.description[language]}
                </p>

                <p className="video-meta">
                  {t.channel}: {video.channel}
                </p>
                <p className="video-meta">
                  {t.unit}: {video.unit}
                </p>

                <div className="video-actions">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.open} ↗
                  </a>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(video.id)}
                    aria-label={t.favorites}
                    aria-pressed={favorites.includes(video.id)}
                  >
                    {favorites.includes(video.id) ? '★' : '☆'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
