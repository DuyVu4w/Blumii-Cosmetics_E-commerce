import React, { useState } from "react";
// import { Link } from 'react-router-dom'; // Tạm thời dùng <a>
import PropTypes from "prop-types";

const ShopSidebar = ({ showFilters }) => {
  const [priceRange, setPriceRange] = useState(0);
  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div className="col-lg-3">
      <div className="row g-4">
        {/* 1. Ô Search đã được XÓA khỏi đây */}

        <div className="col-lg-12">
          <div className="mb-3">
            <h4>Categories</h4>
            <ul className="list-unstyled fruite-categorie">
              <li>
                <div className="d-flex justify-content-between fruite-name">
                  <a href="#">
                    <i className="fas fa-apple-alt me-2"></i>Skincare
                  </a>
                  <span>(90)</span>
                </div>
              </li>
              <li>
                <div className="d-flex justify-content-between fruite-name">
                  <a href="#">
                    <i className="fas fa-apple-alt me-2"></i>Makeup
                  </a>
                  <span>(5)</span>
                </div>
              </li>
              <li>
                <div className="d-flex justify-content-between fruite-name">
                  <a href="#">
                    <i className="fas fa-apple-alt me-2"></i>Body & Hair
                  </a>
                  <span>(2)</span>
                </div>
              </li>

              <li>
                <div className="d-flex justify-content-between fruite-name">
                  <a href="#">
                    <i className="fas fa-apple-alt me-2"></i>Mask
                  </a>
                  <span>(5)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Render có điều kiện cho Price và Additional filters */}
        {showFilters && (
          <>
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
                <output id="amount" name="amount" htmlFor="rangeInput">
                  {priceRange} VND
                </output>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mb-3">
                <h4>Additional</h4>
                <div className="mb-2">
                  <input
                    type="radio"
                    className="me-2"
                    id="Categories-1"
                    name="Categories-1"
                    value="Beverages"
                  />
                  <label htmlFor="Categories-1"> Newest</label>
                </div>
                <div className="mb-2">
                  <input
                    type="radio"
                    className="me-2"
                    id="Categories-2"
                    name="Categories-1"
                    value="Beverages"
                  />
                  <label htmlFor="Categories-2"> Best Seller</label>
                </div>
                <div className="mb-2">
                  <input
                    type="radio"
                    className="me-2"
                    id="Categories-3"
                    name="Categories-1"
                    value="Beverages"
                  />
                  <label htmlFor="Categories-3"> Sales</label>
                </div>
                <div className="mb-2">
                  <input
                    type="radio"
                    className="me-2"
                    id="Categories-4"
                    name="Categories-1"
                    value="Beverages"
                  />
                  <label htmlFor="Categories-4"> Discount</label>
                </div>
              </div>
            </div>
          </>
        )}

        {/* (Phần Featured products và Banner... giữ nguyên) */}
        <div className="col-lg-12">
          <h4 className="mb-3">Featured products</h4>
          <div className="d-flex align-items-center justify-content-start">
            <div
              className="rounded me-4"
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src="img/nuoctaytrang.jpg"
                className="img-fluid rounded"
                alt=""
              />
            </div>
            <div>
              <h6 className="mb-2">Cleansing Water</h6>
              <div className="d-flex mb-2">
                <i className="fa fa-star text-secondary"></i>
                <i className="fa fa-star text-secondary"></i>
                <i className="fa fa-star text-secondary"></i>
                <i className="fa fa-star text-secondary"></i>
                <i className="fa fa-star"></i>
              </div>
              <div className="d-flex mb-2">
                <h5 className="fw-bold me-2">150.000</h5>
                <h5 className="text-danger text-decoration-line-through">
                  173.000
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-12">
          <div className="position-relative">
            <img
              src="img/banner-fruits.jpg"
              className="img-fluid w-100 rounded"
              alt=""
            />
            <div
              className="position-absolute"
              style={{
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              <h3 className="text-secondary fw-bold">
                Fresh <br /> Fruits <br /> Banner
              </h3>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

ShopSidebar.propTypes = {
  showFilters: PropTypes.bool,
};

ShopSidebar.defaultProps = {
  showFilters: false,
};

export default ShopSidebar;
