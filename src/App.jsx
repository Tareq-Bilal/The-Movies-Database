import { useState, useRef } from 'react';
import Home from './pages/HomePage';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import SearchingPage from './pages/SearchPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import TrendingList from './components/SearchTrendingList/TrendingList';

function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTrendingList, setShowTrendingList] = useState(false);
  const searchBarRef = useRef(null);

  const handleSearchClick = () => {
    setShowTrendingList(true);
  };

  return (
    <BrowserRouter>
      <Navbar onSearchClick={handleSearchClick} />

      <SearchBar
        ref={searchBarRef}
        onSearch={setQuery}
        isLoading={isLoading}
        onFocus={() => setShowTrendingList(true)}
        onEnter={() => setShowTrendingList(false)}
      />

      <TrendingList
        query={query}
        onLoadingChange={setIsLoading}
        show={showTrendingList}
        onHide={() => setShowTrendingList(false)}
        searchBarRef={searchBarRef}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchingPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
