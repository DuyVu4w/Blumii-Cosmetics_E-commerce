import React, { useState, useEffect } from "react";
import ProductCard from "../../components/shared/ProductCard";
import Loader from "../../components/shared/Loader";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch dữ liệu từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Hàm nạp dữ liệu mẫu (Dùng để test nhanh nếu DB trống)
  const handleSeedData = async () => {
    if(!window.confirm("Bạn có chắc muốn reset và nạp dữ liệu mẫu không?")) return;
    setLoading(true);
    try {
        await fetch('/api/products/seed', { method: 'POST' });
        window.location.reload();
    } catch { alert("Lỗi"); }
  };

  // Hàm format giá tiền (100000 -> 100.000)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  if (loading) return <Loader />;

  return (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <div className="tab-class text-center">
          <div className="row g-4">
            <div className="col-lg-4 text-start">
              <h1>Explore Our Beauty Collection</h1>
              {/* Nút tạm để nạp dữ liệu nếu chưa có */}
              {products.length === 0 && (
                  <button onClick={handleSeedData} className="btn btn-sm btn-warning mt-2">
                    Click here to Seed Data (Nạp dữ liệu mẫu)
                  </button>
              )}
            </div>
            <div className="col-lg-8 text-end">
              <ul className="nav nav-pills d-inline-flex text-center mb-5">
                <li className="nav-item">
                  <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                    <span className="text-dark" style={{ width: "130px" }}>All Products</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                    <span className="text-dark" style={{ width: "130px" }}>Skincare</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                    <span className="text-dark" style={{ width: "130px" }}>Makeup</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                    <span className="text-dark" style={{ width: "130px" }}>Body & Hair</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                    <span className="text-dark" style={{ width: "130px" }}>Mask</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="tab-content">
            {/* TAB 1: All Products */}
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="row g-4">
                    {products.map((product) => (
                      <div key={product._id} className="col-md-6 col-lg-3 col-xl-3">
                        <ProductCard
                          imgSrc={product.imgSrc}
                          category={product.category}
                          name={product.name}
                          description={product.description}
                          price={`${formatPrice(product.price)}₫`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 2: Skincare */}
            <div id="tab-2" className="tab-pane fade show p-0">
                <div className="row g-4">
                    {products.filter(p => p.category === "Skincare").map((product) => (
                        <div key={product._id} className="col-md-6 col-lg-3 col-xl-3">
                            <ProductCard
                                imgSrc={product.imgSrc}
                                category={product.category}
                                name={product.name}
                                description={product.description}
                                price={`${formatPrice(product.price)}₫`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* TAB 3: Makeup */}
            <div id="tab-3" className="tab-pane fade show p-0">
                <div className="row g-4">
                    {products.filter(p => p.category === "Makeup").map((product) => (
                        <div key={product._id} className="col-md-6 col-lg-3 col-xl-3">
                            <ProductCard
                                imgSrc={product.imgSrc}
                                category={product.category}
                                name={product.name}
                                description={product.description}
                                price={`${formatPrice(product.price)}₫`}
                            />
                        </div>
                    ))}
                </div>
            </div>

             {/* TAB 4: Body & Hair */}
             <div id="tab-4" className="tab-pane fade show p-0">
                <div className="row g-4">
                    {products.filter(p => p.category === "Body & Hair").map((product) => (
                        <div key={product._id} className="col-md-6 col-lg-3 col-xl-3">
                            <ProductCard
                                imgSrc={product.imgSrc}
                                category={product.category}
                                name={product.name}
                                description={product.description}
                                price={`${formatPrice(product.price)}₫`}
                            />
                        </div>
                    ))}
                </div>
            </div>

             {/* TAB 5: Mask */}
             <div id="tab-5" className="tab-pane fade show p-0">
                <div className="row g-4">
                    {products.filter(p => p.category === "Mask").map((product) => (
                        <div key={product._id} className="col-md-6 col-lg-3 col-xl-3">
                            <ProductCard
                                imgSrc={product.imgSrc}
                                category={product.category}
                                name={product.name}
                                description={product.description}
                                price={`${formatPrice(product.price)}₫`}
                            />
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;