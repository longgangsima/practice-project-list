import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ProjectHeaderNav from '../navigation/ProjectHeaderNav';
import './ProjectDetailLayout.css';

type ProjectDetailLayoutProps = {
  currentPath: string;
  children: ReactNode;
  showHomeLink?: boolean;
  className?: string;
  projectRequirements?: ReactNode;
};

export default function ProjectDetailLayout({
  currentPath,
  children,
  showHomeLink = true,
  className = '',
  projectRequirements,
}: ProjectDetailLayoutProps) {
  return (
    <div className={`project-detail-wrapper ${className}`}>
      {showHomeLink && (
        <Link to="/" className="home-link" aria-label="Go back to home">
          ⬅ Home
        </Link>
      )}

      <ProjectHeaderNav currentPath={currentPath} />

      <div className="project-detail-container">
        {/* Left Sidebar - Project Requirements */}
        {projectRequirements && (
          <aside className="project-requirements">
            <div className="sidebar-header">
              <h3>📋 Project Requirements</h3>
            </div>
            <div className="sidebar-content">{projectRequirements}</div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="project-main-content">{children}</main>
      </div>
    </div>
  );
}
