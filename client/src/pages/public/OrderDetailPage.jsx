import React, { } from "react";
import { useParams, Link } from "react-router-dom";
import PageBannerHeader from "../../components/shared/PageBannerHeader";

const OrderDetailPage = () => {
    const { id } = useParams()
    const user_Id = 113
    // dữ liệu giả, thực tế sẽ lấy từ db
    const orderDetail = {
        id: id,
        day: "10/11/2025",
        time: "10:28",
        address: "21 Nguyễn Hữu Thọ, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh",
        amount: 400000,
        discount: 10000,
        shipping_Fee: 15000,
        total_Amount: 405000
    }
    return (
        <>
            <PageBannerHeader title="Order detail" />

            <div className="bg-white rounded-3 shadow-lg p-4 my-5 mx-auto col-12 col-md-8">

                {/* Header: Quay lại | Chi tiết đơn hàng */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                    {/* Quay lại */}
                    <Link to="#" className="d-flex align-items-center text-decoration-none text-primary">
                        <i className="fa fa-solid fa-arrow-left me-2 small" />
                        Back
                    </Link>

                    {/* Tiêu đề chính */}
                    <h5 className="mb-0 fw-semibold text-dark">
                        Order detail <span className="fw-bold">#{id}</span>
                    </h5>
                </div>

                <hr className="mt-0 mb-4" />

                {/* Main Content (Row với 2 cột) */}
                <div className="row">

                    {/* Left Column: Thông tin đơn hàng và Địa chỉ (col-md-7) */}
                    {/* Sử dụng border-end để tạo đường kẻ dọc trên màn hình md trở lên */}
                    <div className="col-12 col-md-7 pe-md-4 border-end">

                        {/* Thông tin Mã đơn hàng & Ngày đặt */}
                        <div className="mb-4">
                            <p className="mb-0 fw-bold">
                                Order id: <span className="fw-bold">#{id}</span>
                            </p>
                            <p className="text-secondary small mb-3">Order day: {orderDetail.day}, {orderDetail.time}</p>
                        </div>

                        {/* Địa chỉ nhận hàng */}
                        <div className="mb-4">
                            <h5 className="fw-semibold">Delivery address</h5>
                            <p className="text-success fw-bold">{orderDetail.address}</p>
                        </div>

                    </div>

                    {/* Right Column: Bảng tóm tắt (col-md-5) */}
                    <div className="col-12 col-md-5 ps-md-4">

                        <div className="d-flex justify-content-end mb-3">
                            <div className="bg-success-subtle rounded-circle" style={{ width: '15px', height: '15px' }}></div>
                        </div>

                        {/* Các dòng tóm tắt */}
                        <div className="d-flex justify-content-between py-2">
                            <span className="text-secondary">Amount</span>
                            <span>{orderDetail.amount} đ</span>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                            <span className="text-secondary">Discount</span>
                            <span>{orderDetail.discount} đ</span>
                        </div>
                        <div className="d-flex justify-content-between py-2 border-bottom mb-2">
                            <span className="text-secondary">Shipping fee</span>
                            <span>{orderDetail.shipping_Fee} đ</span>
                        </div>

                        <div className="d-flex justify-content-between pt-2">
                            <span className="fw-semibold text-secondary">Total amount</span>
                            <span className="fs-5 fw-bold">{orderDetail.total_Amount} đ</span>
                        </div>

                    </div>
                </div>

                <div className="col-12 mt-4 pt-3 d-flex justify-content-end px-3 px-md-5">
                    {/* user_Id sẽ được lấy từ session */}
                    <Link to={`/order-history/${user_Id}`} className="btn border border-secondary rounded-pill py-2 text-primary w-md-auto">
                        Continue to order history
                    </Link>
                </div>
            </div>

        </>
    )
}

export default OrderDetailPage