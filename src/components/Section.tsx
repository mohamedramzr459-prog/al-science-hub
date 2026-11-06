import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SectionProps {
  title: string;
  linkTo?: string;
  linkLabel?: string;
  children: ReactNode;
}

export default function Section({ title, linkTo, linkLabel, children }: SectionProps) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {linkTo && linkLabel ? <Link to={linkTo}>{linkLabel}</Link> : null}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <div className="empty">{text}</div>;
}
