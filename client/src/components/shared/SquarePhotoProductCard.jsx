import React from 'react';
import PropTypes from 'prop-types';

const SquarePhotoProductCard = ({ imgSrc, name, price }) => {
    return (
        <div className="text-center h-100">
            <img
                src={imgSrc}
                className="img-fluid rounded"
                alt={name}
            />
            <div className="py-4">
                <a href="/shop-detail" className="h5">{name}</a>
                <div className="d-flex my-3 justify-content-center">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star"></i>
                </div>
                <h4 className="mb-3">{price}</h4>
                <button 
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                    onClick={() => console.log(`Added ${name} to cart`)}
                >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                </button>
            </div>
        </div>
    );
};

SquarePhotoProductCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

SquarePhotoProductCard.defaultProps = {
    imgSrc: 'img/fruite-item-1.jpg',
    name: 'Product Name',
    price: '0.00 $'
};

export default SquarePhotoProductCard;