import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // 1. Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Hook chuyển trang
  
  // State
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [keyword, setKeyword] = useState("");

  // Toggle Navbar
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  // Modal handlers
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (keyword.trim()) {
      // Đóng modal trước
      closeSearchModal(); 
      // Chuyển hướng sang trang shop hoặc search result kèm query param
      // Ví dụ: /shop?search=lipstick
      navigate(`/shop?search=${encodeURIComponent(keyword)}`); 
      setKeyword(""); // Reset từ khóa nếu muốn
    }
  };

  // 3. Xử lý khi nhấn phím Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Classes logic
  const navbarClasses = `collapse navbar-collapse bg-white ${isNavbarOpen ? "show" : ""}`;
  const topbarClasses = `container topbar bg-primary ${isScrolled ? "topbar-hidden" : ""}`;
  const getNavLinkClass = ({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`;

  return (
    <>
      {/* Topbar Start */}
      <div className={topbarClasses}>
        <div className="d-flex justify-content-between">
          <div className="top-info ps-2">
            <small className="me-3">
              <i className="fas fa-map-marker-alt me-2 text-secondary"></i>{" "}
              <Link to="/" className="text-white">
                19 Nguyen Huu Tho, Tan Hung, District 7
              </Link>
            </small>
            <small className="me-3">
              <i className="fas fa-envelope me-2 text-secondary"></i>
              <Link to="/" className="text-white">
                blummiofficial@gmail.com
              </Link>
            </small>
          </div>
          <div className="top-link pe-2">
            <Link to="/" className="text-white">
              <small className="text-white mx-2">Privacy Policy</small>/
            </Link>
            <Link to="/" className="text-white">
              <small className="text-white mx-2">Terms of Use</small>/
            </Link>
            <Link to="/" className="text-white">
              <small className="text-white ms-2">Sales and Refunds</small>
            </Link>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <Link to="/" className="navbar-brand">
            <h1 className="text-primary display-6">BLUMMI COSMETICS</h1>
          </Link>

          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="fa fa-bars text-primary"></span>
          </button>

          <div className={navbarClasses} id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <NavLink to="/" end className={getNavLinkClass}>Home</NavLink>
              <NavLink to="/shop" className={getNavLinkClass}>Shop</NavLink>

              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Brand</a>
                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                  <Link to="/cart" className="dropdown-item">Romand</Link>
                  <Link to="/checkout" className="dropdown-item">3CE</Link>
                  <Link to="/testimonial" className="dropdown-item">Torriden</Link>
                  <Link to="/404" className="dropdown-item">Maybelline</Link>
                  <Link to="/404" className="dropdown-item">Innisfree</Link>
                </div>
              </div>
              <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
            </div>
            <div className="d-flex m-3 me-0">
              <button
                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                onClick={openSearchModal}
              >
                <i className="fas fa-search text-primary"></i>
              </button>
              <Link to="/cart" className="position-relative me-4 my-auto">
                <i className="fa fa-shopping-bag fa-2x"></i>
                <span
                  className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                  style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}
                >
                  3
                </span>
              </Link>
              <Link to="/auth" className="my-auto">
                <i className="fas fa-user fa-2x"></i>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {/* Navbar End */}

      {/* Modal Search Start */}
      {isSearchModalOpen && (
        <div
          className="modal fade show"
          id="searchModal"
          tabIndex="-1" 
          aria-labelledby="exampleModalLabel"
          aria-modal="true"
          role="dialog"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1055
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearchModal();
          }}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeSearchModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control p-3"
                    placeholder="keywords"
                    autoFocus
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown} // Thêm sự kiện nhấn Enter
                  />
                  {/* Thêm onClick vào icon search để tìm kiếm */}
                  <span 
                    id="search-icon-1" 
                    className="input-group-text p-3" 
                    style={{cursor: 'pointer'}}
                    onClick={handleSearch} 
                  >
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Search End */}
    </>
  );
};

export default Header;