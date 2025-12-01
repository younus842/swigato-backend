const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "your-secret-key"; // replace with env variable

// ------------------- SIGNUP -------------------
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // check email already exists
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
    if (row) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      function (err) {
        if (err) return res.status(500).json({ message: "Error creating user" });

        return res.json({ message: "Signup successful" });
      }
    );
  });
});

// ------------------- LOGIN -------------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ message: "Login successful", token });
  });
});

module.exports = router;
