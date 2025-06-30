import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectItem } from '../../constants/projectList';
import './ProjectList.css';

type ProjectListProps = {
  projects: ProjectItem[];
  className?: string;
  variant?: 'default' | 'grid' | 'compact';
  showDescription?: boolean;
};

export default function ProjectList({
  projects,
  className = '',
  variant = 'default',
  showDescription = false,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="project-list-empty">
        <p>No projects available</p>
      </div>
    );
  }

  return (
    <div className={`project-list project-list--${variant} ${className}`}>
      <ul className="project-list__items" role="list">
        {projects.map(project => (
          <li key={project.path} className="project-list__item">
            <Link
              to={project.path}
              className="project-list__link"
              aria-label={`Navigate to ${project.name} project`}
            >
              <div className="project-list__content">
                <h3 className="project-list__title">{project.name}</h3>
                {showDescription && project.description && (
                  <p className="project-list__description">{project.description}</p>
                )}
              </div>
              <span className="project-list__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
