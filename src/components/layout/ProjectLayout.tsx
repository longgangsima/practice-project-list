import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ProjectHeaderNav from '../navigation/ProjectHeaderNav';
import './ProjectLayout.css';

type ProjectLayoutProps = {
  currentPath: string;
  children: ReactNode;
  showHomeLink?: boolean;
  className?: string;
};

export default function ProjectLayout({ 
  currentPath, 
  children, 
  showHomeLink = true,
  className = ''
}: ProjectLayoutProps) {
  return (
    <div className={`project-page-wrapper ${className}`}>
      {showHomeLink && (
        <Link
          to="/"
          className="home-link"
          aria-label="Go back to home"
        >
          ⬅ Home
        </Link>
      )}

      <ProjectHeaderNav currentPath={currentPath} />

      <main className="project-content">
        {children}
      </main>
    </div>
  );
}
