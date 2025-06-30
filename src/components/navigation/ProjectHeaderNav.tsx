import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from '../../constants/projectList';
import './ProjectHeaderNav.css';

type ProjectHeaderNavProps = {
  currentPath: string;
  className?: string;
};

export default function ProjectHeaderNav({ currentPath, className = '' }: ProjectHeaderNavProps) {
  const currentIndex = projectList.findIndex(p => p.path === currentPath);

  // Fallback for invalid path
  if (currentIndex === -1) {
    return (
      <div className="project-not-found" role="alert">
        Project not found
      </div>
    );
  }

  const hasMultipleProjects = projectList.length > 1;
  const prevIndex = (currentIndex - 1 + projectList.length) % projectList.length;
  const nextIndex = (currentIndex + 1) % projectList.length;

  const prev = hasMultipleProjects ? projectList[prevIndex] : null;
  const next = hasMultipleProjects ? projectList[nextIndex] : null;
  const current = projectList[currentIndex];

  return (
    <nav className={`project-header-nav ${className}`} aria-label="Project navigation">
      {hasMultipleProjects ? (
        <>
          {prev && (
            <Link
              to={prev.path}
              className="nav-link nav-link--prev"
              aria-label={`Go to previous project: ${prev.name}`}
            >
              ← {prev.name}
            </Link>
          )}

          <h1 className="project-title">{current.name}</h1>

          {next && (
            <Link
              to={next.path}
              className="nav-link nav-link--next"
              aria-label={`Go to next project: ${next.name}`}
            >
              {next.name} →
            </Link>
          )}
        </>
      ) : (
        <h1 className="project-title project-title--centered">{current.name}</h1>
      )}
    </nav>
  );
}
