// index.js
const express = require("express");
const app = express();
const db = require("./db"); // File untuk koneksi database

// Middleware untuk parsing body request
app.use(express.json());

// Routing
const actorRoutes = require("./routes/actor");
const filmRoutes = require("./routes/film");
const categoryRoutes = require("./routes/category");
app.use("/actor", actorRoutes);
app.use("/film", filmRoutes);
app.use("/categories", categoryRoutes);

// Port server berjalan
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
