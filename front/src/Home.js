import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BaseUrl = 'http://localhost:5000';

const Home = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios.get(`${BaseUrl}/api/superheroes?page=${page}`).then(response => {
      setSuperheroes(response.data);
    });
  }, [page]);

  return (
    <div>
      <h1>Superheroes</h1>
      <ul>
        {superheroes.map(hero => (
          <li key={hero._id}>
            <Link to={`/superhero/${hero._id}`}>
              <img src={hero.images[0]} alt={hero.nickname} width="100" />
              {hero.nickname}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Home;
