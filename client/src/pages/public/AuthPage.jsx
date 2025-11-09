import React, { useState } from 'react';
import AddressModal from '../../components/shared/AddressModal';

/**
 * Component chứa toàn bộ CSS.
 */
const AuthStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

        .auth-wrapper * {
            box-sizing: border-box;
        }
        
        .auth-wrapper {
            background: #f6f5f7;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-family: 'Montserrat', sans-serif;
            height: 100vh; 
            margin: 0; 
            position: relative;
            z-index: 100;
        }

        /* CSS cho <h1> và <p> trong FORM */
        .auth-wrapper .form-container h1 {
            font-weight: bold;
            margin: 0;
            color: #000; /* Màu đen cho "Sign In" / "Create Account" */
        }
        
        .auth-wrapper .form-container p {
            font-size: 14px;
            font-weight: 100;
            line-height: 20px;
            letter-spacing: 0.5px;
            margin: 20px 0 30px;
        }

        /* CSS cho <h1> và <p> trong OVERLAY */
        .auth-wrapper .overlay-panel h1 {
            font-weight: bold;
            margin: 0;
            color: #FFFFFF; /* Màu trắng cho "Hello, Friend!" */
        }

        .auth-wrapper .overlay-panel p {
            font-size: 14px;
            font-weight: 100;
            line-height: 20px;
            letter-spacing: 0.5px;
            margin: 20px 0 30px;
            color: #FFFFFF; /* Màu trắng cho chữ mô tả */
        }

        .auth-wrapper h2 {
            text-align: center;
        }
        
        .auth-wrapper span {
            font-size: 12px;
        }
        
        .auth-wrapper a {
            color: #333;
            font-size: 14px;
            text-decoration: none;
            margin: 15px 0;
        }
        
        .auth-wrapper button {
            border-radius: 20px;
            border: 1px solid #81c408;
            background-color: #81c408;
            color: #FFFFFF;
            font-size: 12px;
            font-weight: bold;
            padding: 12px 45px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: transform 80ms ease-in;
            cursor: pointer;
        }
        
        .auth-wrapper button:active {
            transform: scale(0.95);
        }
        
        .auth-wrapper button:focus {
            outline: none;
        }
        
        .auth-wrapper button.ghost {
            background-color: transparent;
            border-color: #FFFFFF;
        }
        
        .auth-wrapper form {
            background-color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 50px;
            height: 100%;
            text-align: center;
        }
        
        .auth-wrapper input {
            background-color: #eee;
            border: none;
            padding: 12px 15px;
            margin: 8px 0;
            width: 100%;
        }
        
        .auth-wrapper .container {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
                        0 10px 10px rgba(0,0,0,0.22);
            position: relative;
            overflow: hidden;
            width: 768px;
            max-width: 100%;
            min-height: 480px;
        }
        
        .auth-wrapper .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
        }
        
        .auth-wrapper .sign-in-container {
            left: 0;
            width: 50%;
            z-index: 2;
        }
        
        .auth-wrapper .container.right-panel-active .sign-in-container {
            transform: translateX(100%);
        }
        
        .auth-wrapper .sign-up-container {
            left: 0;
            width: 50%;
            opacity: 0;
            z-index: 1;
        }
        
        .auth-wrapper .container.right-panel-active .sign-up-container {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            animation: auth-show 0.6s;
        }
        
        @keyframes auth-show {
            0%, 49.99% {
                opacity: 0;
                z-index: 1;
            }
            
            50%, 100% {
                opacity: 1;
                z-index: 5;
            }
        }
        
        .auth-wrapper .overlay-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform 0.6s ease-in-out;
            z-index: 100;
        }
        
        .auth-wrapper .container.right-panel-active .overlay-container{
            transform: translateX(-100%);
        }
        
        .auth-wrapper .overlay {
            background: #81c408;
            background: -webkit-linear-gradient(to right, #81c408, #FFB524);
            background: linear-gradient(to right, #81c408, #ffbb32ff);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 0 0;
            color: #FFFFFF; /* Màu mặc định cho overlay */
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
        }
        
        .auth-wrapper .container.right-panel-active .overlay {
            transform: translateX(50%);
        }
        
        .auth-wrapper .overlay-panel {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            text-align: center;
            top: 0;
            height: 100%;
            width: 50%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
        }
        
        .auth-wrapper .overlay-left {
            transform: translateX(-20%);
        }
        
        .auth-wrapper .container.right-panel-active .overlay-left {
            transform: translateX(0);
        }
        
        .auth-wrapper .overlay-right {
            right: 0;
            transform: translateX(0);
        }
        
        .auth-wrapper .container.right-panel-active .overlay-right {
            transform: translateX(20%);
        }
        
        .auth-wrapper .social-container {
            margin: 20px 0;
        }
        
        .auth-wrapper .social-container a {
            border: 1px solid #DDDDDD;
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 5px;
            height: 40px;
            width: 40px;
        }
    `}
    </style>
);

/**
 * Component Trang Đăng nhập/Đăng ký
 */
const AuthPage = () => {
    // State cho panel trượt
    const [isPanelActive, setIsPanelActive] = useState(false);

    // State cho Modal và Địa chỉ
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [fullAddress, setFullAddress] = useState('');

    const handleSignUpClick = () => setIsPanelActive(true);
    const handleSignInClick = () => setIsPanelActive(false);

    // Hàm mở/đóng modal
    const openAddressModal = () => setIsAddressModalOpen(true);
    const closeAddressModal = () => setIsAddressModalOpen(false);

    // Hàm nhận dữ liệu từ Modal và cập nhật input
    const handleAddressSave = (address) => {
        const { street, ward, district, province } = address;
        const formattedAddress = [street, ward, district, province].filter(Boolean).join(', ');

        setFullAddress(formattedAddress);
        closeAddressModal();
    };

    const containerClassName = `container ${isPanelActive ? 'right-panel-active' : ''}`;

    return (
        <div className="auth-wrapper">
            <AuthStyles />

            <div className={containerClassName} id="container">
                {/* Sign Up Container */}
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        </div>
                        <span>or use your email for registration</span>

                        {/* 2. SỬA LẠI FORM SIGN UP */}
                        <input type="text" placeholder="Full Name" />
                        <input type="email" placeholder="Email" />

                        <input
                            type="text"
                            placeholder="Shipping Address"
                            onFocus={openAddressModal} // Mở modal khi focus (nhấn vào)
                            value={fullAddress} // Hiển thị địa chỉ đã chọn
                            readOnly // Ngăn người dùng gõ trực tiếp
                        />

                        <button style={{ marginTop: '12px' }}>Sign Up</button>
                    </form>
                </div>

                {/* Sign In Container */}
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={closeAddressModal}
                onSave={handleAddressSave}
            />
        </div>
    );
};

export default AuthPage;