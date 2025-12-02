import React from "react";

const Services = () => {
  return (
    <div className="container-fluid service py-5">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <a href="#">
              <div className="service-item bg-secondary rounded border border-secondary">
                <img
                  src="img/suaruamat.jpg"
                  className="img-fluid rounded-top w-100"
                  alt=""
                />
                <div className="px-4 rounded-bottom">
                  <div className="service-content bg-primary text-center p-4 rounded">
                    <h5 className="text-white">Facial Cleansing Gel</h5>
                    <h3 className="mb-0">Sale 20%</h3>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-md-6 col-lg-4">
            <a href="#">
              <div className="service-item bg-dark rounded border border-dark">
                <img
                  src="img/kemchongnang.jpg"
                  className="img-fluid rounded-top w-100"
                  alt=""
                />
                <div className="px-4 rounded-bottom">
                  <div className="service-content bg-light text-center p-4 rounded">
                    <h5 className="text-primary">Sunscreen</h5>
                    <h3 className="mb-0">Free delivery</h3>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-md-6 col-lg-4">
            <a href="#">
              <div className="service-item bg-primary rounded border border-primary">
                <img
                  src="img/serum1.jpg"
                  className="img-fluid rounded-top w-100"
                  alt=""
                />
                <div className="px-4 rounded-bottom">
                  <div className="service-content bg-secondary text-center p-4 rounded">
                    <h5 className="text-white">Moisturizing serum</h5>
                    <h3 className="mb-0">Discount 15K</h3>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
