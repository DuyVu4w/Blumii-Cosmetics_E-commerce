import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ imgSrc, category, name, description, price }) => {

  const truncateWords = (str, numWords) => {
    if (!str) return "";
    const words = str.split(" ");
    if (words.length <= numWords) return str;
    return words.slice(0, numWords).join(" ") + "...";
  };

  return (
    <div className="rounded position-relative fruite-item h-100 product-card-fixed">

      <div className="fruite-img product-card-img">
        <img src={imgSrc} className="img-fluid w-100 rounded-top" alt={name} />
      </div>

      <div
        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
        style={{ top: "10px", left: "10px" }}
      >
        {category}
      </div>
      <div className="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column">
        <Link to="/shop-detail">
          <h4 className="h5 fw-bold text-dark mb-2" title={name}>
            {truncateWords(name, 5)}
          </h4>
        </Link>
        <p className="text-muted mb-3" style={{ fontSize: '14px', minHeight: '42px' }} title={description}>
          {truncateWords(description, 15)}
        </p>
        <div className="d-flex justify-content-between flex-lg-wrap mt-auto">
          <p className="text-dark fs-5 fw-bold mb-0">{price}</p>
          <button
            className="btn border border-secondary rounded-pill px-3 text-primary"
            onClick={() => console.log(`Added ${name} to cart`)}
          >
            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  imgSrc: "img/eyemask.jpg",
  category: "Category",
  name: "Product Name",
  description: "Description not available.",
  price: "$0.00 / kg",
};

export default ProductCard;
