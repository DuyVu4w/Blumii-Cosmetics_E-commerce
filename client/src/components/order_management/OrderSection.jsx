import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSection = () => {
  // Khai báo State
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [filter, setFilter] = useState("all"); 
  // điều hướng
  const navigate = useNavigate();

  // Hàm gọi API lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // lấy token
        const token = localStorage.getItem("auth_token"); 

        if (!token) {
            setError("Please login to view purchase history.");
            setLoading(false);
            return;
        }

        const PORT = 8080 // port server
        const response = await fetch(`http://localhost:${PORT}/api/orders/my-orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // token xác thực
          },
        });

        if (!response.ok) {
          throw new Error("Can not load order history");
        }

        const data = await response.json(); // đợi data từ server (json)
        
        setOrders(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Hàm format tiền tệ (VND)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Hàm format ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // lọc đơn hàng
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => 
          (order.status || "").toLowerCase() === filter.toLowerCase()
        );

  // --- RENDER GIAO DIỆN UI

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-text">Lỗi: {error}</p>;

  return (
    <section className="section">
      <h2>Order history</h2>

      {/* Bộ lọc trạng thái */}
      <div className="order-filters">
        {["all", "processing", "delivered", "canceled"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Danh sách đơn hàng */}
      <div className="order-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className={`order-card ${order.status ? order.status.toLowerCase() : ''}` }
              onClick={() => navigate(`/order-detail/${order._id}`)}
              style={{cursor: "pointer"}}>
              <div className="order-header">
                {/* Hiển thị 6 ký tự cuối của ID */}
                <span>Order Id: #{order._id ? order._id.slice(-6).toUpperCase() : 'N/A'}</span>
                
                <span className={`status ${order.status ? order.status.toLowerCase() : ''}`}>
                   {order.status || "Chưa cập nhật"}
                </span>
              </div>

              <div className="order-body">
                <p>
                  <b>Order date:</b> {formatDate(order.createdAt)}
                </p>
                <p>
                  <b>Total Amount:</b> <span className="price">{formatCurrency(order.totalPrice)}</span>
                </p>
                <p>
                  <b>Address:</b> {order.shippingAddress}
                </p>
                <p>
                    <b>Product:</b> {order.orderItems?.length || 0} 
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">No order was found.</p>
        )}
      </div>
    </section>
  );
};

export default OrderSection;