import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiUrl = "http://www.omdbapi.com/";

const saltRounds = 10;

const app = express();
const port = 4000;

app.use(cors());
config(); // Load environment variables from .env file

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: null, // Set to null for a session cookie
      httpOnly: true,
    },
  })
);

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// Passport Configuration
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const existingUser = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        if (existingUser.rows.length === 0) {
          return done(null, false, { message: "Incorrect email." });
        }

        const hashedPassword = existingUser.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, existingUser.rows[0]);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

// Use Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/getNotes", async (req, res) => {
  try {
    const { title } = req.query;
    const notes = await db.query(
      "SELECT * FROM todolist WHERE title = $1 ORDER BY id ASC",
      [title]
    );
    res.json(notes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching notes.",
    });
  }
});

app.get("/myReviews", async (req, res) => {
  try {
    const { email } = req.query;
    console.log("Request received for myReviews. Email:", email);
    const notes = await db.query(
      "SELECT * FROM todolist WHERE user_email = $1 ORDER BY id ASC",
      [email]
    );
    console.log("Retrieved notes:", notes.rows);
    res.json(notes.rows);
  } catch (err) {
    console.error("Error in myReviews route:", err);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching notes.",
    });
  }
});

app.get("/search", async (req, res) => {
  const apiKey = process.env.OMDB_API_KEY;
  try {
    const { title } = req.query;
    console.log("Received title:", title);

    const params = {
      apikey: apiKey,
      t: title,
      r: "json",
    };

    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from OMDB." });
  }
});
app.post("/add", async (req, res) => {
  console.log(req.body);
  const title = req.body.newItem?.title;
  const content = req.body.newItem?.content;
  const rating = req.body.newItem?.rating;
  const user_email = req.body?.email;
  console.log("Received request to add note. User email:", user_email);
  try {
    const result = await db.query(
      "INSERT INTO todolist (content, title, rating, user_email) VALUES ($1, $2, $3, $4) RETURNING *",
      [content, title, rating, user_email]
    );
    res.json({ success: true, newItem: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "An error occurred while adding a note.",
    });
  }
});

app.delete("/delete", async (req, res) => {
  const id = req.body.id;
  console.log("Received request to delete note. Note ID:", id);
  try {
    await db.query("DELETE FROM todolist WHERE id = $1", [id]);
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "An error occurred while deleting the note.",
    });
  }
});

app.post("/submit", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    req.session.user = { email };

    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashedPassword,
    ]);
    res
      .status(200)
      .json({ success: true, message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const hashedPassword = existingUser.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    req.session.user = { email };

    res.status(200).json({ success: true, message: "User login successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, error: "An error occurred during logout." });
    } else {
      res
        .status(200)
        .json({ success: true, message: "User logged out successfully." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
