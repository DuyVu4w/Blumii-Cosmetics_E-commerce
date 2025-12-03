import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/shared/ProductCard.jsx";
import ShopSidebar from "../../components/shared/ShopSidebar.jsx";
import { useState } from "react";
import { useEffect } from "react";

const ShopPage = () => {


  const [products, setProducts] = useState([]);       // Danh sách sản phẩm đang hiển thị (đã lọc)
  const [allProducts, setAllProducts] = useState([]); // Danh sách GỐC lấy từ DB (để không bị mất khi lọc)
  const [loading, setLoading] = useState(true);       // Trạng thái đang tải
  const [error, setError] = useState(null);           // Trạng thái lỗi

  // State cho bộ lọc
  const [searchInput, setSearchInput] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:8080/api/products/', {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error("Can not get api");
        }

        const responseData = await response.json();
        const data = responseData.data || [] // lấy data từ respone hoặc mảng rỗng

        const formattedData = data.map((item) => ({
          ...item,
          price: Number(item.price), // Ép kiểu số để lọc giá
          imgSrc: item.image[0],
          // Nếu DB trả về _id, gán nó vào id để frontend dùng
          id: item.id || item._id,
        }));

        setAllProducts(formattedData); // Lưu vào danh sách gốc
        setProducts(formattedData);    // Lưu vào danh sách hiển thị ban đầu
      } catch (err) {
        setError(err.message);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // [] rỗng nghĩa là chỉ chạy 1 lần khi 

  // lawgns nghe thay đổi
  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const rawKeyword = searchParams.get("search");

    if (rawKeyword) {
      // đồng bộ từ khóa với input search 
      setSearchInput(rawKeyword);

      // tìm kiếm sản phẩm theo tên
      const keyword = rawKeyword.toLowerCase().trim();
      const filteredProducts = allProducts.filter((item) => {
        return item.name.toLowerCase().includes(keyword);
      });

      setProducts(filteredProducts);
    } else {
      // reset, hiển thị tất cả nếu không có từ khóa
      setSearchInput("");
      setProducts(allProducts);
    }
  }, [location.search, allProducts]); // Chạy lại mỗi khi URL thay đổi

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
  

  // hiển thị đang loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-3">Loading product...</h4>
      </div>
    );
  }

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
