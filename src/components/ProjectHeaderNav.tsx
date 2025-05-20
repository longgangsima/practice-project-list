import React from 'react';
import { Link } from 'react-router-dom';
import { projectList } from '../constants/projectList';

type Props = {
  currentPath: string;
};

export default function ProjectHeaderNav({ currentPath }: Props) {
  console.log('projectList: ', projectList);
  console.log('currentPath: ', currentPath);

  const currentIndex = projectList.findIndex(p => p.path === currentPath);
  if (currentIndex === -1) {
    return <div>Project not found</div>;
  }
  const hasMultipleProjects = projectList.length > 1;
  const prev = hasMultipleProjects && projectList[(currentIndex - 1 + projectList.length) % projectList.length];
  const next = hasMultipleProjects && projectList[(currentIndex + 1) % projectList.length];

  console.log('currentIndex: ', currentIndex);
  const header_name = projectList[currentIndex]?.name;
  console.log('projectList: ', projectList);
  console.log('header_name: ', header_name);

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
          <Link to={prev.name} style={{ textDecoration: 'none' }}>
            ← {prev.name}
          </Link>
          <div style={{ margin: 0 }}>{header_name}</div>
          <Link to={next.name} style={{ textDecoration: 'none' }}>
            {next.name} →
          </Link>
        </>
      ) : (
        <div style={{ margin: 0 }}>{header_name}</div>
      )}
    </div>
  );
}
