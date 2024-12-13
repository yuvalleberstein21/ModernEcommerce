import React, { useState } from 'react'; // Import your action
import { createProduct } from '../redux/actions/productActions';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const CreateProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Selector for create product state
  const { loading, error, success } = useAppSelector(
    (state: any) => state.createProduct
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price || !stock || !category || !image) {
      alert('Please fill in all fields.');
      return;
    }

    // Create productData object
    const productData = {
      name,
      description,
      price,
      stock,
      category,
    };

    console.log('Product Data:', {
      name,
      description,
      price,
      stock,
      category,
      image: image
        ? { name: image.name, size: image.size, type: image.type }
        : 'No image selected',
    });
    // Dispatch the create product action, passing productData and image separately
    dispatch(createProduct(productData, image)); // Passing productData and image to the action
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Product</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && (
        <div className="text-green-500 mb-2">Product created successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter product description"
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter stock quantity"
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter product category"
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
