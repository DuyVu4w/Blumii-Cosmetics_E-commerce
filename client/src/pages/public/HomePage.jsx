import React from 'react';

import Hero from '../../components/home/Hero.jsx';
import Features from '../../components/home/Features.jsx';
import FruitsShop from '../../components/home/FruitsShop.jsx';
import Services from '../../components/home/Services.jsx';
import VegetableShop from '../../components/home/VegetableShop.jsx';
import Banner from '../../components/home/Banner.jsx';
import Bestseller from '../../components/home/Bestseller.jsx';
import Facts from '../../components/home/Facts.jsx';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <FruitsShop />
      <Services />
      <VegetableShop />
      <Banner />
      <Bestseller />
      <Facts />
    </>
  );
};

export default HomePage;