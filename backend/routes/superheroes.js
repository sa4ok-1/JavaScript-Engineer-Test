const express = require('express');
const router = express.Router();
const Superhero = require('../models/Superhero');

// Create superhero
router.post('/superheroes', async (req, res) => {
  const newSuperhero = new Superhero(req.body);
  await newSuperhero.save();
  res.status(201).send(newSuperhero);
});

// Read all superheroes
router.get('/superheroes', async (req, res) => {
  const superheroes = await Superhero.find().limit(5).skip(req.query.page * 5);
  res.send(superheroes);
});

// Read one superhero
router.get('/superheroes/:id', async (req, res) => {
  const superhero = await Superhero.findById(req.params.id);
  res.send(superhero);
});

// Update superhero
router.put('/superheroes/:id', async (req, res) => {
  const superhero = await Superhero.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(superhero);
});

// Delete superhero
router.delete('/superheroes/:id', async (req, res) => {
  await Superhero.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
