import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// 2. Import tất cả các component layout
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Spinner from '../shared/Spinner.jsx';

const PublicLayout = () => {
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

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Spinner />
            
            <div className='container-fluid fixed-top'>
                <Header />
            </div>

            {/* 4. <Outlet /> là nơi các trang con (HomePage, ShopPage) sẽ được render */}
            <main>
                <Outlet />
            </main>
            
            <Footer />

            {/* Nút Back to Top */}
            {showBackToTop && (
                <a 
                    href="#" 
                    className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
                    onClick={scrollToTop}
                    style={{ display: 'flex' }}
                >
                    <i className="fa fa-arrow-up"></i>
                </a>
            )}
        </>
    );
};

export default PublicLayout;