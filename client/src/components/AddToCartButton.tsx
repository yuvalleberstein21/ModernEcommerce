import { Plus } from 'lucide-react';
import { Product } from '../Types';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addToCart } from '../redux/actions/cartActions';

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart(
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          stock: product.stock,
        },
        1
      )
    );
  };
  return (
    <button
      title="Add To Cart"
      className="group cursor-pointer px-2 py-2 outline-none bg-gray-200 rounded-full hover:rotate-90 duration-300 mt-3"
      onClick={handleAddToCart}
    >
      <Plus className="stroke-gray-700 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
        <path strokeWidth="1.5"></path>
        <path d="M12 16V8" strokeWidth="1.5"></path>
      </Plus>
    </button>
  );
};

export default AddToCartButton;
