import React, { useEffect, useState } from "react";
import PageBannerHeader from "../../components/shared/PageBannerHeader";
import { useParams, Link } from "react-router-dom";

const OrderResultPage = () => {
    const { id } = useParams();            // lấy id từ URL
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        // gọi API thật ở đây
        // fetch(`/api/orders/${id}`)

        // Demo dữ liệu giả 
        const fakeOrder = {
            id,
            product: [
                { id: 123, quantity: 2 },
                { id: 124, quantity: 1 }
            ],
            total: 200000
        };

        setOrder(fakeOrder);
        setStatus("success");  // hoặc "fail" tùy theo API
    }, [id]);

    const isSuccess = status === "success";

    return (
        <>
            <PageBannerHeader title="Order result"/>

            <div className="bg-white rounded-3 shadow-lg p-4 my-5 mx-auto" style={{ maxWidth: "500px" }}>
                
                {/* Loading */}
                {status === "loading" && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary"></div>
                        <p className="mt-2">Đang tải dữ liệu...</p>
                    </div>
                )}

                {/* Success */}
                {status !== "loading" && (
                    <div className="text-center my-3">
                        {isSuccess ? (
                            <>
                                <h1 className="h2 fw-bold text-primary">Payment Successful!</h1>
                                <p className="lead text-secondary">Thank you for your purchase</p>
                                <hr className="my-4" />
                            </>
                        ) : (
                            <>
                                <h1 className="h2 fw-bold text-danger">Payment Failed</h1>
                                <p className="lead text-secondary">An error occurred</p>
                                <hr className="my-4" />
                            </>
                        )}
                    </div>
                )}

                {/* Order Details */}
                {isSuccess && order && (
                    <div className="card bg-light rounded-3 border-0 shadow-sm p-3 w-100">
                        <h2 className="h4 fw-semibold mb-3">Order information</h2>

                        <div className="row g-2 text-secondary">
                            <div className="col-12 d-flex justify-content-between">
                                <strong>Order id:</strong>
                                <span>{order.id}</span>
                            </div>
                        </div>

                        <hr className="my-3" />

                        {/* Buttons responsive */}
                        <div className="row g-2 pt-3 justify-content-center">
                            <div className="col-12 col-md-6">
                                <Link to="#" className="btn border border-secondary rounded-pill py-2 text-primary w-100">
                                    Order details
                                </Link>
                            </div>

                            <div className="col-12 col-md-6">
                                <Link to="/shop" className="btn border border-secondary rounded-pill py-2 text-primary w-100">
                                    Continue to shop
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderResultPage;
