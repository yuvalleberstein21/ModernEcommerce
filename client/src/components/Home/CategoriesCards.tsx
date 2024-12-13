// import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { categoriesList } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
// import io from 'socket.io-client';

interface Category {
  _id: string;
  category: string;
  image: string;
}
const CategoriesCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state: RootState) => state.categories
  );

  // useEffect(() => {
  //   const socket = io('http://localhost:8000'); // Adjust to your backend URL

  //   // Listen for the 'newProductAdded' event
  //   socket.on('newProductAdded', (createdProduct) => {
  //     console.log('New product added:', createdProduct);

  //     // Re-fetch categories or update the store accordingly
  //     dispatch(categoriesList()); // Trigger category refetch
  //   });

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [dispatch]);

  useEffect(() => {
    dispatch(categoriesList());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(categories)) return <p>No categories available.</p>;
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-6 mt-6">
      {categories.map((category: Category) => (
        <Link
          to={`products?category=${encodeURIComponent(
            category.category
          )}&page=1&limit=6`}
          key={category.category}
        >
          <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <div className="bg-white rounded-lg">
              <div className="relative w-full pt-[75%]">
                {' '}
                {/* Maintains 4:3 aspect ratio */}
                <img
                  src={category.image}
                  alt={category.category}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                <p className="text-lg font-semibold truncate">
                  {category.category}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesCards;
