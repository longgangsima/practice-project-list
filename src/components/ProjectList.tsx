import { Link } from 'react-router-dom';
import { ProjectItem } from '../constants/projectList';

type ProjectListProps = {
  projects: ProjectItem[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {projects.map(({ name, path }) => (
        <li key={path} style={{ margin: '10px 0' }}>
          <Link
            to={path}
            style={{
              textDecoration: 'none',
              color: '#007bff',
              fontSize: '18px',
              fontWeight: '500',
            }}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
