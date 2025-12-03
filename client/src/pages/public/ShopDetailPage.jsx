import React, { useState } from "react";
import ShopSidebar from "../../components/shared/ShopSidebar.jsx";
import SwiperProduct from "../../components/shared/SwiperProduct.jsx";

const sampleVegetableProducts = [
  {
    id: "v1",
    imgSrc: "img/vegetable-item-6.jpg",
    category: "Vegetable",
    name: "Parsely",
    description: "Lorem ipsum dolor sit amet...",
    price: "$4.99 / kg",
  },
  {
    id: "v2",
    imgSrc: "img/vegetable-item-1.jpg",
    category: "Vegetable",
    name: "Parsely",
    description: "Lorem ipsum dolor sit amet...",
    price: "$4.99 / kg",
  },
  {
    id: "v3",
    imgSrc: "img/vegetable-item-3.png",
    category: "Vegetable",
    name: "Banana",
    description: "Lorem ipsum dolor sit amet...",
    price: "$7.99 / kg",
  },
  {
    id: "v4",
    imgSrc: "img/vegetable-item-4.jpg",
    category: "Vegetable",
    name: "Bell Papper",
    description: "Lorem ipsum dolor sit amet...",
    price: "$7.99 / kg",
  },
  {
    id: "v5",
    imgSrc: "img/vegetable-item-5.jpg",
    category: "Vegetable",
    name: "Potatoes",
    description: "Lorem ipsum dolor sit amet...",
    price: "$7.99 / kg",
  },
];

const ShopDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reviewText: "",
  });

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Review Submitted:", { ...formData, rating });
    setFormData({ name: "", email: "", reviewText: "" });
    setRating(0);
  };

  return (
    <>
      {/* 3. Đổi <Link> thành <a> */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">New Products</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/shop">Shop</a>
          </li>
          <li className="breadcrumb-item active text-white">New Products</li>
        </ol>
      </div>

      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <a href="#">
                      <img
                        src="img/single-item.jpg"
                        className="img-fluid rounded"
                        alt="Product"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">Broccoli</h4>
                  <p className="mb-3">Category: Skincare</p>
                  <h5 className="fw-bold mb-3">3,35 $</h5>
                  <div className="d-flex mb-4">
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p className="mb-4">
                    The generated Lorem Ipsum is therefore always free from
                    repetition injected humour, or non-characteristic words etc.
                  </p>
                  <p className="mb-4">
                    Susp endisse ultricies nisi vel quam suscipit. Sabertooth
                    peacock flounder; chain pickerel hatchetfish, pencilfish
                    snailfish
                  </p>

                  <div
                    className="input-group quantity mb-5"
                    style={{ width: "100px" }}
                  >
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-minus rounded-circle bg-light border"
                        onClick={handleDecrement}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-sm text-center border-0"
                      value={quantity}
                      style={{ backgroundColor: "transparent" }}
                      readOnly
                    />
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-plus rounded-circle bg-light border"
                        onClick={handleIncrement}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </a>
                </div>

                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button
                        className={`nav-link border-white border-bottom-0 ${
                          activeTab === "description" ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => setActiveTab("description")}
                      >
                        Description
                      </button>
                      <button
                        className={`nav-link border-white border-bottom-0 ${
                          activeTab === "reviews" ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => setActiveTab("reviews")}
                      >
                        Reviews
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div
                      className={`tab-pane ${
                        activeTab === "description" ? "active show" : ""
                      }`}
                    >
                      <p>
                        The generated Lorem Ipsum is therefore always free from
                        repetition injected humour, or non-characteristic words
                        etc. Susp endisse ultricies nisi vel quam suscipit{" "}
                      </p>
                      <p>
                        Sabertooth peacock flounder; chain pickerel hatchetfish,
                        pencilfish snailfish filefish Antarctic icefish goldeye
                        aholehole trumpetfish pilot fish airbreathing catfish,
                        electric ray sweeper.
                      </p>

                      <div className="px-2">{/* (Chi tiết bảng...) */}</div>
                    </div>
                    <div
                      className={`tab-pane ${
                        activeTab === "reviews" ? "active show" : ""
                      }`}
                    >
                      <div className="d-flex">
                        <img
                          src="img/avatar.jpg"
                          className="img-fluid rounded-circle p-3"
                          style={{ width: "100px", height: "100px" }}
                          alt=""
                        />
                        <div className="">
                          <p className="mb-2" style={{ fontSize: "14px" }}>
                            April 12, 2024
                          </p>
                          <div className="d-flex justify-content-between">
                            <h5>Jason Smith</h5>
                            {/* (Các ngôi sao đánh giá...) */}
                          </div>
                          <p>
                            The generated Lorem Ipsum is therefore always free
                            from repetition injected humour, or
                            non-characteristic words etc. Susp endisse ultricies
                            nisi vel quam suscipit{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* (Form "Leave a Reply" ... giữ nguyên) */}
                <form onSubmit={handleFormSubmit}>
                  <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          className="form-control border-0 me-4"
                          placeholder="Your Name *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="border-bottom rounded">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="form-control border-0"
                          placeholder="Your Email *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="border-bottom rounded my-4">
                        <textarea
                          name="reviewText"
                          value={formData.reviewText}
                          onChange={handleFormChange}
                          className="form-control border-0"
                          cols="30"
                          rows="8"
                          placeholder="Your Review *"
                          spellCheck="false"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex justify-content-between py-3 mb-5">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-3">Please rate:</p>
                          <div
                            className="d-flex align-items-center"
                            style={{ fontSize: "16px", cursor: "pointer" }}
                          >
                            {/* Logic render 5 ngôi sao */}
                            {[1, 2, 3, 4, 5].map((starValue) => (
                              <i
                                key={starValue}
                                className={`fa fa-star ${
                                  hoverRating >= starValue ||
                                  rating >= starValue
                                    ? "text-secondary"
                                    : "text-muted"
                                }`} // Template gốc dùng 'text-secondary' cho sao vàng
                                onMouseEnter={() => setHoverRating(starValue)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(starValue)}
                                style={{ padding: "0 2px" }}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <ShopSidebar />
          </div>

          <div className="mt-4">
            <SwiperProduct
              Title="Related products"
              products={sampleVegetableProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetailPage;
