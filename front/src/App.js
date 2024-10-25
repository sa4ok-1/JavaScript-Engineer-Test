import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SuperheroDetail from './components/SuperheroDetail';
import CreateSuperhero from './components/CreateSuperhero';
import EditSuperhero from './components/EditSuperhero';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/superhero/:id" element={<SuperheroDetail />} />
      <Route path="/create" element={<CreateSuperhero />} />
      <Route path="/edit/:id" element={<EditSuperhero />} />
    </Routes>
  </Router>
);

export default App;
