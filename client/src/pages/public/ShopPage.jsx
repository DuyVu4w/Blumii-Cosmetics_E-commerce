import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/shared/ProductCard.jsx';
import ShopSidebar from '../../components/shared/ShopSidebar.jsx';

// (Dữ liệu mẫu giữ nguyên...)
const sampleProducts = [
    { id: 1, imgSrc: 'img/fruite-item-5.jpg', category: 'Fruits', name: 'Grapes', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 2, imgSrc: 'img/fruite-item-5.jpg', category: 'Fruits', name: 'Grapes', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 3, imgSrc: 'img/fruite-item-2.jpg', category: 'Fruits', name: 'Raspberries', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 4, imgSrc: 'img/fruite-item-4.jpg', category: 'Fruits', name: 'Apricots', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 5, imgSrc: 'img/fruite-item-3.jpg', category: 'Fruits', name: 'Banana', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 6, imgSrc: 'img/fruite-item-1.jpg', category: 'Fruits', name: 'Oranges', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
];

const ShopPage = () => {
    return (
        <>
            {/* (Banner Header ... giữ nguyên) */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="#">Pages</Link></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>

            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input 
                                            type="search" 
                                            className="form-control p-3" 
                                            placeholder="keywords" 
                                            aria-describedby="search-icon-1" 
                                        />
                                        <span id="search-icon-1" className="input-group-text p-3">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6"></div>
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option value="volvo">Nothing</option>
                                            <option value="saab">Popularity</option>
                                            <option value="opel">Organic</option>
                                            <option value="audi">Fantastic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* (Kết thúc hàng tìm kiếm/sắp xếp) */}


                            {/* 2. HÀNG SIDEBAR VÀ SẢN PHẨM */}
                            <div className="row g-4">
                                {/* Truyền 'showFilters={true}' để Sidebar hiển thị bộ lọc giá */}
                                <ShopSidebar showFilters={true} />
                                
                                {/* Product Grid (Cột bên phải) */}
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">
                                        {sampleProducts.map(product => (
                                            <div key={product.id} className="col-md-6 col-lg-6 col-xl-4">
                                                <ProductCard 
                                                    imgSrc={product.imgSrc}
                                                    category={product.category}
                                                    name={product.name}
                                                    description={product.description}
                                                    price={product.price} 
                                                />
                                            </div>
                                        ))}
                                        
                                        {/* (Pagination ... giữ nguyên) */}
                                        <div className="col-12">
                                            <div className="pagination d-flex justify-content-center mt-5">
                                                <Link to="#" className="rounded">&laquo;</Link>
                                                <Link to="#" className="active rounded">1</Link>
                                                <Link to="#" className="rounded">2</Link>
                                                <Link to="#" className="rounded">3</Link>
                                                <Link to="#" className="rounded">4</Link>
                                                <Link to="#" className="rounded">5</Link>
                                                <Link to="#" className="rounded">6</Link>
                                                <Link to="#" className="rounded">&raquo;</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopPage;