import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from '../constants/projectList';

type Props = {
  currentPath: string;
};

export default function ProjectHeaderNav({ currentPath }: Props) {
  const currentIndex = projectList.findIndex(p => p.path === currentPath);

  // Fallback for invalid path
  if (currentIndex === -1) {
    return <div>Project not found</div>;
  }

  const hasMultipleProjects = projectList.length > 1;
  const prev = hasMultipleProjects ? projectList[(currentIndex - 1 + projectList.length) % projectList.length] : null;

  const next = hasMultipleProjects ? projectList[(currentIndex + 1) % projectList.length] : null;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {hasMultipleProjects ? (
        <>
          {prev && (
            <Link to={prev.path} style={{ textDecoration: 'none' }}>
              ← {prev.name}
            </Link>
          )}
          <h1 style={{ margin: 0 }}>{projectList[currentIndex].name}</h1>
          {next && (
            <Link to={next.path} style={{ textDecoration: 'none' }}>
              {next.name} →
            </Link>
          )}
        </>
      ) : (
        <div style={{ margin: '0 auto' }}>{projectList[currentIndex].name}</div>
      )}
    </div>
  );
}
