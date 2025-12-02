import React from "react";
// 1. Import component ProductCard
import ProductCard from "../shared/ProductCard";

// 2. Tạo một mảng dữ liệu mẫu (sau này bạn sẽ lấy từ API)
const sampleFruitProducts = [
  {
    id: "f1",
    imgSrc: "img/serum.jpg",
    category: "Skincare",
    name: "Ordinary Serum",
    description: "Hydrating serum for smooth, healthy skin.",
    price: "189.000",
  },
  {
    id: "f2",
    imgSrc: "img/espoir.jpg",
    category: "Makeup",
    name: "Grapes",
    description: "Soft, blendable shades for daily makeup looks.",
    price: "490.000",
  },
  {
    id: "f3",
    imgSrc: "img/maybelline.jpg",
    category: "Makeup",
    name: "Maybelline foundation",
    description: "Lightweight foundation with natural coverage.",
    price: "280.000",
  },
  {
    id: "f4",
    imgSrc: "img/romand.jpg",
    category: "Makeup",
    name: "Romand Lipstick",
    description: "Glossy finish with smooth, non-sticky texture.",
    price: "200.000",
  },
  {
    id: "f5",
    imgSrc: "img/moringa.jpg",
    category: "Body & Hair",
    name: "Moringa Shampoo",
    description: "Gentle cleansing with a fresh botanical scent.",
    price: "380.000",
  },
  {
    id: "f6",
    imgSrc: "img/cocoon.jpg",
    category: "Skincare",
    name: "Cocoon Exfoliator",
    description: "Mild exfoliator for soft and refreshed skin.",
    price: "139.000",
  },
  {
    id: "f7",
    imgSrc: "img/torridenmask.jpg",
    category: "Mask",
    name: "Torriden Mask",
    description: "Moisturizing sheet mask for instant hydration.",
    price: "50.000",
  },
  {
    id: "f8",
    imgSrc: "img/nuoctaytrang.jpg",
    category: "Skincare",
    name: "Cleansing Water",
    description: "Gentle makeup remover for clean, fresh skin.",
    price: "173.000",
  },
  {
    id: "f9",
    imgSrc: "img/3CE.jpg",
    category: "Makeup",
    name: "Liquid 3CE",
    description: "Long-lasting matte finish with vibrant color.",
    price: "199.000",
  },
  {
    id: "f10",
    imgSrc: "img/maskgiay.jpg",
    category: "Mask",
    name: "Mask Sheet",
    description: "Hydrating sheet mask for glowing skin.",
    price: "20.000",
  },
  {
    id: "f11",
    imgSrc: "img/daugoidauloreal.jpg",
    category: "Body & Hair",
    name: "Loreal Shampoo",
    description: "Nourishing shampoo for healthy, shiny hair.",
    price: "219.000",
  },
  {
    id: "f12",
    imgSrc: "img/cushion.jpg",
    category: "Makeup",
    name: "Romand Cushion",
    description: "Lightweight cushion foundation for a natural look.",
    price: "289.000",
  },
];

const BlummiShop = () => {
  // LƯU Ý: Logic chuyển tab (data-bs-toggle="pill")
  // sẽ không hoạt động nếu không có Bootstrap JS.
  // Tạm thời, chúng ta chỉ hiển thị nội dung cho Tab 1 (All Products)

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
                <li className="nav-item">
                  <a
                    className="d-flex m-2 py-2 bg-light rounded-pill active"
                    data-bs-toggle="pill"
                    href="#tab-1"
                  >
                    <span className="text-dark" style={{ width: "130px" }}>
                      All Products
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex py-2 m-2 bg-light rounded-pill"
                    data-bs-toggle="pill"
                    href="#tab-2"
                  >
                    <span className="text-dark" style={{ width: "130px" }}>
                      Skincare
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex m-2 py-2 bg-light rounded-pill"
                    data-bs-toggle="pill"
                    href="#tab-3"
                  >
                    <span className="text-dark" style={{ width: "130px" }}>
                      Makeup
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex m-2 py-2 bg-light rounded-pill"
                    data-bs-toggle="pill"
                    href="#tab-4"
                  >
                    <span className="text-dark" style={{ width: "130px" }}>
                      Body & Hair
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex m-2 py-2 bg-light rounded-pill"
                    data-bs-toggle="pill"
                    href="#tab-5"
                  >
                    <span className="text-dark" style={{ width: "130px" }}>
                      Mask
                    </span>
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
                    {sampleFruitProducts.map((product) => (
                      <div
                        key={product.id}
                        className="col-md-6 col-lg-3 col-xl-3"
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
                  </div>
                </div>
              </div>
            </div>
            <div id="tab-2" className="tab-pane fade show p-0">
              {
                <div id="tab-2" className="tab-pane fade show p-0">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="row g-4">
                        {sampleFruitProducts
                          .filter((p) => p.category === "Skincare")
                          .map((product) => (
                            <div
                              key={product.id}
                              className="col-md-6 col-lg-3 col-xl-3"
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
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div id="tab-3" className="tab-pane fade show p-0">
              {
                <div id="tab-3" className="tab-pane fade show p-0">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="row g-4">
                        {sampleFruitProducts
                          .filter((p) => p.category === "Makeup")
                          .map((product) => (
                            <div
                              key={product.id}
                              className="col-md-6 col-lg-3 col-xl-3"
                            >
                              <ProductCard {...product} />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div id="tab-4" className="tab-pane fade show p-0">
              {
                <div id="tab-4" className="tab-pane fade show p-0">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="row g-4">
                        {sampleFruitProducts
                          .filter((p) => p.category === "Body & Hair")
                          .map((product) => (
                            <div
                              key={product.id}
                              className="col-md-6 col-lg-3 col-xl-3"
                            >
                              <ProductCard {...product} />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div id="tab-5" className="tab-pane fade show p-0">
              {
                <div id="tab-5" className="tab-pane fade show p-0">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="row g-4">
                        {sampleFruitProducts
                          .filter((p) => p.category === "Mask")
                          .map((product) => (
                            <div
                              key={product.id}
                              className="col-md-6 col-lg-3 col-xl-3"
                            >
                              <ProductCard {...product} />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlummiShop;
