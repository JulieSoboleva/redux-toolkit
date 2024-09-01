import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SearchForm from './pages/SearchForm';
import Favorites from './pages/Favorites';
import Others from './pages/Others';
import MovieDetails from './pages/MovieDetails';
import Header from './components/Header';
import './App.css';

export default function App() {
  return (
    <BrowserRouter basename='/redux-toolkit'>
      <Header />
      <Routes>
        <Route index path="/movies" element={<SearchForm />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="*" element={<Others />} />
      </Routes>
    </BrowserRouter>
  );
}
