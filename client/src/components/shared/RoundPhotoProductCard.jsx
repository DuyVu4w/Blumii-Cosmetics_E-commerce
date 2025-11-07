import React from 'react';
import PropTypes from 'prop-types';

const RoundPhotoProductCard = ({ imgSrc, name, price }) => {
    
    
    return (
        <div className="p-4 rounded bg-light h-100">
            <div className="row align-items-center">
                <div className="col-6">
                    <img src={imgSrc} className="img-fluid rounded-circle w-100" alt={name} />
                </div>
                <div className="col-6">
                    <a href="/shop-detail" className="h5">{name}</a>
                    <div className="d-flex my-3">
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
        </div>
    );
};

RoundPhotoProductCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

RoundPhotoProductCard.defaultProps = {
    imgSrc: 'img/best-product-1.jpg',
    name: 'Product Name',
    price: '0.00 $'
};

export default RoundPhotoProductCard;