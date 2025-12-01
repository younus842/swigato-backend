const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
