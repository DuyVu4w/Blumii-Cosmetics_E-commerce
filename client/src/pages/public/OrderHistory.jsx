import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageBannerHeader from "../../components/shared/PageBannerHeader";
import OrderListCard from "../../components/shared/OrderListCard";

// Danh sách các trạng thái để lọc 
const ORDER_STATUSES = [
    { key: 'all', label: 'All' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'success', label: 'Success' },
    { key: 'cancelled', label: 'Cancelled' },
];

// Dữ liệu đơn hàng giả định chi tiết
const mockOrderDetails = {
    // Đơn hàng 1: Thành công
    113: { 
        date: "15/11/2025", 
        status: "success", 
        products: [
            { productId: 1, quantity: 2 }, // 2 x 150,000 = 300,000
            { productId: 3, quantity: 1 }  // 1 x 80,000 = 80,000
        ],
        total: 380000 
    },
    
    // Đơn hàng 2: Đang vận chuyển
    204: { 
        date: "10/11/2025", 
        status: "shipping", 
        products: [
            { productId: 2, quantity: 1 } // 1 x 1,200,000
        ],
        total: 1200000 
    },
    
    // Đơn hàng 3: Đã hủy
    465: { 
        date: "01/11/2025", 
        status: "cancelled", 
        products: [
            { productId: 1, quantity: 5 }, // 5 x 150,000 = 750,000
            { productId: 4, quantity: 2 }  // 2 x 50,000 = 100,000
        ],
        total: 850000 
    },
    
    // Đơn hàng 4: Đang xử lý
    501: { 
        date: "05/11/2025", 
        status: "processing", 
        products: [
            { productId: 4, quantity: 3 } // 3 x 50,000
        ],
        total: 150000 
    }, 
};


const OrderHistoryPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('all');

    const OrderHistoryList = {
        user_Id: id,
        order_Id: [
            { id: 113, status: 'success' },
            { id: 204, status: 'shipping' }, 
            { id: 465, status: 'cancelled' },
            { id: 501, status: 'processing' }, 
        ]
    }

    const filteredOrders = OrderHistoryList.order_Id.filter(order => {
        if (activeTab === 'all') {
            return true;
        }
        return order.status === activeTab;
    });

    const handleTabChange = (key) => {
        setActiveTab(key);
    };


    return (
        <>
            <PageBannerHeader title="Order History"/>
            
            <div className="col-sm-12 col-md-8 card mx-auto my-5 p-4">
                
                <h5 className="mb-3 fw-bold">My orders</h5>

                {/*TAB FILTER BAR */}
                <div 
                    className="d-flex justify-content-center border-bottom position-relative pt-2 pb-2 px-2 mb-4 mx-auto"
                    style={{ overflowX: 'auto', flexWrap: 'nowrap' }}
                >
                    {ORDER_STATUSES.map((status) => {
                        const isActive = activeTab === status.key;
                        
                        const tabClasses = `
                            btn btn-sm border-0 bg-white me-4 
                            ${isActive ? 'text-primary fw-bold' : 'text-dark fw-semibold'}
                            ${isActive ? 'active-tab' : ''} 
                        `;

                        return (
                            <button
                                key={status.key}
                                className={tabClasses}
                                onClick={() => handleTabChange(status.key)}
                                style={{ padding: '0 0.5rem', whiteSpace: 'nowrap' }}
                            >
                                {status.label}
                            </button>
                        );
                    })}

                </div>

                
                {/*ORDER LIST */}
                <div className="order-list-area">
                    {filteredOrders.length === 0 ? (
                        <div className="alert alert-info text-center mt-3">
                            No orders found under this status.
                        </div>
                    ) : (
                        filteredOrders.map(order => {
                            const detail = mockOrderDetails[order.id] || {};
                            
                            // Tính tổng số lượng sản phẩm (items)
                            const totalItems = detail.products 
                                ? detail.products.reduce((sum, p) => sum + p.quantity, 0) 
                                : 0;
                            
                            // Gói dữ liệu đầy đủ để truyền vào OrderListCard
                            const fullOrderData = {
                                ...detail, 
                                id: order.id, 
                                status: order.status, 
                                items: totalItems, // Thêm trường items đã tính toán
                            };

                            return <OrderListCard key={order.id} order={fullOrderData} />;
                        })
                    )}
                </div>
                {/* === END ORDER LIST === */}

            </div>
        </>
    )
}

export default OrderHistoryPage;