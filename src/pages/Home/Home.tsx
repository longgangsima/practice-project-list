import React from 'react';
import { ProjectList } from '../../components';
import { projectList } from '../../constants/projectList';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧪 Interview Projects</h1>
      <ProjectList projects={projectList} />
    </div>
  );
}
