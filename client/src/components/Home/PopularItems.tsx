import Title from '../Title';
import Chair2 from '../../assets/chairCategory2.png';
import Chair1 from '../../assets/chair6.png';
import { Heart, Plus } from 'lucide-react';

const PopularItems = () => {
  return (
    <div className="container">
      <Title title="Most Popular Items" />
      {/* categories */}
      <div className="flex justify-center gap-6 p-2 items-center text-center mt-3 cursor-pointer">
        <span className="border border-red-200 px-2">Chair</span>
        <span>Sofa</span>
        <span>Lamp</span>
        <span>Table</span>
        <span>Monitor</span>
      </div>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 grid-cols-2 gap-3 mt-6">
        <div className="card bg-gray-100 p-3 rounded-lg cursor-pointer">
          <span>
            <Heart size={20} />
          </span>
          <img
            src={Chair2}
            alt="Product Image"
            className="w-full h-60 object-cover object-center"
          />
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-800">Chair one</h2>
            <p className="text-sm text-gray-600">Product Description</p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">$99.99</span>
              <span className="px-2 py-2 bg-gray-200 rounded-full">
                <Plus size={20} />
              </span>
            </div>
          </div>
        </div>
        <div className="card bg-gray-100 p-3 rounded-lg cursor-pointer">
          <span>
            <Heart size={20} />
          </span>
          <img
            src={Chair1}
            alt="Product Image"
            className="w-full h-60 object-cover object-center"
          />
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-800">Chair one</h2>
            <p className="text-sm text-gray-600">Product Description</p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">$99.99</span>
              <span className="px-2 py-2 bg-gray-200 rounded-full">
                <Plus size={20} />
              </span>
            </div>
          </div>
        </div>
        <div className="card bg-gray-100 p-3 rounded-lg cursor-pointer">
          <img
            src={Chair2}
            alt="Product Image"
            className="w-full h-60 object-cover object-center"
          />
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-800">Chair one</h2>
            <p className="text-sm text-gray-600">Product Description</p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">$99.99</span>
              <span className="px-2 py-2 bg-gray-200 rounded-full">
                <Plus size={20} />
              </span>
            </div>
          </div>
        </div>
        <div className="card bg-gray-100 p-3 rounded-lg cursor-pointer">
          <img
            src={Chair1}
            alt="Product Image"
            className="w-full h-60 object-cover object-center"
          />
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-800">Chair one</h2>
            <p className="text-sm text-gray-600">Product Description</p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">$99.99</span>
              <span className="px-2 py-2 bg-gray-200 rounded-full">
                <Plus size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularItems;
