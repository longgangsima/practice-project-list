import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home'));
// const Calculator = lazy(() => import('./pages/Calculator/CalculatorPage'));
const ImageCarouselIII = lazy(() => import('./pages/ImageCarouselIII/ImageCarousel'));

function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/image-carousel-iii" element={<ImageCarouselIII />} />
      </Routes>
    </Suspense>
  );
}

export default App;
