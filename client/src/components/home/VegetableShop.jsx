import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import ProductCard from '../shared/ProductCard.jsx';

// Dữ liệu mẫu (dựa trên HTML gốc)
const sampleVegetableProducts = [
    { id: 'v1', imgSrc: 'img/vegetable-item-6.jpg', category: 'Vegetable', name: 'Parsely', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'v2', imgSrc: 'img/vegetable-item-1.jpg', category: 'Vegetable', name: 'Parsely', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'v3', imgSrc: 'img/vegetable-item-3.png', category: 'Vegetable', name: 'Banana', description: 'Lorem ipsum dolor sit amet...', price: '$7.99 / kg' },
    { id: 'v4', imgSrc: 'img/vegetable-item-4.jpg', category: 'Vegetable', name: 'Bell Papper', description: 'Lorem ipsum dolor sit amet...', price: '$7.99 / kg' },
    { id: 'v5', imgSrc: 'img/vegetable-item-5.jpg', category: 'Vegetable', name: 'Potatoes', description: 'Lorem ipsum dolor sit amet...', price: '$7.99 / kg' },
];

const VegetableShop = () => {
    return (
        <div className="container-fluid vesitable py-5">
            <div className="container py-5">
                <h1 className="mb-4">Fresh Organic Vegetables</h1>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 4,
                        },
                    }}
                    className="vegetable-carousel-react" 
                >
                    {sampleVegetableProducts.map(product => (
                        <SwiperSlide key={product.id}>
                            <div className="fruite-item">
                                <ProductCard 
                                    imgSrc={product.imgSrc}
                                    category={product.category}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default VegetableShop;