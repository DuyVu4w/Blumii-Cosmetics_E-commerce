import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Import Layout mới
import PublicLayout from './components/layout/PublicLayout.jsx';

// 2. Import các trang
import HomePage from './pages/public/HomePage.jsx';
import ShopPage from './pages/public/ShopPage.jsx';
import AuthPage from './pages/public/AuthPage.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';

function App() {
  // Toàn bộ logic (useState, useEffect) đã được chuyển sang PublicLayout

  return (
    <BrowserRouter>
      <Routes>
        {/* 3. Các Route CÓ Layout (Header/Footer) */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>

        {/* 4. Các Route KHÔNG CÓ Layout */}
        <Route path='/auth' element={<AuthPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;