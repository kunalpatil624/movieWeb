import React from 'react'
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import HeroSaction from '../comonent/HeroSaction';
import TrendingShow from '../comonent/TrendingShow';
import Trailers from '../comonent/Trailers';

const Home = () => {
  return (
    <div className='w-full'>
     <HeroSaction/>
     <TrendingShow/>
     <Trailers/>
    </div>
  );
}


export default Home