import type { Language } from '../i18n/translations';
import type { IconName } from '../components/Icon';

export interface Subject {
  id: 'biology' | 'chemistry' | 'physics' | 'maths';
  icon: IconName;
  color: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
}

export const SUBJECTS: Subject[] = [
  {
    id: 'biology',
    icon: 'leaf',
    color: '#15803d',
    name: { en: 'Biology', ta: 'உயிரியல்', si: 'ජීව විද්‍යාව' },
    description: {
      en: 'Living organisms and life processes',
      ta: 'உயிரினங்களும் உயிர்ச் செயல்முறைகளும்',
      si: 'ජීවීන් සහ ජීව ක්‍රියාවලි',
    },
  },
  {
    id: 'chemistry',
    icon: 'flask',
    color: '#c2410c',
    name: { en: 'Chemistry', ta: 'இரசாயனவியல்', si: 'රසායන විද්‍යාව' },
    description: {
      en: 'Matter, reactions and chemical principles',
      ta: 'பொருள், தாக்கங்கள், இரசாயனக் கொள்கைகள்',
      si: 'ද්‍රව්‍ය, ප්‍රතික්‍රියා සහ රසායනික මූලධර්ම',
    },
  },
  {
    id: 'physics',
    icon: 'bolt',
    color: '#1d4ed8',
    name: { en: 'Physics', ta: 'பௌதிகவியல்', si: 'භෞතික විද්‍යාව' },
    description: {
      en: 'Forces, energy, waves and electricity',
      ta: 'விசை, சக்தி, அலை, மின்சாரம்',
      si: 'බල, ශක්ති, තරංග සහ විද්‍යුතය',
    },
  },
  {
    id: 'maths',
    icon: 'sigma',
    color: '#7e22ce',
    name: { en: 'Combined Mathematics', ta: 'இணைந்த கணிதம்', si: 'සංයුක්ත ගණිතය' },
    description: {
      en: 'Algebra, calculus, vectors and more',
      ta: 'இயற்கணிதம், நுண்கணிதம், காவிகள் மற்றும் பல',
      si: 'වීජ ගණිතය, කලනය, දෛශික සහ තවත්',
    },
  },
];

export function findSubject(id: string | undefined): Subject | undefined {
  return SUBJECTS.find((subject) => subject.id === id);
}
