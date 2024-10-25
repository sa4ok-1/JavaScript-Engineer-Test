import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style/SuperHeroDet.css";

const SuperheroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    axios.get(`/api/superheroes/${id}`).then((response) => {
      setSuperhero(response.data);
    });
  }, [id]);

  if (!superhero) return <div>Loading...</div>;

  return (
    <div>
      <h1>{superhero.nickname}</h1>
      <p>
        <strong>Real Name:</strong> {superhero.real_name}
      </p>
      <p>
        <strong>Origin:</strong> {superhero.origin_description}
      </p>
      <p>
        <strong>Superpowers:</strong> {superhero.superpowers.join(", ")}
      </p>
      <p>
        <strong>Catch Phrase:</strong> {superhero.catch_phrase}
      </p>
      <div>
        {superhero.images.map((image, index) => (
          <img
            key={index}
            src={`/${image}`}
            alt={`${superhero.nickname} ${index}`}
            width="200"
          />
        ))}
      </div>
      <button className="Back-btn" onClick={() => navigate("/")}>
        Back to all hero{" "}
      </button>
    </div>
  );
};

export default SuperheroDetail;
