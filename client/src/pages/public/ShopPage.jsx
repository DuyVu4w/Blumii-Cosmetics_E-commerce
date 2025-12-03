import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/shared/ProductCard.jsx";
import ShopSidebar from "../../components/shared/ShopSidebar.jsx";
import { useState } from "react";
import { useEffect } from "react";

// (Dữ liệu mẫu giữ nguyên...)
const sampleProducts = [
  {
    id: 1,
    imgSrc: "img/serum.jpg",
    category: "Skincare",
    name: "Grapes",
    description: "Lorem ipsum dolor sit amet...",
    price: 799000
  },
  {
    id: 2,
    imgSrc: "img/nuoctaytrang.jpg",
    category: "Skincare",
    name: "Grapes",
    description: "Lorem ipsum dolor sit amet...",
    price: 390000
  },
  {
    id: 3,
    imgSrc: "img/cushion.jpg",
    category: "Makeup",
    name: "Raspberries",
    description: "Lorem ipsum dolor sit amet...",
    price: 499000
  },
  {
    id: 4,
    imgSrc: "img/romand.jpg",
    category: "Makeup",
    name: "Apricots",
    description: "Lorem ipsum dolor sit amet...",
    price: 1000000,
  },
  {
    id: 5,
    imgSrc: "img/torriden.jpg",
    category: "Skincare",
    name: "Banana",
    description: "Lorem ipsum dolor sit amet...",
    price: 100000,
  },
  {
    id: 6,
    imgSrc: "img/torridenmask.jpg",
    category: "Mask",
    name: "Oranges",
    description: "Lorem ipsum dolor sit amet...",
    price: 99000
  },
];

const ShopPage = () => {
  const PRODUCTS_DATA = sampleProducts

  // State danh sách sản phẩm hiển thị
  const [products, setProducts] = useState(PRODUCTS_DATA);
  
  // State cho ô input tìm kiếm trong trang Shop
  const [searchInput, setSearchInput] = useState(""); 

  const location = useLocation();
  const navigate = useNavigate(); // Hook để đổi URL

  // lawgns nghe thay đổi
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const rawKeyword = searchParams.get("search");

    if (rawKeyword) {
      // đồng bộ từ khóa với input search 
      setSearchInput(rawKeyword);

      // tìm kiếm sản phẩm theo tên
      const keyword = rawKeyword.toLowerCase().trim();
      const filteredProducts = PRODUCTS_DATA.filter((item) => {
        return item.name.toLowerCase().includes(keyword);
      });

      setProducts(filteredProducts);
    } else {
      // reset, hiển thị tất cả nếu không có từ khóa
      setSearchInput(""); 
      setProducts(PRODUCTS_DATA);
    }
  }, [location.search]); // Chạy lại mỗi khi URL thay đổi

  // Hàm tìm kiếm
  const handleLocalSearch = () => {
    // Đẩy từ khóa lên URL -> useEffect ở trên sẽ tự động chạy để filter
    navigate(`?search=${encodeURIComponent(searchInput)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLocalSearch();
    }
  };

  return (
    <>
      {/* (Banner Header ... giữ nguyên) */}
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

      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Authentic Cosmetic Shop</h1>
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
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleKeyDown} // Nhấn Enter
                    />
                    <span id="search-icon-1" className="input-group-text p-3" onClick={handleLocalSearch} style={{ cursor: "pointer" }}>
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
                <div className="col-6"></div>
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Default Sorting:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      className="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                    >
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
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="col-md-6 col-lg-6 col-xl-4"
                      >
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
                        <Link to="#" className="rounded">
                          &laquo;
                        </Link>
                        <Link to="#" className="active rounded">
                          1
                        </Link>
                        <Link to="#" className="rounded">
                          2
                        </Link>
                        <Link to="#" className="rounded">
                          3
                        </Link>
                        <Link to="#" className="rounded">
                          4
                        </Link>
                        <Link to="#" className="rounded">
                          5
                        </Link>
                        <Link to="#" className="rounded">
                          6
                        </Link>
                        <Link to="#" className="rounded">
                          &raquo;
                        </Link>
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
