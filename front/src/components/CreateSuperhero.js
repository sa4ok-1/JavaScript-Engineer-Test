import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperheroForm from './SuperheroForm';

const CreateSuperhero = () => {
  const navigate = useNavigate();

  const handleSubmit = (newSuperhero) => {
    const formData = new FormData();
    Object.keys(newSuperhero).forEach(key => {
      if (key === 'images') {
        newSuperhero.images.forEach((file, index) => {
          formData.append(`images`, file);
        });
      } else {
        formData.append(key, newSuperhero[key]);
      }
    });

    axios.post('/api/superheroes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h1>Create Superhero</h1>
      <SuperheroForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateSuperhero;
