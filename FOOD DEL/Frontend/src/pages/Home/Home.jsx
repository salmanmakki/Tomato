import { useState, useEffect } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import './Home.css';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = ({ searchQuery = '' }) => {
  const [category, setCategory] = useState('All');

  // Handle scroll to menu section when component mounts with a search query
  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        const menuSection = document.getElementById('explore-menu');
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Handle view menu button click
  const handleViewMenu = () => {
    setCategory('All');
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header onViewMenu={handleViewMenu} />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchQuery={searchQuery} />
      <AppDownload />
    </div>
  );
}

export default Home
