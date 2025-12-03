import React, { useState } from "react";
import { useEffect } from "react";

// const OrderSection = () => {
//   // State lưu bộ lọc
//   const [filter, setFilter] = useState("all");

//   // Data giả lập
//   const orders = [
//     {
//       id: "#ORD001",
//       date: "02/11/2025",
//       total: "450.000₫",
//       address: "Tân Phong, Quận 7, TP.HCM",
//       status: "processing",
//     },
//     {
//       id: "#ORD002",
//       date: "25/10/2025",
//       total: "320.000₫",
//       address: "ĐH Tôn Đức Thắng",
//       status: "delivered",
//     },
//     {
//       id: "#ORD003",
//       date: "20/10/2025",
//       total: "275.000₫",
//       address: "Phường Linh Trung, Thủ Đức",
//       status: "canceled",
//     },
//   ];

//   // Lọc theo trạng thái
//   const filteredOrders =
//     filter === "all"
//       ? orders
//       : orders.filter((order) => order.status === filter);

//   return (
//     <section className="section">
//       <h2>My Orders</h2>

//       {/* Bộ lọc trạng thái */}
//       <div className="order-filters">
//         {["all", "processing", "delivered", "canceled"].map((status) => (
//           <button
//             key={status}
//             className={`filter-btn ${filter === status ? "active" : ""}`}
//             onClick={() => setFilter(status)}
//           >
//             {status === "all"
//               ? "All"
//               : status === "processing"
//                 ? "Processing"
//                 : status === "delivered"
//                   ? "Delivered"
//                   : "Canceled"}
//           </button>
//         ))}
//       </div>

//       {/* Danh sách đơn hàng */}
//       <div className="order-list">
//         {filteredOrders.length > 0 ? (
//           filteredOrders.map((order) => (
//             <div key={order.id} className={`order-card ${order.status}`}>
//               <div className="order-header">
//                 <span>Order Code: {order.id}</span>
//                 <span className={`status ${order.status}`}>
//                   {order.status === "processing"
//                     ? "Processing"
//                     : order.status === "delivered"
//                       ? "Delivered"
//                       : "Canceled"}
//                 </span>
//               </div>
//               <p>
//                 <b>Order Date:</b> {order.date}
//               </p>
//               <p>
//                 <b>Total Amount:</b> {order.total}
//               </p>
//               <p>
//                 <b>Address:</b> {order.address}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="no-orders">Không có đơn hàng nào.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default OrderSection;



const OrderSection = () => {
  // 1. Khai báo State
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [filter, setFilter] = useState("all"); 

  // 2. Hàm gọi API lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // LƯU Ý: Đảm bảo key này khớp với key bạn lưu lúc Login
        // (Ví dụ: 'userToken', 'accessToken', hay 'auth_token')
        const token = localStorage.getItem("auth_token"); 

        if (!token) {
            setError("Bạn vui lòng đăng nhập để xem lịch sử.");
            setLoading(false);
            return;
        }

        // Gọi API (Đã sửa thành port 8080 theo code của bạn)
        const response = await fetch("http://localhost:8080/api/orders/my-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error("Không thể tải lịch sử đơn hàng");
        }

        const data = await response.json();
        setOrders(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 3. Hàm format tiền tệ (VND)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // 4. Hàm format ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // 5. Logic lọc đơn hàng
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => 
          (order.status || "").toLowerCase() === filter.toLowerCase()
        );

  // --- RENDER GIAO DIỆN ---

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="error-text">Lỗi: {error}</p>;

  return (
    <section className="section">
      <h2>Lịch sử đơn hàng</h2>

      {/* Bộ lọc trạng thái */}
      <div className="order-filters">
        {["all", "processing", "delivered", "canceled"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status === "all" ? "Tất cả" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Danh sách đơn hàng */}
      <div className="order-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className={`order-card ${order.status ? order.status.toLowerCase() : ''}`}>
              <div className="order-header">
                {/* Hiển thị 6 ký tự cuối của ID */}
                <span>Mã đơn: #{order._id ? order._id.slice(-6).toUpperCase() : 'N/A'}</span>
                
                <span className={`status ${order.status ? order.status.toLowerCase() : ''}`}>
                   {order.status || "Chưa cập nhật"}
                </span>
              </div>

              <div className="order-body">
                <p>
                  <b>Ngày đặt:</b> {formatDate(order.createdAt)}
                </p>
                <p>
                  <b>Tổng tiền:</b> <span className="price">{formatCurrency(order.totalPrice)}</span>
                </p>
                <p>
                  <b>Địa chỉ:</b> {order.shippingAddress}
                </p>
                <p>
                    <b>Sản phẩm:</b> {order.orderItems?.length || 0} món
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">Không tìm thấy đơn hàng nào.</p>
        )}
      </div>
      */}
    </div>
  );
};

export default OrderSection;