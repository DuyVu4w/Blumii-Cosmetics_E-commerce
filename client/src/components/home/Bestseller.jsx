import React from "react";
import RoundPhotoProductCard from "../shared/RoundPhotoProductCard.jsx";
import SquarePhotoProductCard from "../shared/SquarePhotoProductCard.jsx";

// 1. Tạo dữ liệu mẫu
const roundPhotoProducts = [
  {
    id: "b1",
    imgSrc: "img/anua.jpg",
    name: "Anua Serum",
    price: "200.000",
  },
  {
    id: "b2",
    imgSrc: "img/torriden.jpg",
    name: "Torriden Eye Cream",
    price: "340.000",
  },
  {
    id: "b3",
    imgSrc: "img/3CE.jpg",
    name: "Matte liquid lipstick 3CE",
    price: "290.000",
  },
];

const squarePhotoProducts = [
  {
    id: "s1",
    imgSrc: "img/eyemask.jpg",
    name: "Eye Mask",
    price: "350.000",
  },
  {
    id: "s2",
    imgSrc: "img/cushion.jpg",
    name: "Romand Cushion",
    price: "289.000",
  },
  {
    id: "s3",
    imgSrc: "img/fruite-item-3.jpg",
    name: "Oil Control Fluff",
    price: "169.000",
  },
  {
    id: "s4",
    imgSrc: "img/dior.jpg",
    name: "Dior Lip Balm",
    price: "900.000",
  },
];

const Bestseller = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
          <h1 className="display-4">Bestseller Products</h1>
          <p>
            Discover our most popular products, loved by customers for their
            exceptional quality and unbeatable freshness. Each item is carefully
            selected to ensure it meets the highest standards — perfect for your
            everyday needs or special occasions. Shop now and experience the
            best of what we offer.
          </p>
        </div>

        <div className="row g-4">
          {roundPhotoProducts.map((product) => (
            <div key={product.id} className="col-lg-6 col-xl-4">
              <RoundPhotoProductCard
                imgSrc={product.imgSrc}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}

          {squarePhotoProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-6 col-xl-3">
              <SquarePhotoProductCard
                imgSrc={product.imgSrc}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestseller;
