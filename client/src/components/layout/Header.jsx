import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  // State cho Navbar (mobile) và Modal (search)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // State để theo dõi trạng thái cuộn
  const [isScrolled, setIsScrolled] = useState(false);

  // Xử lý mở/đóng Navbar (cho mobile)
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  // Xử lý Modal
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  // useEffect để lắng nghe sự kiện cuộn (scroll)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Gỡ bỏ sự kiện khi component bị unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tính toán class cho Navbar (dựa trên state isNavbarOpen)
  const navbarClasses = `collapse navbar-collapse bg-white ${
    isNavbarOpen ? "show" : ""
  }`;

  // Tính toán thuộc tính cho Modal (dựa trên state isSearchModalOpen)
  const modalStyle = isSearchModalOpen
    ? { display: "block", paddingRight: "17px" }
    : { display: "none" };
  const modalAria = isSearchModalOpen ? "true" : "false";

  // Tính toán class cho Topbar (dựa trên CSS tùy chỉnh và state isScrolled)
  const topbarClasses = `container topbar bg-primary ${
    isScrolled ? "topbar-hidden" : ""
  }`;

  // Hàm xử lý class cho NavLink (để đổi màu khi active)
  const getNavLinkClass = ({ isActive }) =>
    `nav-item nav-link ${isActive ? "active" : ""}`;

  return (
    <>
      {/* Topbar Start: Sử dụng 'topbarClasses' mới */}
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

      {/* Navbar Start: */}
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
              <NavLink to="/" end className={getNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/shop" className={getNavLinkClass}>
                Shop
              </NavLink>

              <div className="nav-item dropdown">
                {/* Sử dụng <a> cho dropdown toggle (vì Bootstrap JS gốc có thể vẫn xử lý nó)
                                    Hoặc chúng ta có thể thêm logic state riêng cho dropdown */}
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Brand
                </a>
                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                  <Link to="/cart" className="dropdown-item">
                    Romand
                  </Link>
                  <Link to="/checkout" className="dropdown-item">
                    3CE
                  </Link>
                  <Link to="/testimonial" className="dropdown-item">
                    Torriden
                  </Link>
                  <Link to="/404" className="dropdown-item">
                    Maybelline
                  </Link>
                  <Link to="/404" className="dropdown-item">
                    Innisfree
                  </Link>
                  <Link to="/404" className="dropdown-item">
                    Jullydol
                  </Link>
                </div>
              </div>
              <NavLink to="/contact" className={getNavLinkClass}>
                Contact
              </NavLink>
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
                  style={{
                    top: "-5px",
                    left: "15px",
                    height: "20px",
                    minWidth: "20px",
                  }}
                >
                  3
                </span>
              </Link>
              <Link to="/auth" className="my-auto">
                {" "}
                {/* Đổi thành /auth hoặc /login */}
                <i className="fas fa-user fa-2x"></i>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {/* Navbar End */}

      {/* Modal Search Start: */}
      <div
        className={isSearchModalOpen ? "modal fade show" : "modal fade"}
        id="searchModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={modalAria}
        style={modalStyle}
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search by keyword
              </h5>
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
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        {isSearchModalOpen && (
          <div
            className="modal-backdrop fade show"
            onClick={closeSearchModal}
          ></div>
        )}
      </div>
      {/* Modal Search End */}
    </>
  );
};

export default Header;
