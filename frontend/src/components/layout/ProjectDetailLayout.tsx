import { ReactNode } from 'react';
import ProjectHeaderNav from '../navigation/ProjectHeaderNav';
import './ProjectDetailLayout.css';

type ProjectDetailLayoutProps = {
  currentPath: string;
  children: ReactNode;
  showHomeLink?: boolean;
  className?: string;
  projectRequirements?: ReactNode;
  implementationTabs?: ReactNode;
};

export default function ProjectDetailLayout({
  currentPath,
  children,
  showHomeLink = true,
  className = '',
  projectRequirements,
  implementationTabs,
}: ProjectDetailLayoutProps) {
  return (
    <div className={`project-detail-wrapper ${className}`}>
      <ProjectHeaderNav currentPath={currentPath} showHomeLink={showHomeLink} />

      {/* Compact implementation tabs */}
      {implementationTabs && (
        <div className="implementation-tabs-container">{implementationTabs}</div>
      )}

      <div className="project-detail-container">
        {/* Left Sidebar - Project Requirements */}
        {projectRequirements && (
          <aside className="project-requirements">
            <div className="sidebar-content">{projectRequirements}</div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="project-main-content">{children}</main>
      </div>
    </div>
  );
}
