import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import Loader from '../../components/shared/Loader';
import AddressModal from '../../components/shared/AddressModal';

AddressModal.propTypes = { isOpen: PropTypes.bool, onClose: PropTypes.func, onSave: PropTypes.func };

const AuthStyles = () => {
  const COLOR_PRIMARY = "#81c408";
  const COLOR_SECONDARY = "#FFB524";

  return (
    <style>{`
            @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

            .auth-wrapper * { box-sizing: border-box; }
            .auth-wrapper {
                background: #f6f5f7; display: flex; justify-content: center;
                align-items: center; flex-direction: column; font-family: 'Montserrat', sans-serif;
                height: 100vh; margin: 0; position: relative; z-index: 100;
            }

            .auth-wrapper .form-container h1 { font-weight: bold; margin: 0; color: #000; }
            .auth-wrapper .form-container p {
                font-size: 14px; font-weight: 100; line-height: 20px;
                letter-spacing: 0.5px; margin: 20px 0 30px;
            }
            .auth-wrapper .overlay-panel h1, .auth-wrapper .overlay-panel p { color: #FFFFFF; }

            .auth-wrapper a {
                color: ${COLOR_SECONDARY}; font-size: 14px; text-decoration: none; margin: 15px 0; transition: color 0.3s ease;
            }
            
            .auth-wrapper button {
                border-radius: 20px; border: 1px solid ${COLOR_PRIMARY}; background-color: ${COLOR_PRIMARY};
                color: #FFFFFF; font-size: 12px; font-weight: bold; padding: 12px 45px;
                letter-spacing: 1px; text-transform: uppercase; transition: transform 80ms ease-in, background-color 0.3s ease;
                cursor: pointer;
            }
            .auth-wrapper button:active { transform: scale(0.95); }
            .auth-wrapper button:focus { outline: none; }
            .auth-wrapper button.ghost { 
                background-color: transparent; border-color: #FFFFFF; color: #FFFFFF; border: 2px solid #FFFFFF;
            }
            .auth-wrapper button:not(.ghost):hover { background-color: #6e9b06; border-color: #6e9b06; }
            
            .auth-wrapper form {
                background-color: #FFFFFF; display: flex; align-items: center; justify-content: center;
                flex-direction: column; padding: 0 50px; height: 100%; text-align: center;
            }
            
            .auth-wrapper input {
                background-color: #eee; border: none; padding: 12px 15px; margin: 8px 0; width: 100%; border-radius: 8px;
            }
            
            .auth-wrapper .container {
                background-color: #fff; border-radius: 10px;
                box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                position: relative; overflow: hidden; width: 768px; max-width: 100%; min-height: 480px;
            }
            
            .auth-wrapper .form-container { position: absolute; top: 0; height: 100%; transition: all 0.6s ease-in-out; }
            .auth-wrapper .sign-in-container { left: 0; width: 50%; z-index: 2; }
            .auth-wrapper .container.right-panel-active .sign-in-container { transform: translateX(100%); }
            .auth-wrapper .sign-up-container { left: 0; width: 50%; opacity: 0; z-index: 1; }
            .auth-wrapper .container.right-panel-active .sign-up-container { 
                transform: translateX(100%); opacity: 1; z-index: 5; animation: auth-show 0.6s; 
            }
            @keyframes auth-show {
                0%, 49.99% { opacity: 0; z-index: 1; }
                50%, 100% { opacity: 1; z-index: 5; }
            }
            
            .auth-wrapper .overlay-container {
                position: absolute; top: 0; left: 50%; width: 50%; height: 100%; overflow: hidden;
                transition: transform 0.6s ease-in-out; z-index: 100;
            }
            .auth-wrapper .container.right-panel-active .overlay-container{ transform: translateX(-100%); }
            
            .auth-wrapper .overlay {
                background: ${COLOR_PRIMARY};
                background: linear-gradient(to right, ${COLOR_SECONDARY}, ${COLOR_PRIMARY});
                background-repeat: no-repeat; background-size: cover; background-position: 0 0;
                color: #FFFFFF; position: relative; left: -100%; height: 100%; width: 200%;
                transform: translateX(0); transition: transform 0.6s ease-in-out;
            }
            .auth-wrapper .container.right-panel-active .overlay { transform: translateX(50%); }
            
            .auth-wrapper .overlay-panel {
                position: absolute; display: flex; align-items: center; justify-content: center;
                flex-direction: column; padding: 0 40px; text-align: center; top: 0; height: 100%;
                width: 50%; transform: translateX(0); transition: transform 0.6s ease-in-out;
            }
            .auth-wrapper .overlay-left { transform: translateX(-20%); }
            .auth-wrapper .container.right-panel-active .overlay-left { transform: translateX(0); }
            .auth-wrapper .overlay-right { right: 0; transform: translateX(0); }
            .auth-wrapper .container.right-panel-active .overlay-right { transform: translateX(20%); }
            
            .auth-wrapper .social-container { margin: 20px 0; }
            .auth-wrapper .social-container a {
                border: 1px solid #DDDDDD; border-radius: 50%; display: inline-flex; 
                justify-content: center; align-items: center; margin: 0 5px; height: 40px; width: 40px;
                transition: border-color 0.3s;
            }
            .auth-wrapper .social-container a:hover { border-color: #FFB524; }
            .auth-wrapper .container {
            width: 1200px;
            min-height: 600px;
            }
            @media(max-width: 1400px) {
            .auth-wrapper .container {
                width: 700px;
            }
            }
            @media(max-width: 768px) {
            .auth-wrapper .container {
                width: 100%;
                min-height: 100vh;
                border-radius: 0;
            }
            }

        `}</style>
  );
};

