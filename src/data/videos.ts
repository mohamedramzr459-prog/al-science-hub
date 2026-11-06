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

/*
 * Add only genuine, checked educational video links.
 * Do not insert invented videos or channel details.
 */

export const VIDEOS: VideoItem[] = [
  // Example template:
  // {
  //   id: 'biology-grade12-introduction-ta',
  //   subject: 'biology',
  //   grade: 12,
  //   language: 'ta',
  //   category: 'theory',
  //   unit: 'Introduction to Biology',
  //   title: {
  //     en: 'Introduction to Biology',
  //     ta: 'உயிரியல் அறிமுகம்',
  //     si: 'ජීව විද්‍යාව හැඳින්වීම',
  //   },
  //   description: {
  //     en: 'Introduction to the topic.',
  //     ta: 'பாடத்திற்கான அறிமுகம்.',
  //     si: 'පාඩම පිළිබඳ හැඳින්වීම.',
  //   },
  //   channel: 'Verified educational channel',
  //   url: 'https://www.youtube.com/watch?v=REAL_VIDEO_ID',
  //   addedOn: '2026-11-07',
  // },
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
