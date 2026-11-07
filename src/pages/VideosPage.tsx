import { useMemo, useState } from 'react';
import { SUBJECTS } from '../data/subjects';
import { getVideos } from '../data/videos';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/videos.css';

const STORAGE_KEY = 'alhub-favorite-videos';

const PLAYLISTS = [
  {
    id: 'playlist-01',
    title: 'A/L Tamil Medium Playlist 01',
    language: 'Tamil',
    subject: 'Subject to be confirmed',
    url: 'https://www.youtube.com/playlist?list=PLu7K0x9cMMGWP2CFjdb8AT1AMfrMTuraO',
  },
  {
    id: 'playlist-02',
    title: 'A/L Tamil Medium Playlist 02',
    language: 'Tamil',
    subject: 'Subject to be confirmed',
    url: 'https://www.youtube.com/playlist?list=PLu7K0x9cMMGWR-O1eMPMqkPzih8x383im',
  },
  {
    id: 'playlist-03',
    title: 'A/L Tamil Medium Playlist 03',
    language: 'Tamil',
    subject: 'Subject to be confirmed',
    url: 'https://www.youtube.com/playlist?list=PLu7K0x9cMMGVxJtKZBZsBSQf4CdmXDltI',
  },
  {
    id: 'playlist-04',
    title: 'A/L Education Playlist 04',
    language: 'To be confirmed',
    subject: 'Subject to be confirmed',
    url: 'https://www.youtube.com/playlist?list=PLmLnnsAHQpTaD1C1bTuQFjIF14tD4Xz5b',
  },
];

const TEXT = {
  en: {
    title: 'Video Learning Library',
    subtitle: 'Sri Lankan A/L video lessons and learning playlists.',
    playlists: 'Featured YouTube Playlists',
    playlistInfo: 'Open the original playlist on YouTube.',
    search: 'Search videos, topics and teachers...',
    subject: 'Subject',
    grade: 'Grade',
    language: 'Video language',
    category: 'Lesson type',
    all: 'All',
    theory: 'Theory',
    revision: 'Revision',
    practical: 'Practical',
    favorites: 'My favourites',
    clear: 'Clear filters',
    count: 'individual videos found',
    empty: 'Individual video lessons are being added.',
    noMatch: 'No videos match your filters.',
    watch: 'Open playlist',
    channel: 'Channel',
    unit: 'Unit',
  },
  ta: {
    title: 'காணொளிக் கற்றல் நூலகம்',
    subtitle: 'இலங்கை உயர்தரக் காணொளிப் பாடங்களும் கற்றல் தொகுப்புகளும்.',
    playlists: 'முக்கிய YouTube பாடத் தொகுப்புகள்',
    playlistInfo: 'YouTube இல் மூலப் பாடத் தொகுப்பைத் திறக்கவும்.',
    search: 'காணொளி, பாடம், ஆசிரியரைத் தேடுக...',
    subject: 'பாடம்',
    grade: 'தரம்',
    language: 'காணொளி மொழி',
    category: 'பாட வகை',
    all: 'அனைத்தும்',
    theory: 'கோட்பாடு',
    revision: 'மீட்டல்',
    practical: 'செய்முறை',
    favorites: 'விருப்பமானவை',
    clear: 'வடிகட்டிகளை நீக்கு',
    count: 'தனிப்பட்ட காணொளிகள்',
    empty: 'தனிப்பட்ட காணொளிப் பாடங்கள் சேர்க்கப்பட்டு வருகின்றன.',
    noMatch: 'பொருந்தும் காணொளிகள் இல்லை.',
    watch: 'பாடத் தொகுப்பைத் திறக்க',
    channel: 'அலைவரிசை',
    unit: 'அலகு',
  },
  si: {
    title: 'වීඩියෝ ඉගෙනුම් පුස්තකාලය',
    subtitle: 'ශ්‍රී ලංකා උසස් පෙළ වීඩියෝ පාඩම් සහ ඉගෙනුම් ලැයිස්තු.',
    playlists: 'විශේෂ YouTube පාඩම් ලැයිස්තු',
    playlistInfo: 'මුල් YouTube පාඩම් ලැයිස්තුව විවෘත කරන්න.',
    search: 'වීඩියෝ, මාතෘකා සහ ගුරුවරු සොයන්න...',
    subject: 'විෂය',
    grade: 'ශ්‍රේණිය',
    language: 'වීඩියෝ භාෂාව',
    category: 'පාඩම් වර්ගය',
    all: 'සියල්ල',
    theory: 'න්‍යාය',
    revision: 'පුනරීක්ෂණ',
    practical: 'ප්‍රායෝගික',
    favorites: 'ප්‍රියතම',
    clear: 'පෙරහන් ඉවත් කරන්න',
    count: 'තනි වීඩියෝ හමු විය',
    empty: 'තනි වීඩියෝ පාඩම් එකතු කරමින් පවතී.',
    noMatch: 'ගැළපෙන වීඩියෝ නැත.',
    watch: 'පාඩම් ලැයිස්තුව විවෘත කරන්න',
    channel: 'නාලිකාව',
    unit: 'ඒකකය',
  },
};

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
        // Local storage may be unavailable.
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

      const searchable = [
        ...Object.values(video.title),
        ...Object.values(video.description),
        video.unit,
        video.channel,
      ].join(' ').toLowerCase();

      return searchable.includes(search);
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
    <main className="container videos-page">
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

      <section aria-labelledby="playlist-heading">
        <h2 id="playlist-heading">{t.playlists}</h2>
        <p className="muted">{t.playlistInfo}</p>

        <div className="grid video-grid">
          {PLAYLISTS.map(playlist => (
            <article className="card video-card" key={playlist.id}>
              <div className="video-thumbnail">
                <span>▶</span>
              </div>

              <div className="video-card-content">
                <div className="video-tags">
                  <span>{playlist.language}</span>
                  <span>{playlist.subject}</span>
                </div>

                <h2>{playlist.title}</h2>

                <div className="video-actions">
                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.watch} ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="individual-videos-heading">
        <h2 id="individual-videos-heading">
          {language === 'ta'
            ? 'தனிப்பட்ட காணொளிப் பாடங்கள்'
            : language === 'si'
              ? 'තනි වීඩියෝ පාඩම්'
              : 'Individual Video Lessons'}
        </h2>

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
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
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

        {results.length === 0 ? (
          <div className="video-empty">
            <div className="video-empty-icon">▶</div>
            <h2>{videos.length === 0 ? t.empty : t.noMatch}</h2>
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
                  <p className="muted">{video.description[language]}</p>

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
                      {language === 'ta'
                        ? 'காணொளியைப் பார்க்க'
                        : language === 'si'
                          ? 'වීඩියෝව නරඹන්න'
                          : 'Watch video'} ↗
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
      </section>
    </main>
  );
  }
