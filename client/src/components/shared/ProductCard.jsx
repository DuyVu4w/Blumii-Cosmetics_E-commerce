import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ imgSrc, category, name, description, price }) => {
    // Component này KHÔNG chứa các lớp "col-*"
    // Chúng được thêm vào ở component cha (FruitsShop.jsx hoặc ShopPage.jsx)
    return (
        <div className="rounded position-relative fruite-item h-100">
            <div className="fruite-img">
                <img src={imgSrc} className="img-fluid w-100 rounded-top" alt={name} />
            </div>
            <div 
                className="text-white bg-secondary px-3 py-1 rounded position-absolute" 
                style={{ top: '10px', left: '10px' }}
            >
                {category}
            </div>
            <div className="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column">
                <Link to="/shop-detail">
                    <h4>{name}</h4>
                </Link>
                <p>{description}</p>
                <div className="d-flex justify-content-between flex-lg-wrap mt-auto">
                    <p className="text-dark fs-5 fw-bold mb-0">{price}</p>
                    <button 
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                        onClick={() => console.log(`Added ${name} to cart`)}
                    >
                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
    imgSrc: 'img/fruite-item-1.jpg',
    category: 'Category',
    name: 'Product Name',
    description: 'Description not available.',
    price: '$0.00 / kg'
};

export default ProductCard;