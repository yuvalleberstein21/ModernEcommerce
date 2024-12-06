import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './utils/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        {/* <Route path="dashboard" element={<Dashboard />}>
        <Route path="project/:id" element={<Project />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
