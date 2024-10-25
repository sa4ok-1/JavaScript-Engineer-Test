import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperheroForm from './SuperheroForm';
import './style/SuperHero-style.css'
const EditSuperhero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    axios.get(`/api/superheroes/${id}`).then(response => {
      setSuperhero(response.data);
    });
  }, [id]);

  const handleSubmit = (updatedSuperhero) => {
    axios.put(`/api/superheroes/${id}`, updatedSuperhero)
      .then(() => {
        navigate(`/superhero/${id}`);
      });
  };

  if (!superhero) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Superhero</h1>
      <SuperheroForm onSubmit={handleSubmit} initialData={superhero} />
      <button onClick={() => navigate('/')}>Don't save and back to all hero </button>
    </div>
    
  );
};

export default EditSuperhero;
