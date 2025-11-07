import React from 'react';
// 1. Import component ProductCard
import ProductCard from '../shared/ProductCard';

// 2. Tạo một mảng dữ liệu mẫu (sau này bạn sẽ lấy từ API)
const sampleFruitProducts = [
    { id: 'f1', imgSrc: 'img/fruite-item-5.jpg', category: 'Fruits', name: 'Grapes', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'f2', imgSrc: 'img/fruite-item-5.jpg', category: 'Fruits', name: 'Grapes', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'f3', imgSrc: 'img/fruite-item-2.jpg', category: 'Fruits', name: 'Raspberries', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'f4', imgSrc: 'img/fruite-item-4.jpg', category: 'Fruits', name: 'Apricots', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'f5', imgSrc: 'img/fruite-item-3.jpg', category: 'Fruits', name: 'Banana', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'f6', imgSrc: 'img/fruite-item-1.jpg', category: 'Fruits', name: 'Oranges', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'f7', imgSrc: 'img/fruite-item-2.jpg', category: 'Fruits', name: 'Raspberries', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'f8', imgSrc: 'img/fruite-item-5.jpg', category: 'Fruits', name: 'Grapes', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
];


const FruitsShop = () => {

    // LƯU Ý: Logic chuyển tab (data-bs-toggle="pill")
    // sẽ không hoạt động nếu không có Bootstrap JS.
    // Tạm thời, chúng ta chỉ hiển thị nội dung cho Tab 1 (All Products)
    
    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Our Organic Products</h1>
                        </div>
                        <div className="col-lg-8 text-end">
                            <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                        <span className="text-dark" style={{ width: '130px' }}>All Products</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                        <span className="text-dark" style={{ width: '130px' }}>Vegetables</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                        <span className="text-dark" style={{ width: '130px' }}>Fruits</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                        <span className="text-dark" style={{ width: '130px' }}>Bread</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                                        <span className="text-dark" style={{ width: '130px' }}>Meat</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-lg-12">
                                    <div className="row g-4">
                                        
                                        {sampleFruitProducts.map(product => (
                                            <div key={product.id} className="col-md-6 col-lg-3 col-xl-3">
                                                <ProductCard 
                                                    imgSrc={product.imgSrc}
                                                    category={product.category}
                                                    name={product.name}
                                                    description={product.description}
                                                    price={product.price}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-2" className="tab-pane fade show p-0">
                            {/* (Nội dung tab 2 - Tạm thời trống) */}
                        </div>
                        <div id="tab-3" className="tab-pane fade show p-0">
                            {/* (Nội dung tab 3 - Tạm thời trống) */}
                        </div>
                        <div id="tab-4" className="tab-pane fade show p-0">
                            {/* (Nội dung tab 4 - Tạm thời trống) */}
                        </div>
                        <div id="tab-5" className="tab-pane fade show p-0">
                            {/* (Nội dung tab 5 - Tạm thời trống) */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FruitsShop;