import Home from './components/Home';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import SearchingPage from './pages/SearchingPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
