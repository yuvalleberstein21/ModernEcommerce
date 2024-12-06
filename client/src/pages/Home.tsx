import HeroSection from '../components/Home/HeroSection';
import HeroSection2 from '../components/Home/HeroSection2';
import Products from '../components/Home/Products';
import Categories from './Categories';

const Home = () => {
  return (
    <>
      <div className="relative z-10 text-white">
        <HeroSection />
      </div>
      <div className="container h-full">
        <Categories />
      </div>
      <HeroSection2 />
      <div className="container h-full">
        <Products />
      </div>
    </>
  );
};

export default Home;
