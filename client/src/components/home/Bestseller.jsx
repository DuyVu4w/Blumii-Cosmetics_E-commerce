import React from 'react';
import RoundPhotoProductCard from '../shared/RoundPhotoProductCard.jsx';
import SquarePhotoProductCard from '../shared/SquarePhotoProductCard.jsx';

// 1. Tạo dữ liệu mẫu
const roundPhotoProducts = [
    { id: 'b1', imgSrc: 'img/best-product-1.jpg', name: 'Organic Tomato', price: '3.12 $' },
    { id: 'b2', imgSrc: 'img/best-product-2.jpg', name: 'Organic Tomato', price: '3.12 $' },
    { id: 'b3', imgSrc: 'img/best-product-3.jpg', name: 'Organic Tomato', price: '3.12 $' },
];

const squarePhotoProducts = [
    { id: 's1', imgSrc: 'img/fruite-item-1.jpg', name: 'Organic Tomato', price: '3.12 $' },
    { id: 's2', imgSrc: 'img/fruite-item-2.jpg', name: 'Organic Tomato', price: '3.12 $' },
    { id: 's3', imgSrc: 'img/fruite-item-3.jpg', name: 'Organic Tomato', price: '3.12 $' },
    { id: 's4', imgSrc: 'img/fruite-item-4.jpg', name: 'Organic Tomato', price: '3.12 $' }
];


const Bestseller = () => {
    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mx-auto mb-5" style={{maxWidth: '700px'}}>
                    <h1 className="display-4">Bestseller Products</h1>
                    <p>Discover our most popular products, loved by customers for their exceptional quality and unbeatable freshness. Each item is carefully selected to ensure it meets the highest standards — perfect for your everyday needs or special occasions. Shop now and experience the best of what we offer.</p>
                </div>
                
                <div className="row g-4">
                    
                    {roundPhotoProducts.map(product => (
                        <div key={product.id} className="col-lg-6 col-xl-4">
                            <RoundPhotoProductCard 
                                imgSrc={product.imgSrc}
                                name={product.name}
                                price={product.price}
                            />
                        </div>
                    ))}

                    {squarePhotoProducts.map(product => (
                        <div key={product.id} className="col-md-6 col-lg-6 col-xl-3">
                            <SquarePhotoProductCard 
                                imgSrc={product.imgSrc}
                                name={product.name}
                                price={product.price}
                            />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default Bestseller;