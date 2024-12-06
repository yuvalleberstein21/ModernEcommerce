import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="product/:id" element={<SingleProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
