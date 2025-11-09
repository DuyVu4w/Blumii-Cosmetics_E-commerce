import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import CSS của Swiper
import 'swiper/css';
import 'swiper/css/navigation';

// Import ProductCard
import ProductCard from './ProductCard.jsx';

const SwiperProduct = ({ Title, products = [] }) => {

    const swiperRef = useRef(null);

    return (
        // 1. 🆕 THAY ĐỔI: Thêm class "swiper-product-wrapper"
        <div className="container-fluid vesitable py-5 swiper-product-wrapper">
            <div className="container py-5">

                {/* (Phần tiêu đề và nút bấm giữ nguyên) */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">{Title}</h1>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-custom-nav"
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            ←
                        </button>
                        <button
                            className="btn btn-custom-nav"
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            →
                        </button>
                    </div>
                </div>

                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Navigation, Autoplay]}
                    navigation={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 4 },
                    }}
                    className="vegetable-carousel-react"
                >
                    {products.map(product => (
                        <SwiperSlide key={product.id}>
                            <ProductCard
                                imgSrc={product.imgSrc}
                                category={product.category}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

SwiperProduct.propTypes = {
    Title: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
};
SwiperProduct.defaultProps = {
    Title: "Products",
    products: []
};

export default SwiperProduct;