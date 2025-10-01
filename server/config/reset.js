import dotenv from './dotenv.js';        // Load .env first
import { pool } from './database.js';    // Use pool after env variables are loaded
import eventData from '../data/events.js'; // Your event data

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        eventName VARCHAR(255) NOT NULL,
        ticketPrice NUMERIC(10, 2) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        artists TEXT[] NOT NULL,
        venue VARCHAR(255) NOT NULL,
        dateTime TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 events table created successfully');
  } catch (err) {
    console.error('⚠️ error creating events table', err);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: 'INSERT INTO events (eventName, ticketPrice, genre, image, artists, venue, dateTime) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [
        event.eventName,
        event.ticketPrice,
        event.genre,
        event.image,
        event.artists,
        event.venue,
        event.dateTime,
      ],
    };

    pool.query(insertQuery, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting event', err);
        return;
      }

      console.log(`✅ ${event.eventName} added successfully`);
    });
  });
};

seedEventsTable();
