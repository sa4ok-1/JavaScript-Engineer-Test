const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const superheroRoutes = require('./routes/superheroes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', superheroRoutes);

mongoose.connect('mongodb+srv://sasha:09121978@cluster0.2pj8e.mongodb.net/superhero_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
