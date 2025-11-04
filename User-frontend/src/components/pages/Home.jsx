import React from 'react'
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import HeroSaction from '../comonent/HeroSaction';
import TrendingShow from '../comonent/TrendingShow';
import Trailers from '../comonent/Trailers';
import useGetAllMovies from '../hooks/UseGetAllMovies';
import Loading from "../comonent/Loading.jsx"
const Home = () => {
    const { loading } = useGetAllMovies();
  if (loading) return <Loading/>
  return (
    <div className='w-full'>
     <HeroSaction/>
     <TrendingShow/>
     <Trailers/>
    </div>
  );
}


export default Home