import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import pg from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { config } from 'dotenv';
import bcrypt from "bcrypt";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saltRounds = 10;

const app = express();
const port = 4000;

app.use(cors());

config(); // Load environment variables from .env file

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '..', 'build')));


app.get('/getNotes', async (req, res) => {
  try {
    const { title } = req.query; // Destructuring the title from request query parameters
    const notes = await db.query('SELECT * FROM todolist WHERE title = $1 ORDER BY id ASC', [title]);
    res.json(notes.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'An error occurred while fetching notes.' });
  }
});

app.get('/myReviews', async (req, res) => {
  try {
    const { email } = req.query; 
    console.log("the recived email:" + email);
    const notes = await db.query('SELECT * FROM todolist WHERE user_email = $1 ORDER BY id ASC', [email]);
    res.json(notes.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'An error occurred while fetching notes.' });
  }
});


app.post('/add', async (req, res) => {
  const title = req.body.newItem.title;
  const content = req.body.newItem.content;
  const rating = req.body.newItem.rating;
  const user_email = req.body.email;
   console.log(user_email);
  try {
    const result = await db.query('INSERT INTO todolist (content, title, rating, user_email) VALUES ($1, $2, $3, $4) RETURNING *', [
      content,
      title,
      rating,
      user_email,
    ]);
    res.json({ success: true, newItem: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'An error occurred while adding a note.' });
  }
});

app.delete('/delete', async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    await db.query('DELETE FROM todolist WHERE id = $1', [id]);
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'An error occurred while deleting the note.' });
  }
});

const apiKey = process.env.OMDB_API_KEY;

app.get('/search', async (req, res) => {
  const title = req.query.title;
  console.log('Received title:', title);

  const apiUrl = 'http://www.omdbapi.com/';

  const params = {
    apikey: apiKey,
    t: title,
    r: 'json',
  };

  try {
    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from OMDB.' });
  }
});

//from here its the login and register routs

app.post("/submit", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Check if the email already exists in the database
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    res.status(200).json({ success: true, message: "User registered successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
