import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useCartStore } from "../../store/useCartStore"; // Import store

const ProductCard = ({ id, imgSrc, category, name, description, price }) => {
  // Lấy hàm addToCart từ store
  const addToCart = useCartStore((state) => state.addToCart);

  const displayImage = Array.isArray(imgSrc) ? imgSrc[0] : imgSrc;

  // Tạo đối tượng product từ các props truyền vào
  const productData = {
    id,
    imgSrc: displayImage, // Lưu ảnh đã xử lý vào giỏ
    category,
    name,
    description,
    price 
  };

  // Hàm xử lý thêm vào giỏ
  const handleAddToCart = (e) => {
    // Ngăn chặn sự kiện click lan truyền (nếu thẻ cha là Link)
    if(e) e.preventDefault(); 
    
    //Gọ hàm từ store (mặc định số lượng là 1 khi bấm từ trang danh sách)
    addToCart(productData, 1); 
    
    alert("Đã thêm thành công!"); 
  };

  const truncateWords = (str, numWords) => {
    if (!str) return "";
    const words = str.split(" ");
    if (words.length <= numWords) return str;
    return words.slice(0, numWords).join(" ") + "...";
  };

  return (
    <div className="rounded position-relative fruite-item h-100">
      <div className="fruite-img">
        <Link to={`/shop-detail/${id}`}>
          <img
            src={displayImage}
            className="img-fluid w-100 rounded-top"
            alt={name}
            style={{ height: '250px', objectFit: 'cover', width: '100%' }}
            onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=No+Image'; }}
          />
        </Link>
      </div>
      <div
        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
        style={{ top: "10px", left: "10px" }}
      >
        {category}
      </div>
      <div className="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column fruite-item-bottom">
        <Link to={`/shop-detail/${id}`} className="text-decoration-none">
           <h4 className="h5 fw-bold text-dark mb-2 hover-primary" title={name}>
             {truncateWords(name, 5)}
           </h4>
        </Link>
        
        <p className="text-muted mb-3" style={{ fontSize: '14px', minHeight: '42px' }} title={description}>
          {truncateWords(description, 15)}
        </p>
        
        <div className="d-flex justify-content-between flex-lg-wrap mt-auto">
          {/* Hiển thị giá (Nếu price là số thì format, nếu string thì giữ nguyên) */}
          <p className="text-dark fs-5 fw-bold mb-0">
             {typeof price === 'number' ? `${price} đ` : price }
          </p>
          
          {/* 4. Gắn sự kiện onClick vào handleAddToCart */}
          <button
            className="btn border border-secondary rounded-pill px-3 text-primary"
            onClick={handleAddToCart} 
          >
            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID có thể là số hoặc chuỗi
  imgSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // Ảnh có thể là chuỗi hoặc mảng
  category: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

ProductCard.defaultProps = {
  imgSrc: "img/eyemask.jpg",
  category: "Category",
  description: "Description not available.",
  price: 0,
};

export default ProductCard;