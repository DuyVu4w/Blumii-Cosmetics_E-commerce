import React from "react";

const OrderSection = () => {
  return (
    <div>
      <h2 className="fw-bold mb-4 pb-2 border-bottom" style={{ color: "#81c408" }}>My Orders</h2>
      
      {/* Placeholder Content */}
      <div className="text-center py-5 text-muted">
        <i className="fas fa-box-open fa-4x mb-3 text-secondary opacity-50"></i>
        <h4>No orders yet</h4>
        <p>You haven't placed any orders yet. Go to the shop and find something you like!</p>
        <a href="/shop" className="btn text-white mt-2" style={{ backgroundColor: "#81c408" }}>
            Go to Shop
        </a>
      </div>

      {/* Example Table Structure (Hidden when empty) */}
      {/* <div className="table-responsive">
        <table className="table table-hover align-middle">
            <thead className="table-light">
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#ORD-001</td>
                    <td>Dec 12, 2025</td>
                    <td><span className="badge bg-success">Completed</span></td>
                    <td>$120.00</td>
                    <td><button className="btn btn-sm btn-outline-primary">View</button></td>
                </tr>
            </tbody>
        </table>
      </div>
      */}
    </div>
  );
};

export default OrderSection;