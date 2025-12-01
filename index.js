const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://swigato-app-frontend.vercel.app"
];

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
