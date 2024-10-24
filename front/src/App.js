import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import SuperheroDetail from "./SuperheroDetail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/superhero/:id" element={<SuperheroDetail />} />
    </Routes>
  </Router>
);

export default App;
