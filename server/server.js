import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import eventsRouter from './routes/events.js';

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Serve scripts explicitly if needed
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));

// Home route
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Musicle API</h1>');
});

// Events routes
app.use('/events', eventsRouter);

// Catch-all 404 route (must come last)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
