import React, { useState } from "react";
import { Link } from "react-router-dom";
// Đảm bảo đường dẫn import đúng với cấu trúc thư mục của bạn
import PageBannerHeader from "../../components/shared/PageBannerHeader";
import { useCartStore } from "../../store/useCartStore"; 

const CartPage = () => {
  // 1. Lấy dữ liệu và hàm từ Zustand Store
  // Thay vì dùng useState(sampleCart), ta lấy trực tiếp từ store toàn cục
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
  
  const [couponCode, setCouponCode] = useState("");

  // 2. Tính toán các chi phí
  const subtotal = getCartTotal(); // Gọi hàm tính tổng từ store
  const shipping = cartItems.length > 0 ? 15000 : 0; // Phí ship cố định 
  const total = subtotal + shipping;

  return (
    <>
      <PageBannerHeader title="Cart" />
      <div className="container-fluid py-5">
        <div className="container py-5">
          
          {/* === KIỂM TRA: NẾU GIỎ HÀNG TRỐNG === */}
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-shopping-basket fa-5x text-secondary mb-4"></i>
              <h3 className="mb-4">Your cart is currently empty!</h3>
              <p className="mb-4 text-muted">Looks like you haven't made your choice yet.</p>
              <Link to="/shop" className="btn btn-primary rounded-pill px-5 py-3">
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* === BẢNG SẢN PHẨM === */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Products</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                       // Xử lý hiển thị ảnh an toàn (đề phòng API trả về mảng hoặc null)
                       const displayImage = Array.isArray(item.imgSrc) ? item.imgSrc[0] : (item.imgSrc || item.image || "img/default.jpg");

                       return (
                        <tr key={item.id}>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img
                                src={displayImage}
                                className="img-fluid me-5 rounded-circle"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                alt={item.name}
                                onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=No+Img'; }}
                              />
                            </div>
                          </th>
                          <td>
                            <p className="mb-0 mt-4 fw-bold">{item.name}</p>
                            {/* Nếu có category thì hiện thêm cho đẹp */}
                            {item.category && <small className="text-muted">{item.category}</small>}
                          </td>
                          <td>
                            <p className="mb-0 mt-4">{Number(item.price)} đ</p>
                          </td>
                          <td>
                            <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                              <div className="input-group-btn">
                                <button
                                  className="btn btn-sm btn-minus rounded-circle bg-light border"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control form-control-sm text-center border-0"
                                value={item.quantity}
                                readOnly
                              />
                              <div className="input-group-btn">
                                <button
                                  className="btn btn-sm btn-plus rounded-circle bg-light border"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="mb-0 mt-4">
                              {(item.price * item.quantity)} đ
                            </p>
                          </td>
                          <td>
                            <button
                              className="btn btn-md rounded-circle bg-light border mt-4 hover-danger"
                              onClick={() => removeFromCart(item.id)}
                              title="Remove item"
                            >
                              <i className="fa fa-times text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* === COUPON & TOTAL === */}
              <div className="row g-4 justify-content-end mt-5">
                {/* Coupon Code Section */}
                <div className="col-lg-6">
                    <div className="mt-2">
                        <input
                        type="text"
                        className="border-0 border-bottom rounded me-5 py-3 mb-4 w-75"
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                        className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                        type="button"
                        onClick={() => alert("Chức năng Coupon đang phát triển!")}
                        >
                        Apply Coupon
                        </button>
                    </div>
                </div>

                {/* Cart Total Section */}
                <div className="col-lg-6 col-xl-4">
                  <div className="bg-light rounded h-100 p-4">
                    <h3 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h3>
                    
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4">Subtotal:</h5>
                      <p className="mb-0 fw-bold">{subtotal} đ</p>
                    </div>
                    
                    <div className="d-flex justify-content-between">
                      <h5 className="mb-0 me-4">Shipping</h5>
                      <div>
                        <p className="mb-0">Flat rate: {shipping} đ</p>
                      </div>
                    </div>
                    <p className="mb-0 text-end text-muted small">Shipping to Vietnam.</p>
                    
                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between mt-3">
                      <h5 className="mb-0 ps-4 me-4 text-uppercase">Total</h5>
                      <p className="mb-0 pe-4 fs-4 fw-bold text-primary">{total} đ</p>
                    </div>
                    
                    <Link
                      to="/checkout"
                      className="btn btn-primary rounded-pill px-4 py-3 text-uppercase w-100 font-weight-bold"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;