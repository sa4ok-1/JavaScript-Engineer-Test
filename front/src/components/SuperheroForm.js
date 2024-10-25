/* eslint-disable no-undef */
import React, { useState } from "react";

const SuperheroForm = ({ onSubmit, initialData = {} }) => {
  const [superhero, setSuperhero] = useState({
    nickname: initialData.nickname || "",
    real_name: initialData.real_name || "",
    origin_description: initialData.origin_description || "",
    superpowers: initialData.superpowers
      ? initialData.superpowers.join(", ")
      : "",
    catch_phrase: initialData.catch_phrase || "",
    images: initialData.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuperhero({ ...superhero, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSuperhero({ ...superhero, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...superhero,
      superpowers: superhero.superpowers.split(",").map((item) => item.trim()),
      images: superhero.images,
    });
  };

  return (
    <form className="editing-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nickname"
        value={superhero.nickname}
        onChange={handleChange}
        placeholder="Nickname"
      />
      <input
        type="text"
        name="real_name"
        value={superhero.real_name}
        onChange={handleChange}
        placeholder="Real Name"
      />
      <textarea
        name="origin_description"
        value={superhero.origin_description}
        onChange={handleChange}
        placeholder="Origin Description"
      />
      <input
        type="text"
        name="superpowers"
        value={superhero.superpowers}
        onChange={handleChange}
        placeholder="Superpowers (comma separated)"
      />
      <input
        type="text"
        name="catch_phrase"
        value={superhero.catch_phrase}
        onChange={handleChange}
        placeholder="Catch Phrase"
      />
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        name="images"
        onChange={handleFileChange}
        multiple
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default SuperheroForm;
