import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageBannerHeader from "../../components/shared/PageBannerHeader";

const OrderDetailPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    
    // Khai báo State
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm format tiền tệ (VND)
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount || 0);
    };

    // Hàm format ngày giờ
    const formatDate = (dateString) => {
        if (!dateString) return { day: "...", time: "..." };
        const date = new Date(dateString);
        return {
            day: date.toLocaleDateString("vi-VN"),
            time: date.toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })
        };
    };

    // Gọi API lấy chi tiết đơn hàng
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const token = localStorage.getItem("auth_token");
                if (!token) {
                    throw new Error("Bạn cần đăng nhập để xem chi tiết đơn hàng.");
                }

                const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.message || "Không tìm thấy đơn hàng");
                }

                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [id]);

    // RENDER UI
    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center" style={{ marginTop: "150px" }}>
                <div className="alert alert-danger shadow-sm" role="alert">
                    <i className="fa fa-exclamation-triangle me-2"></i>
                    {error}
                </div>
                <Link to="/account" className="btn btn-primary mt-3">
                    <i className="fa fa-arrow-left me-2"></i> Return to order list
                </Link>
            </div>
        );
    }

    if (!order) return null;

    const { day, time } = formatDate(order.createdAt);

    return (
        <>
            <PageBannerHeader title="Order detail" />

            <div className="bg-white rounded-3 shadow-lg p-4 my-5 mx-auto col-12 col-md-8">

                {/* Header: Quay lại | Chi tiết đơn hàng */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Link to="/account" className="d-flex align-items-center text-decoration-none text-primary">
                        <i className="fa fa-solid fa-arrow-left me-2 small" />
                        Back to list
                    </Link>
                    <h5 className="mb-0 fw-semibold text-dark">
                        Order detail <span className="fw-bold">#{order._id.slice(-6).toUpperCase()}</span>
                    </h5>
                </div>

                <hr className="mt-0 mb-4" />

                {/* Main Content */}
                <div className="row">

                    {/* Left Column: Thông tin đơn hàng, Địa chỉ & SẢN PHẨM */}
                    <div className="col-12 col-md-7 pe-md-4 border-end">

                        {/* Thông tin Mã đơn hàng & Ngày đặt */}
                        <div className="mb-4">
                            <p className="mb-0 fw-bold">
                                Order ID full: <span className="fw-normal text-muted small">{order._id}</span>
                            </p>
                            <p className="text-secondary small mb-3">
                                Order time: {day}, {time}
                            </p>
                            <p className="mb-0">
                                Status: <span className={`badge ${order.status === 'Delivered' ? 'bg-success' :
                                    order.status === 'Cancelled' ? 'bg-danger' : 'bg-warning text-dark'
                                }`}>{order.status}</span>
                            </p>
                        </div>

                        {/* Địa chỉ nhận hàng */}
                        <div className="mb-4">
                            <h5 className="fw-semibold">Delivery address</h5>
                            <p className="text-success fw-bold">
                                {order.shippingAddress || "No address"}
                            </p>
                        </div>

                        {/* Phương thức thanh toán */}
                        <div className="mb-4">
                            <h5 className="fw-semibold">Payment Method</h5>
                            <p className="text-dark">
                                {order.paymentMethod}
                            </p>
                        </div>

                        <hr className="my-4" />

                        {/* ---  DANH SÁCH SẢN PHẨM --- */}
                        <div className="mb-4">
                            <h5 className="fw-semibold mb-3">Products ({order.orderItems?.length || 0})</h5>
                            
                            <div className="product-list">
                                {order.orderItems && order.orderItems.map((item, index) => (
                                    <div key={index} className="card mb-3 border border-light shadow-sm">
                                        <div className="row g-0 align-items-center">
                                            {/* Ảnh sản phẩm */}
                                            <div className="col-3 col-sm-3">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="img-fluid rounded-start" 
                                                    style={{ width: "100%", height: "80px", objectFit: "cover" }}
                                                />
                                            </div>
                                            
                                            {/* Thông tin chi tiết */}
                                            <div className="col-9 col-sm-9">
                                                <div className="card-body py-2 px-3">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <div>
                                                            <h6 className="card-title mb-1 text-dark" style={{fontSize: "0.95rem"}}>
                                                                {item.name}
                                                            </h6>
                                                            <p className="card-text text-muted small mb-0">
                                                                Price: {formatCurrency(item.price)}
                                                            </p>
                                                            <p className="card-text text-muted small">
                                                                Qty: x{item.quantity}
                                                            </p>
                                                        </div>
                                                        
                                                        {/* Tổng tiền item */}
                                                        <div className="text-end">
                                                            <span className="fw-bold text-primary">
                                                                {formatCurrency(item.price * item.quantity)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* ----------------------------------------- */}

                    </div>

                    {/* bảng tóm tắt tiền */}
                    <div className="col-12 col-md-5 ps-md-4">
                        <div className="d-flex justify-content-end mb-3">
                            <div className={`rounded-circle ${order.status === 'Cancelled' ? 'bg-danger' : 'bg-success'}`}
                                style={{ width: '15px', height: '15px' }}>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between py-2">
                            <span className="text-secondary">Amount (Items)</span>
                            <span>{formatCurrency(order.itemsPrice)}</span>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                            <span className="text-secondary">Discount</span>
                            <span className="text-danger">-{formatCurrency(order.discountAmount)}</span>
                        </div>
                        <div className="d-flex justify-content-between py-2 border-bottom mb-2">
                            <span className="text-secondary">Shipping fee</span>
                            <span>{formatCurrency(order.shippingPrice)}</span>
                        </div>

                        <div className="d-flex justify-content-between pt-2">
                            <span className="fw-semibold text-secondary">Total amount</span>
                            <span className="fs-5 fw-bold text-primary">{formatCurrency(order.totalPrice)}</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-4 pt-3 d-flex justify-content-end px-3 px-md-5">
                    <Link to="/account" className="btn border border-secondary rounded-pill py-2 text-primary w-md-auto">
                        Continue to order history
                    </Link>
                </div>
            </div>
        </>
    );
};

export default OrderDetailPage;
