import HeroSectionImage from '../../assets/heroImage3.jpg';
const HeroSection2 = () => {
  return (
    <div className="relative">
      <img
        src={HeroSectionImage}
        alt="Hero Section Image"
        className="w-full h-[500px] object-cover object-center"
      />
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-10"></div>
      {/* Centered Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
          FIND YOUR STYLE
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mt-2 text-center">
          Discover the latest trends and unique collections
        </p>
      </div>
    </div>
  );
};

export default HeroSection2;
