import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import OurEssence from '../components/OurEssence';
import WhoWeAre from '../components/WhoWeAre';
import ColombiaTeaser from '../components/ColombiaTeaser';
import CuratedHighlights from '../components/CuratedHighlights';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <OurEssence />
      <WhoWeAre />
      <ColombiaTeaser />
      <CuratedHighlights />
      <Footer />
    </div>
  );
};

export default HomePage;
