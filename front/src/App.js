import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SuperheroDetail from './components/SuperheroDetail';
import CreateSuperhero from './components/CreateSuperhero';
import EditSuperhero from './components/EditSuperhero';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/superhero/:id" element={<SuperheroDetail />} />
      <Route path="/create" element={<CreateSuperhero />} />
      <Route path="/edit/:id" element={<EditSuperhero />} />
    </Routes>
  </Router>
);

export default App;
