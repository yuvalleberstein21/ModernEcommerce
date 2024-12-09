import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductLoader: React.FC = () => {
  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton height={500} />
        <div>
          <Skeleton height={40} width="75%" />
          <Skeleton height={20} width="50%" />
          <Skeleton count={3} />
          <div className="flex space-x-4">
            <Skeleton width={100} height={40} />
            <Skeleton width={200} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoader;
