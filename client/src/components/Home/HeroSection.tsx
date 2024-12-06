import HeroImage from '../../assets/heroimage.jpg';
const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImage}
          alt="Hero Image Furniture"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20 bg-gradient-to-b from-gray-600 to-gray-800 z-10"></div> */}
      <div className="container absolute inset-0 flex items-center">
        <div className="w-full md:w-1/2 lg:w-1/2 text-center md:pl-10 lg:pl-10 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight">
            Discover Your New Fashion Favorite
          </h1>
          <p className="text-lg text-primary mb-6">
            We offer the latest trends, styles, and brands to help you find the
            perfect piece.
          </p>
          <button className="px-6 py-3 font-semibold text-white bg-gray-600 opacity-95 rounded-md hover:bg-gray-500 transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
