import React, { useState, useEffect } from 'react';

const Spinner = () => {
    // State để kiểm soát việc hiển thị spinner
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    const spinnerClasses = `
        w-100 vh-100 
        bg-white 
        position-fixed 
        translate-middle top-50 start-50 
        d-flex align-items-center justify-content-center
        ${isVisible ? 'show' : ''}
    `;

    return (
        <div id="spinner" className={spinnerClasses}>
            {/* Sử dụng lại đúng component spinner của Bootstrap */}
            <div className="spinner-grow text-primary" role="status"></div>
        </div>
    );
};

export default Spinner;