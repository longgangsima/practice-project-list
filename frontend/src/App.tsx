import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ProjectList } from './components';
import { projectList } from './constants/projectList';

const ImageCarousel = lazy(() => import('./pages/ImageCarousel'));
const BookStore = lazy(() => import('./pages/BookStore'));
const CardFlips = lazy(() => import('./pages/CardFlips'));
const RestaurantSystem = lazy(() => import('./pages/RestaurantSystem'));

function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: '2rem' }}>
              <h1>🧪 Interview Projects</h1>
              <ProjectList projects={projectList} />
            </div>
          }
        />
        <Route path="/image-carousel" element={<ImageCarousel />} />
        <Route path="/book-store" element={<BookStore />} />
        <Route path="/card-flips" element={<CardFlips />} />
        <Route path="/restaurant-system" element={<RestaurantSystem />} />
      </Routes>
    </Suspense>
  );
}

export default App;
