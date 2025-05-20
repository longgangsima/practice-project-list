import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ProjectHeaderNav from './ProjectHeaderNav';
import './ProjectLayout.css'; // optional scoped styles

type Props = {
  currentPath: string;
  children: ReactNode;
};

export default function ProjectLayout({ currentPath, children }: Props) {
  return (
    <div className="project-page-wrapper">
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          marginBottom: '1rem',
          display: 'inline-block',
          fontSize: '14px',
        }}
      >
        ⬅ Home
      </Link>

      <ProjectHeaderNav currentPath={currentPath} />

      {children}
    </div>
  );
}
