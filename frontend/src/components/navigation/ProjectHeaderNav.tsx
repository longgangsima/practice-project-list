import { Link } from 'react-router-dom';
import { projectList } from '../../constants/projectList';
import './ProjectHeaderNav.css';

type ProjectHeaderNavProps = {
  currentPath: string;
  className?: string;
  showHomeLink?: boolean;
};

export default function ProjectHeaderNav({
  currentPath,
  className = '',
  showHomeLink = true,
}: ProjectHeaderNavProps) {
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
    <div className="project-nav-container">
      {/* Unified Navigation Bar with Title */}
      <nav className="unified-nav-header" aria-label="Project navigation">
        <div className="nav-buttons-group">
          {showHomeLink && (
            <Link to="/" className="nav-button nav-button--home" aria-label="Go back to home">
              🏠 Home
            </Link>
          )}

          {hasMultipleProjects && prev && (
            <Link
              to={prev.path}
              className="nav-button nav-button--prev"
              aria-label={`Go to previous project: ${prev.name}`}
            >
              ← Prev
            </Link>
          )}

          {hasMultipleProjects && next && (
            <Link
              to={next.path}
              className="nav-button nav-button--next"
              aria-label={`Go to next project: ${next.name}`}
            >
              Next →
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
