import React from 'react';

import Hero from '../../components/home/Hero.jsx';
import Features from '../../components/home/Features.jsx';
import FruitsShop from '../../components/home/FruitsShop.jsx';
import Services from '../../components/home/Services.jsx';
import SwiperProduct from '../../components/shared/SwiperProduct.jsx';
import Banner from '../../components/home/Banner.jsx';
import Bestseller from '../../components/home/Bestseller.jsx';
import Facts from '../../components/home/Facts.jsx';

const sampleVegetableProducts = [
    { id: 'v1', imgSrc: 'img/vegetable-item-6.jpg', category: 'Vegetable', name: 'Parsely', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'v2', imgSrc: 'img/vegetable-item-1.jpg', category: 'Vegetable', name: 'Parsely', description: 'Lorem ipsum dolor sit amet...', price: '$4.99 / kg' },
    { id: 'v3', imgSrc: 'img/vegetable-item-3.png', category: 'Vegetable', name: 'Banana', description: 'Lorem ipsum dolor sit amet...', price: '$7.99 / kg' },
    { id: 'v4', imgSrc: 'img/vegetable-item-4.jpg', category: 'Vegetable', name: 'Bell Papper', description: 'Lorem ipsum dolor sit amet...', price: '$7.99 / kg' },
    { id: 'v5', imgSrc: 'img/vegetable-item-5.jpg', category: 'Vegetable', name: 'Potatoes', description: 'Lorem ipsum dolor sit amet...', price: '$7.99 / kg' },
];

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <FruitsShop />
      <Services />
      
      <SwiperProduct 
        Title="New Products" 
        products={sampleVegetableProducts} 
      />
      
      <Banner />
      <Bestseller />
      <Facts />
    </>
  );
};

export default HomePage;