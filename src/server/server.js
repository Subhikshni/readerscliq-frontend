// server.js
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const app = express();
const { validateToken } = require("./AuthMiddleware");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AmazingSubhi14",
  database: "readerscliq",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Routes
app.post("/signup", (req, res) => {
  const { fullname, email, username, password } = req.body;
  // Check if the username or email already exists
  connection.query(
    "SELECT * FROM userdata WHERE email = ? OR username = ?",
    [email, username],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "Email or username already exists" });
      }
      // Insert new user into the database
      connection.query(
        "INSERT INTO userdata (fullname, email, username, password) VALUES (?, ?, ?, ?)",
        [fullname, email, username, password],
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
          }
          res.json({ message: "Signup successful" });
        }
      );
    }
  );
});

// Add a new route for handling login requests
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM userdata WHERE username = ? AND password = ?",
    [username, password],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid username/password" });
      }
      res.json({ message: "Login successful", user: results[0] });
    }
  );
});

app.get("/profile2/:username", (req, res) => {
  const username = req.params.username;
  connection.query(
    "SELECT fullname, email, username FROM userdata WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ username: results[0] });
    }
  );
});

app.put("/profile2/:username/change-password", (req, res) => {
  const { username } = req.params;
  const { newPassword } = req.body;

  connection.query(
    "UPDATE userdata SET password = ? WHERE username = ?",
    [newPassword, username],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "Password changed successfully" });
    }
  );
});

app.get("/community/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM community WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Community post not found" });
      }
      res.json(results[0]);
    }
  );
});

// Endpoint to get community messages by post id
app.get("/community/messages/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM messages WHERE community_id = ?",
    [id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    }
  );
});

// Endpoint to add a message
app.post("/addmessage", (req, res) => {
  const { content, username, community_id } = req.body; // Assuming 'content' is the commentBody
  connection.query(
    "INSERT INTO messages (content, username, community_id) VALUES (?,?,?)",
    [content, username, community_id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json({
        message: "Message added successfully",
        username: req.body.username,
      });
    }
  );
});

// Endpoint to fetch all communities
app.get("/communities", (req, res) => {
  connection.query("SELECT * FROM community", (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
