import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home'));
const ImageCarousel = lazy(() => import('./pages/ImageCarousel/ImageCarousel'));
const BookStore = lazy(() => import('./pages/BookStore'));
const RestaurantSystem = lazy(() => import('./pages/RestaurantSystem'));

function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-carousel" element={<ImageCarousel />} />
        <Route path="/book-store" element={<BookStore />} />
        <Route path="/restaurant-system" element={<RestaurantSystem />} />
      </Routes>
    </Suspense>
  );
}

export default App;
