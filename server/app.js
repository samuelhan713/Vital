const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "*",
  method: "GET",
  //  credentials:true,
  //  optionSuccessStatus:200,
  maxAgeSeconds: 3600,
};

// EXPRESS APP SETUP
const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

module.exports = app;