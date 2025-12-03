import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ShopSidebar from "../../components/shared/ShopSidebar.jsx";
import SwiperProduct from "../../components/shared/SwiperProduct.jsx";
import Loader from "../../components/shared/Loader.jsx";

const ShopDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // State mới để quản lý ảnh đang hiển thị
    const [activeImage, setActiveImage] = useState("");

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({ name: "", email: "", reviewText: "" });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const resProduct = await fetch(`/api/products/${id}`);
                const dataProduct = await resProduct.json();

                if (dataProduct.success) {
                    const currentProduct = dataProduct.data;
                    setProduct(currentProduct);

                    // --- LOGIC XỬ LÝ ẢNH ---
                    // Kiểm tra xem product.image có phải mảng và có dữ liệu không
                    if (Array.isArray(currentProduct.image) && currentProduct.image.length > 0) {
                        console.log(currentProduct.image[0]);
                        setActiveImage(currentProduct.image[0]);
                    } else {
                        setActiveImage(currentProduct.imgSrc);
                    }


                    const resAll = await fetch('/api/products');
                    const dataAll = await resAll.json();

                    if (dataAll.success) {
                        const related = dataAll.data
                            .filter(p => p.category === currentProduct.category && p._id !== id)
                            .slice(0, 6);
                        setRelatedProducts(related);
                    }
                }
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
        setQuantity(1);
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Review Submitted:", { ...formData, rating });
        setFormData({ name: "", email: "", reviewText: "" });
        setRating(0);
        alert("Cảm ơn đánh giá của bạn!");
    };

    if (loading) return <Loader />;
    if (!product) return <div className="text-center py-5"><h3>Không tìm thấy sản phẩm</h3></div>;

    // Tạo danh sách ảnh để render thumbnails
    // Nếu product.image là mảng -> dùng nó, nếu không -> tạo mảng chứa imgSrc
    const productImages = Array.isArray(product.image) && product.image.length > 0
        ? product.image
        : [product.imgSrc];

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
                    <li className="breadcrumb-item active text-white">Detail</li>
                </ol>
            </div>

            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">

                                {/* --- PHẦN HIỂN THỊ ẢNH --- */}
                                <div className="col-lg-6">
                                    {/* Ảnh chính */}
                                    <div className="border rounded mb-3 d-flex justify-content-center align-items-center" style={{ overflow: 'hidden', height: '400px' }}>
                                        <a href="#">
                                            <img
                                                src={activeImage}
                                                className="img-fluid rounded"
                                                alt={product.name}
                                                style={{ maxHeight: '100%', objectFit: 'contain' }}
                                                onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
                                            />
                                        </a>
                                    </div>

                                    {/* Danh sách Thumbnails (Chỉ hiện nếu có nhiều hơn 1 ảnh) */}
                                    {productImages.length > 1 && (
                                        <div className="d-flex justify-content-center overflow-auto">
                                            {productImages.map((img, index) => (
                                                <div
                                                    key={index}
                                                    className={`border rounded me-2 p-1 ${activeImage === img ? 'border-primary' : 'border-light'}`}
                                                    style={{ cursor: 'pointer', width: '80px', height: '80px', opacity: activeImage === img ? 1 : 0.6 }}
                                                    onClick={() => setActiveImage(img)}
                                                >
                                                    <img
                                                        src={img}
                                                        className="img-fluid rounded"
                                                        alt={`Thumbnail ${index}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* --- PHẦN THÔNG TIN SẢN PHẨM --- */}
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{product.name}</h4>
                                    <p className="mb-3">Category: {product.category}</p>
                                    <h5 className="fw-bold mb-3">{formatPrice(product.price)}</h5>

                                    <div className="d-flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`fa fa-star ${i < (product.rating || 5) ? 'text-secondary' : 'text-muted'}`}></i>
                                        ))}
                                    </div>

                                    <p className="mb-4">{product.description}</p>

                                    <div className="mb-4">
                                        <p className="mb-1"><b>Brand:</b> {product.brand || "N/A"}</p>
                                        <p className="mb-1"><b>Origin:</b> {product.origin || "N/A"}</p>
                                        <p className="mb-1"><b>Main Purpose:</b> {product.mainPurpose || "N/A"}</p>
                                        <p className="mb-1"><b>Status:</b> {product.countInStock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>}</p>
                                    </div>

                                    <div className="input-group quantity mb-5" style={{ width: "100px" }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={handleDecrement}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" value={quantity} style={{ backgroundColor: "transparent" }} readOnly />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={handleIncrement}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <a href="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                    </a>
                                </div>

                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button
                                                className={`nav-link border-white border-bottom-0 ${activeTab === "description" ? "active" : ""}`}
                                                type="button"
                                                onClick={() => setActiveTab("description")}
                                            >
                                                Description
                                            </button>
                                            <button
                                                className={`nav-link border-white border-bottom-0 ${activeTab === "reviews" ? "active" : ""}`}
                                                type="button"
                                                onClick={() => setActiveTab("reviews")}
                                            >
                                                Reviews
                                            </button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className={`tab-pane ${activeTab === "description" ? "active show" : ""}`}>
                                            <p>{product.description}</p>
                                            {product.ingredients && (
                                                <div className="mt-3">
                                                    <h6>Ingredients:</h6>
                                                    <p>{product.ingredients}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`tab-pane ${activeTab === "reviews" ? "active show" : ""}`}>
                                            <div className="d-flex">
                                                <img
                                                    src="img/avatar.jpg"
                                                    className="img-fluid rounded-circle p-3"
                                                    style={{ width: "100px", height: "100px" }}
                                                    alt=""
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                                <div className="">
                                                    <p className="mb-2" style={{ fontSize: "14px" }}>April 12, 2024</p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Jason Smith</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <p>The generated Lorem Ipsum is therefore always free from repetition injected humour...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form đánh giá */}
                                <form onSubmit={handleFormSubmit}>
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="form-control border-0 me-4" placeholder="Your Name *" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="form-control border-0" placeholder="Your Email *" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea name="reviewText" value={formData.reviewText} onChange={handleFormChange} className="form-control border-0" cols="30" rows="8" placeholder="Your Review *" required></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 me-3">Please rate:</p>
                                                    <div className="d-flex align-items-center" style={{ fontSize: "16px", cursor: "pointer" }}>
                                                        {[1, 2, 3, 4, 5].map((starValue) => (
                                                            <i key={starValue} className={`fa fa-star ${hoverRating >= starValue || rating >= starValue ? "text-secondary" : "text-muted"}`} onMouseEnter={() => setHoverRating(starValue)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(starValue)} style={{ padding: "0 2px" }}></i>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn border border-secondary text-primary rounded-pill px-4 py-3">Post Comment</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <ShopSidebar />
                    </div>

                    <div className="mt-4">
                        <SwiperProduct Title="Related products" products={relatedProducts} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopDetailPage;