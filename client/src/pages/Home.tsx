import HeroSection from '../components/Home/HeroSection';
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
    </>
  );
};

export default Home;
