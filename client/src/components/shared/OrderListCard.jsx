import React from "react";
import { Link } from "react-router-dom";

// Dữ liệu sản phẩm (Map để tra cứu nhanh)
// dữ liệu sẽ đượclấy từ db
const PRODUCT_MAP = {
    1: { name: 'Táo', img_src: '/img/vegetable-item-1.jpg', price: 150000 },
    2: { name: 'Sữa rửa mặt', img_src: '/img/best-product-5.jpg', price: 1200000 },
    3: { name: 'Nước tẩy trang', img_src: '/img/fruite-item-4.jpg', price: 80000 },
    4: { name: 'Serum', img_src: '/img/vegetable-item-3.png', price: 50000 }
};

// Component này nhận chi tiết của MỘT đơn hàng duy nhất qua props
const OrderListCard = ({ order }) => {
    
    // lấy dữ liệu từ db thay cho dữ liệu giả

    if (!order || !order.id) {
        return null;
    }


    const { id, date, status, total, products } = order;

    // Tính tổng số lượng sản phẩm từ mảng products
    const totalItems = products ? products.reduce((sum, p) => sum + p.quantity, 0) : 0;

    // Hàm format tiền
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN') + ' đ';
    }

    // Xác định màu badge Bootstrap
    const getStatusBadgeClass = (orderStatus) => {
        switch (orderStatus) {
            case 'success':
                return 'bg-success';
            case 'cancelled':
                return 'bg-danger';
            case 'shipping':
            case 'processing':
                return 'bg-warning text-dark';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div className="card border-2 shadow-sm mb-3">
            <div className="card-body p-3">
                
                {/* 1. Header: ID, Ngày đặt, Trạng thái */}
                <div className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
                    <div>
                        <h6 className="mb-1 fw-bold">Order ID: #{id}</h6>
                        <p className="mb-0 small text-secondary">Placed on: {date || 'N/A'}</p>
                        <p className="mb-0 small text-secondary">{totalItems} item(s)</p>
                    </div>

                    <span className={`badge rounded-pill ${getStatusBadgeClass(status)}`}>
                        {status}
                    </span>
                </div>

                {/* 2. Danh sách Sản phẩm và Ảnh */}
                <div className="product-list mb-3">
                    {products && products.length > 0 ? (
                        products.map((item, index) => {
                            const productInfo = PRODUCT_MAP[item.productId];
                            if (!productInfo) return null;

                            return (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <img 
                                        // Dùng đường dẫn giả định. Thay thế bằng import hoặc đường dẫn chính xác.
                                        src={productInfo.img_src} 
                                        alt={productInfo.name} 
                                        className="img-thumbnail me-3" 
                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                                    />
                                    <div>
                                        <h6 className="mb-0 text-dark">{productInfo.name}</h6>
                                        <p className="mb-0 small text-muted">
                                            {formatCurrency(productInfo.price)} x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-muted small">No products in this order.</p>
                    )}
                </div>

                {/* 3. Footer: Tổng tiền và Nút View Detail */}
                <div className="text-end border-top pt-2 d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-secondary small me-2">Total:</span>
                        <span className="fw-bold fs-5 text-danger">{formatCurrency(total || 0)}</span>
                    </div>

                    <Link 
                        to={`/order-detail/${id}`} 
                        className="btn btn-sm btn-outline-primary"
                    >
                        View Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderListCard;