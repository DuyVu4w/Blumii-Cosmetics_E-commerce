import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các components luôn sử dụng
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Spinner from './components/shared/Spinner.jsx';

// Import các trang
import HomePage from './pages/public/HomePage.jsx';
import ShopPage from './pages/public/ShopPage.jsx'; 

function App() {
  // State và Effect cho nút Back-to-Top
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hàm xử lý khi click nút Back-to-Top
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <BrowserRouter>
        {/* Các components bên trên luôn được hiển thị */}
        <Spinner />
        
        <div className='container-fluid fixed-top'>
          <Header />
        </div>

        {/* Xác định trang nào được render */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          {/* <Route path='/cart' element={<CartPage />} /> */}
        </Routes>

        {/* Các components bên dưới luôn được hiển thị  */}
        <Footer />

        {/* Nút Back to Top */}
        {showBackToTop && (
          <a 
            href="#" 
            className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
            onClick={scrollToTop}
            style={{ display: 'flex' }} // Hiển thị nút
          >
            <i className="fa fa-arrow-up"></i>
          </a>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;