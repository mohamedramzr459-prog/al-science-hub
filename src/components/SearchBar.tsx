import { useState } from 'react';
import Icon from './Icon';
import { useLanguage } from '../i18n/LanguageContext';

interface SearchBarProps {
  initialValue?: string;
  onSubmit: (query: string) => void;
}

export default function SearchBar({ initialValue = '', onSubmit }: SearchBarProps) {
  const { t } = useLanguage();
  const [value, setValue] = useState(initialValue);

  return (
    <form
      className="search"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value.trim());
      }}
    >
      <Icon name="search" size={20} />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchPlaceholder}
      />
      <button type="submit">{t.searchButton}</button>
    </form>
  );
}
