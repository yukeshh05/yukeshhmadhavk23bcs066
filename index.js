
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const rawData = fs.readFileSync('./movies_metadata.json');
const movies = JSON.parse(rawData);

app.get('/movies', (req, res) => {
  const simplified = movies.map(({ id, title, tagline, vote_average }) => ({
    id, title, tagline, vote_average
  }));
  res.json(simplified);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
