const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/sequelize");
const movieRoutes = require("./routes/movie");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", movieRoutes);
app.use("/uploads", express.static("uploads"));

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
