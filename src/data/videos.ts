import type { Language } from '../i18n/translations';
import type { Subject } from './subjects';

export type VideoCategory = 'theory' | 'revision' | 'practical';

export interface VideoItem {
  id: string;
  subject: Subject['id'];
  grade: 12 | 13;
  language: Language;
  category: VideoCategory;
  unit: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  channel: string;
  url: string;
  addedOn: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'biology-unit-02-tamil',
    subject: 'biology',
    grade: 12,
    language: 'ta',
    category: 'theory',
    unit: 'Unit 02',
    title: {
      en: 'A/L Biology Unit 02 - Full Lesson',
      ta: 'உயிரியல் அலகு 02 - முழுமையான பாடம்',
      si: 'ජීව විද්‍යාව ඒකකය 02 - සම්පූර්ණ පාඩම',
    },
    description: {
      en: 'Tamil-medium Sri Lankan A/L Biology lesson by Dr. Imthadh Ansar.',
      ta: 'Dr. Imthadh Ansar அவர்களின் இலங்கை உயர்தர உயிரியல் பாடம்.',
      si: 'Dr. Imthadh Ansar විසින් පවත්වන ශ්‍රී ලංකා උසස් පෙළ ජීව විද්‍යා පාඩම.',
    },
    channel: 'Imthadh Ansar',
    url: 'https://www.youtube.com/watch?v=ljHDb6gABwE',
    addedOn: '2026-11-07',
  },
  {
    id: 'chemistry-paper-revision-tamil',
    subject: 'chemistry',
    grade: 13,
    language: 'ta',
    category: 'revision',
    unit: 'Chemistry Revision',
    title: {
      en: 'A/L Chemistry Paper Structure and Revision',
      ta: 'உயர்தர இரசாயனவியல் வினாத்தாள் அமைப்பு மற்றும் மீட்டல்',
      si: 'උසස් පෙළ රසායන විද්‍යා ප්‍රශ්න පත්‍ර ව්‍යුහය සහ පුනරීක්ෂණය',
    },
    description: {
      en: 'Tamil-medium chemistry revision by Expert Tutor.',
      ta: 'Expert Tutor வழங்கும் இரசாயனவியல் மீட்டல் பாடம்.',
      si: 'Expert Tutor විසින් ඉදිරිපත් කරන රසායන විද්‍යා පුනරීක්ෂණ පාඩම.',
    },
    channel: 'Expert Tutor',
    url: 'https://www.youtube.com/watch?v=9pMrbmEo998',
    addedOn: '2026-11-07',
  },
  {
    id: 'physics-thermometry-sinhala',
    subject: 'physics',
    grade: 13,
    language: 'si',
    category: 'theory',
    unit: 'Thermal Physics',
    title: {
      en: 'Thermal Physics - Thermometry',
      ta: 'வெப்பவியல் - வெப்பநிலை அளவீடு',
      si: 'තාප භෞතිකය - උෂ්ණත්වමිතිය',
    },
    description: {
      en: 'A/L Physics thermometry lesson from A3Academy.',
      ta: 'A3Academy வழங்கும் உயர்தர வெப்பநிலை அளவீட்டுப் பாடம்.',
      si: 'A3Academy වෙතින් උසස් පෙළ උෂ්ණත්වමිතිය පාඩම.',
    },
    channel: 'A3Academy',
    url: 'https://youtu.be/Yc_RHYl8JSY',
    addedOn: '2026-11-07',
  },
  {
    id: 'physics-mcq-sinhala',
    subject: 'physics',
    grade: 13,
    language: 'si',
    category: 'revision',
    unit: 'Past Paper MCQ',
    title: {
      en: 'A/L Physics MCQ Discussion',
      ta: 'உயர்தர பௌதிகவியல் பல்தேர்வு வினா கலந்துரையாடல்',
      si: 'උසස් පෙළ භෞතික විද්‍යා MCQ සාකච්ඡාව',
    },
    description: {
      en: 'Sinhala-medium A/L Physics MCQ revision.',
      ta: 'சிங்கள மொழிமூல பௌதிகவியல் பல்தேர்வு வினா மீட்டல்.',
      si: 'සිංහල මාධ්‍ය උසස් පෙළ භෞතික විද්‍යා MCQ පුනරීක්ෂණය.',
    },
    channel: 'A3Academy',
    url: 'https://youtu.be/ot3KwhgvlpY',
    addedOn: '2026-11-07',
  },
  {
    id: 'physics-circular-motion-sinhala',
    subject: 'physics',
    grade: 12,
    language: 'si',
    category: 'theory',
    unit: 'Circular Motion',
    title: {
      en: 'Circular Motion - Lesson 1',
      ta: 'வட்ட இயக்கம் - பாடம் 1',
      si: 'වෘත්තාකාර චලිතය - පාඩම 1',
    },
    description: {
      en: 'Sinhala-medium circular motion lesson.',
      ta: 'சிங்கள மொழிமூல வட்ட இயக்கப் பாடம்.',
      si: 'සිංහල මාධ්‍ය වෘත්තාකාර චලිත පාඩම.',
    },
    channel: 'A3Academy',
    url: 'https://youtu.be/yDaQ7TujzOE',
    addedOn: '2026-11-07',
  },
  {
    id: 'maths-exponential-functions-sinhala',
    subject: 'maths',
    grade: 12,
    language: 'si',
    category: 'theory',
    unit: 'Functions',
    title: {
      en: 'Exponential Functions',
      ta: 'அடுக்குக்குறிச் சார்புகள்',
      si: 'ඝාතීය ශ්‍රිත',
    },
    description: {
      en: 'A/L Combined Mathematics exponential functions lesson.',
      ta: 'உயர்தர இணைந்த கணித அடுக்குக்குறிச் சார்புகள் பாடம்.',
      si: 'උසස් පෙළ සංයුක්ත ගණිතය ඝාතීය ශ්‍රිත පාඩම.',
    },
    channel: 'A3Academy',
    url: 'https://youtu.be/pexOLEnJ6FM',
    addedOn: '2026-11-07',
  },
  {
    id: 'maths-2023-2024-answers-sinhala',
    subject: 'maths',
    grade: 13,
    language: 'si',
    category: 'revision',
    unit: 'Past Paper Discussion',
    title: {
      en: 'Combined Mathematics 2023 (2024) Answers',
      ta: 'இணைந்த கணிதம் 2023 (2024) விடைகள்',
      si: 'සංයුක්ත ගණිතය 2023 (2024) පිළිතුරු',
    },
    description: {
      en: 'Combined Mathematics examination answer discussion.',
      ta: 'இணைந்த கணிதத் தேர்வு விடைகள் பற்றிய கலந்துரையாடல்.',
      si: 'සංයුක්ත ගණිත විභාග පිළිතුරු සාකච්ඡාව.',
    },
    channel: 'A3Academy',
    url: 'https://youtu.be/6vTB26NAts8',
    addedOn: '2026-11-07',
  },
];

export function validVideoUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function getVideos(): VideoItem[] {
  return VIDEOS.filter(video => validVideoUrl(video.url));
}
