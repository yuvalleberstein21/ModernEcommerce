import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import SingleProduct from './pages/SingleProduct';
import AllProducts from './pages/AllProducts';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import CreateProductForm from './components/CreateProductForm';
import NotFound from './pages/NotFound';
import PrivateRoute from './configs/PrivateRoute';
import { useState } from 'react';
import Login from './pages/Login';
import Shipping from './pages/Shipping';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <BrowserRouter>
      <Navbar />
      {isModalOpen && <Login onClose={closeModal} />}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="product/:productId" element={<SingleProduct />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="admin/createProduct" element={<CreateProductForm />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute openModal={openModal}>
              <CheckOut />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <PrivateRoute openModal={openModal}>
              <Shipping />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
