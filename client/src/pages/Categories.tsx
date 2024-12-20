import Chair1 from '../assets/chair6.png';
import Chair2 from '../assets/chairCategory2.png';
import CategoriesCards from '../components/Home/CategoriesCards';
import Title from '../components/Title';

const Categories = () => {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Category Card */}
        <div className="bg-gray-100 p-2 relative h-[260px] flex">
          {/* Image Container - Left Side */}
          <div className="w-1/2 relative">
            <img
              src={Chair1}
              alt="Chair image"
              className="absolute inset-0 w-full top-[-2rem] h-full object-cover rounded-lg"
            />
          </div>
          {/* Text Container - Right Side */}
          <div className="w-1/2 pl-10 flex flex-col justify-center space-y-6">
            <p className="text-gray-600 text-xl font-semibold" dir="ltr">
              White Minimalist
              <br />
              Combo Sofa
            </p>
          </div>
        </div>
        {/* Category Card */}
        <div className="bg-gray-100 p-2 relative h-[260px] flex" dir="rtl">
          {/* Image Container - Left Side */}
          <div className="w-1/2 relative">
            <img
              src={Chair2}
              alt="Chair image"
              className="absolute inset-0 w-full top-[-3rem] h-full object-cover rounded-lg"
            />
          </div>
          {/* Text Container - Right Side */}
          <div className="w-1/2 pl-10 flex flex-col justify-center space-y-6">
            <p className="text-gray-600 text-xl font-semibold" dir="ltr">
              Modern Stylish
              <br />
              Single Sofa
            </p>
          </div>
        </div>
      </div>
      {/* Popular Items */}
      <div className="container h-full">
        <Title title="COLLECTION" />
        <CategoriesCards />
      </div>
    </div>
  );
};

export default Categories;
