import React from 'react';

const Footer = () => {
    return (
        <>
            {/* Footer Start */}
            <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
                <div className="container py-5">
                    <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <a href="#">
                                    <h1 className="text-primary mb-0">Fruitables</h1>
                                    <p className="text-secondary mb-0">Fresh products</p>
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <div className="d-flex justify-content-end pt-3">
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                                    <a className="btn btn-outline-secondary btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Why People Like us!</h4>
                                <p className="mb-4">We’re trusted by thousands for our commitment to quality, reliability, and customer satisfaction. From seamless service to premium products, we deliver experiences that keep people coming back. Discover what makes us a favorite among our customers.</p>
                                <a href="" className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Shop Info</h4>
                                <a className="btn-link" href="">About Us</a>
                                <a className="btn-link" href="">Contact Us</a>
                                <a className="btn-link" href="">Privacy Policy</a>
                                <a className="btn-link" href="">Terms & Condition</a>
                                <a className="btn-link" href="">Return Policy</a>
                                <a className="btn-link" href="">FAQs & Help</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Account</h4>
                                <a className="btn-link" href="">My Account</a>
                                <a className="btn-link" href="">Shop details</a>
                                <a className="btn-link" href="">Shopping Cart</a>
                                <a className="btn-link" href="">Wishlist</a>
                                <a className="btn-link" href="">Order History</a>
                                <a className="btn-link" href="">International Orders</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Contact</h4>
                                <p>Address: Ton Duc Thang University</p>
                                <p>Email: tdtu@tdtu.edu.vn</p>
                                <p>Phone: 0123456789</p>
                                <p>Payment Accepted</p>
                                <img src="img/payment.png" className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}

            {/* Copyright Start */}
            <div className="container-fluid copyright bg-dark py-4">
                <div className="container">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2"></i>Cosmetics Sales</a>, All right reserved.</span>
                    </div>
                </div>
            </div>
            {/* Copyright End */}
        </>
    );
};

export default Footer;