const AuthPage = () => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [error, setError] = useState(null);
  // 1. Thêm state loading
  const [isLoading, setIsLoading] = useState(false); 
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      navigate("/account");
      return;
    }

    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("auth_token", tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
      alert("Đăng nhập Google thành công!");
      navigate("/account");
    }
  }, [location, navigate]);

  const [signUpData, setSignUpData] = useState({
    customer_name: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const [signInData, setSignInData] = useState({ email: "", password: "" });

  const handleSignUpClick = () => {
    setIsPanelActive(true);
    setError(null);
  };
  const handleSignInClick = () => {
    setIsPanelActive(false);
    setError(null);
  };

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  const handleAddressSave = (address) => {
    const { street, ward, district, province } = address;
    const formattedAddress = [street, ward, district, province]
      .filter(Boolean)
      .join(", ");
    setSignUpData((prev) => ({ ...prev, address: formattedAddress }));
    closeAddressModal();
  };

  const handleSignupChange = (e) => {
    setSignUpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginChange = (e) => {
    setSignInData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ĐĂNG KÝ
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    
    // 2. Bật loading
    setIsLoading(true); 

    const { customer_name, phone_number, email, address } = signUpData;

    if (!customer_name || !phone_number || !email || !address) {
      setIsLoading(false);
      return setError("Vui lòng điền đầy đủ thông tin.");
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        throw new Error(
          `Lỗi Server (${response.status}): Không nhận được JSON.`
        );
      }

      if (data.success) {
        alert("Đăng ký thành công! Mật khẩu đã gửi về email.");
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
          navigate("/account");
        } else {
          handleSignInClick();
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Lỗi Đăng ký:", err);
      setError(`Đăng ký thất bại: ${err.message}`);
    } finally {
        // 3. Tắt loading dù thành công hay thất bại
        setIsLoading(false); 
    }
  };

  // ĐĂNG NHẬP
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    
    // 2. Bật loading
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        throw new Error(`Lỗi kết nối (${response.status}). Kiểm tra Proxy.`);
      }

      if (data.success) {
        localStorage.setItem("auth_token", data.token);
        navigate("/account"); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(`Login failed: ${err.message}`);
    } finally {
        // 3. Tắt loading
        setIsLoading(false); 
    }
  };

  const containerClassName = `container ${
    isPanelActive ? "right-panel-active" : ""
  }`;

  return (
    <div className="auth-wrapper">
      <AuthStyles />

      {/* 4. Hiển thị Loader nếu đang loading */}
      {isLoading && <Loader />}

      <div className={containerClassName} id="container">
        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create an account</h1>
            <div className="social-container">
              <a
                href="http://localhost:3000/api/auth/google"
                className="social"
                title="Sign up with Google"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your email to sign up</span>
            <input
              type="text"
              placeholder="Fullname"
              name="customer_name"
              value={signUpData.customer_name}
              onChange={handleSignupChange}
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              name="phone_number"
              value={signUpData.phone_number}
              onChange={handleSignupChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signUpData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              type="text"
              placeholder="Address"
              onFocus={openAddressModal}
              value={signUpData.address}
              readOnly
              required
            />
            {error && isPanelActive && (
              <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
            )}
            <button style={{ marginTop: "12px" }} type="submit">
              Register
            </button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Login</h1>
            <div className="social-container">
              <a
                href="http://localhost:3000/api/auth/google"
                className="social"
                title="Login with Google"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use the account</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signInData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={signInData.password}
              onChange={handleLoginChange}
              required
            />
            <a href="#">Forgot password?</a>
            {error && !isPanelActive && (
              <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
            )}
            <button type="submit">Login</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome to comeback!</h1>
              <p>
                To stay connected, please log in with your personal information
              </p>
              <button
                className="ghost"
                id="signIn"
                type="button"
                onClick={handleSignInClick}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello!</h1>
              <p>
                Please enter your information to connect with us and enjoy more
                😜
              </p>
              <button
                className="ghost"
                id="signUp"
                type="button"
                onClick={handleSignUpClick}
              >
                Register
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