import React, { useState, useEffect } from "react";
import ProductCard from "../../components/shared/ProductCard";
import Loader from "../../components/shared/Loader";

const FruitsShop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Products");

  // Danh sách danh mục để hiển thị Tabs
  const categories = ["All Products", "Skincare", "Makeup", "Body & Hair", "Mask"];

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

  // Hàm format giá tiền (VD: 189000 -> 189.000)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Lọc sản phẩm theo Tab đang chọn
  const filteredProducts = activeTab === "All Products"
    ? products
    : products.filter(p => {
      if (activeTab === "Body & Hair") return ["Body & Hair", "BodyCare", "HairCare"].includes(p.category);
      return p.category === activeTab;
    });

  if (loading) return <Loader />;

  return (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <div className="tab-class text-center">
          <div className="row g-4">
            <div className="col-lg-4 text-start">
              <h1>Explore Our Beauty Collection</h1>
            </div>
            <div className="col-lg-8 text-end">
              <ul className="nav nav-pills d-inline-flex text-center mb-5">
                {categories.map((cat) => (
                  <li className="nav-item" key={cat}>
                    <button
                      className={`d-flex m-2 py-2 rounded-pill border-0 ${activeTab === cat ? "active" : ""}`}
                      onClick={() => setActiveTab(cat)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: activeTab === cat ? '#eaae2dff' : '#d6d6d6ff',
                      }}
                    >
                      <span
                        className=""
                        style={{
                          width: "130px",
                          color: activeTab === cat ? '#ffffffff' : '#333',
                          fontWeight: activeTab === cat ? 'bold' : 'normal'
                        }}
                      >
                        {cat}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hiển thị danh sách sản phẩm đã lọc */}
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="row g-4">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div key={product._id} className="col-md-6 col-lg-3 col-xl-3">
                          <ProductCard
                            id={product._id}
                            imgSrc={product.image[0]}
                            category={product.category}
                            name={product.name}
                            description={product.description}
                            // Format giá từ số sang chuỗi có dấu chấm và đ
                            price={`${formatPrice(product.price)}₫`}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-12 py-5 text-muted">
                        <p>Chưa có sản phẩm nào trong danh mục này.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FruitsShop;