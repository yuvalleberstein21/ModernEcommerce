import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import SingleProduct from './pages/SingleProduct';
import AllProducts from './pages/AllProducts';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="product/:productId" element={<SingleProduct />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<CheckOut />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
