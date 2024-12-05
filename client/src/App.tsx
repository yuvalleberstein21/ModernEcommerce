import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        {/* <Route path="dashboard" element={<Dashboard />}>
        <Route path="project/:id" element={<Project />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
