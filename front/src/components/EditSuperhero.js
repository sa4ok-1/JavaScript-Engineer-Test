import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperheroForm from './SuperheroForm';
import './style/SuperHero.css';

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
    const formData = new FormData();
    
    formData.append("nickname", updatedSuperhero.nickname);
    formData.append("real_name", updatedSuperhero.real_name);
    formData.append("origin_description", updatedSuperhero.origin_description);
    formData.append("superpowers", JSON.stringify(updatedSuperhero.superpowers));
    formData.append("catch_phrase", updatedSuperhero.catch_phrase);
    
    if (updatedSuperhero.images && updatedSuperhero.images.length > 0) {
      updatedSuperhero.images.forEach((file) => formData.append("images", file));
    }
    
    axios.put(`/api/superheroes/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      navigate(`/superhero/${id}`);
    })
    .catch((error) => {
      console.error("Error updating superhero:", error);
    });
  };

  if (!superhero) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Superhero</h1>
      <SuperheroForm onSubmit={handleSubmit} initialData={superhero} />
      <button onClick={() => navigate('/')}>Don't save and back to all heroes</button>
    </div>
  );
};

export default EditSuperhero;
