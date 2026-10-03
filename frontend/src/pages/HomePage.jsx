import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import OurEssence from '../components/OurEssence';
import WhoWeAre from '../components/WhoWeAre';
import ColombiaTeaser from '../components/ColombiaTeaser';
import Colombia from '../components/Colombia';
import CuratedHighlights from '../components/CuratedHighlights';
import Footer from '../components/Footer';

const HomePage = () => {
  // Scroll to hash section when landing with /#colombia, /#experiences, etc.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace('#', '');
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    // Delay to let sections mount
    const t1 = setTimeout(scroll, 350);
    const t2 = setTimeout(scroll, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Hero />
      <OurEssence />
      <WhoWeAre />
      <ColombiaTeaser />
      <Colombia />
      <CuratedHighlights />
      <Footer />
    </div>
  );
};

export default HomePage;
