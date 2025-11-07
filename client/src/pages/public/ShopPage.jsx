import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/shared/ProductCard.jsx';

// Dữ liệu mẫu (sau này bạn sẽ lấy từ API)
const sampleProducts = [
    { id: 1, imgSrc: 'img/fruite-item-5.jpg', category: 'Fruits', name: 'Grapes', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 2, imgSrc: 'img/fruite-item-5.jpg', category: 'Fruits', name: 'Grapes', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 3, imgSrc: 'img/fruite-item-2.jpg', category: 'Fruits', name: 'Raspberries', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 4, imgSrc: 'img/fruite-item-4.jpg', category: 'Fruits', name: 'Apricots', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 5, imgSrc: 'img/fruite-item-3.jpg', category: 'Fruits', name: 'Banana', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 6, imgSrc: 'img/fruite-item-1.jpg', category: 'Fruits', name: 'Oranges', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
];

const ShopPage = () => {

    // Xử lý logic thanh trượt giá (Price Range) bằng React State
    const [priceRange, setPriceRange] = useState(0);
    
    // Xử lý thay đổi giá trị thanh trượt
    const handlePriceChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setPriceRange(value);
        }
    };

    // Lọc sản phẩm dựa trên giá (giả định giá trong sampleProducts)
    const filteredProducts = useMemo(() => {
        return sampleProducts.filter(product => {
            const productPrice = parseFloat(product.price.replace('$', ''));
            return productPrice >= priceRange;
        });
    }, [priceRange]);

    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="#">Pages</Link>
                    </li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            {/* Single Page Header End */}

            {/* Fruits Shop Start*/}
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-3" placeholder="keywords"
                                            aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i
                                            className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-6"></div>
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3"
                                            form="fruitform">
                                            <option value="volvo">Nothing</option>
                                            <option value="saab">Popularity</option>
                                            <option value="opel">Organic</option>
                                            <option value="audi">Fantastic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                {/* Sidebar (Cột bên trái) */}
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <Link to="#"><i className="fas fa-apple-alt me-2"></i>Apples</Link>
                                                            <span>(3)</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <Link to="#"><i className="fas fa-apple-alt me-2"></i>Oranges</Link>
                                                            <span>(5)</span>
                                                        </div>
                                                    </li>
                                                    {/* ... (Các danh mục khác) ... */}
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Price Range Filter */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className="mb-2">Price</h4>
                                                <input
                                                    type="range"
                                                    className="form-range w-100"
                                                    id="rangeInput"
                                                    name="rangeInput"
                                                    min="0"
                                                    max="500"
                                                    value={priceRange}
                                                    onInput={handlePriceChange} 
                                                />
                                                <output 
                                                    id="amount" 
                                                    name="amount" 
                                                    htmlFor="rangeInput"
                                                >
                                                    ${priceRange}
                                                </output>
                                            </div>
                                        </div>
                                        {/* Additional Filter */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Additional</h4>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-1" name="Categories-1"
                                                        value="Beverages" />
                                                    <label htmlFor="Categories-1"> Organic</label>
                                                </div>
                                                {/* ... (Các radio button khác) ... */}
                                            </div>
                                        </div>
                                        {/* Featured Products */}
                                        <div className="col-lg-12">
                                            <h4 className="mb-3">Featured products</h4>
                                            {/* (Mục sản phẩm nổi bật) */}
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="position-relative">
                                                <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                                                <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                                    <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Grid (Cột bên phải) */}
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">

                                        {/* Sử dụng ProductCard và lặp qua dữ liệu đã được lọc */}
                                        {filteredProducts.map(product => (
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

                                        {/* Pagination */}
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
            {/* Fruits Shop End*/}
        </>
    );
};

export default ShopPage;