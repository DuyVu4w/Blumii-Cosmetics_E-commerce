import React, { useState } from "react";

const OrderSection = () => {
  // State lưu bộ lọc
  const [filter, setFilter] = useState("all");

  // Data giả lập
  const orders = [
    {
      id: "#ORD001",
      date: "02/11/2025",
      total: "450.000₫",
      address: "Tân Phong, Quận 7, TP.HCM",
      status: "processing",
    },
    {
      id: "#ORD002",
      date: "25/10/2025",
      total: "320.000₫",
      address: "ĐH Tôn Đức Thắng",
      status: "delivered",
    },
    {
      id: "#ORD003",
      date: "20/10/2025",
      total: "275.000₫",
      address: "Phường Linh Trung, Thủ Đức",
      status: "canceled",
    },
  ];

  // Lọc theo trạng thái
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <section className="section">
      <h2>Đơn hàng của tôi</h2>

      {/* Bộ lọc trạng thái */}
      <div className="order-filters">
        {["all", "processing", "delivered", "canceled"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status === "all"
              ? "Tất cả"
              : status === "processing"
              ? "Đang xử lý"
              : status === "delivered"
              ? "Đã giao"
              : "Đã hủy"}
          </button>
        ))}
      </div>

      {/* Danh sách đơn hàng */}
      <div className="order-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className={`order-card ${order.status}`}>
              <div className="order-header">
                <span>Mã đơn: {order.id}</span>
                <span className={`status ${order.status}`}>
                  {order.status === "processing"
                    ? "Đang xử lý"
                    : order.status === "delivered"
                    ? "Đã giao"
                    : "Đã hủy"}
                </span>
              </div>
              <p>
                <b>Ngày đặt:</b> {order.date}
              </p>
              <p>
                <b>Tổng tiền:</b> {order.total}
              </p>
              <p>
                <b>Địa chỉ:</b> {order.address}
              </p>
            </div>
          ))
        ) : (
          <p className="no-orders">Không có đơn hàng nào.</p>
        )}
      </div>
    </section>
  );
};

export default OrderSection;
