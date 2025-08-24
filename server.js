const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (css, js, images)
app.use(express.static(__dirname));

// Route for home page
app.get(['/', '/index', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Clean URLs for section pages
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'about.html'));
});
app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'events.html'));
});
app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'team.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
