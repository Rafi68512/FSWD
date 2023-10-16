var express = require("express");
var bodyParser = require("body-parser");
var pool = require("./db/query.js");

var swaggerJSdoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");
var morgan = require("morgan");

var app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restfull API With Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));

// Require the Router
var movies = require("./routes/movies.js");
var users = require("./routes/users.js");

// Use the Routes
app.use("/movies", movies);
app.use("/users", users);

pool.connect((err, res) => {
  console.log(err);
  console.log(res);
});

app.listen(3000);
