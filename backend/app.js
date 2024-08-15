const express = require("express");
const cors = require("cors");
const productrouter = require("./routes/productrouter");
const signuprouter = require("./routes/Signuprouter");
const otprouter = require("../backend/routes/Otprouter");
const reviewrouter = require("../backend/routes/reviewrouter");

const app = express();

app.use(cors({ parameterLimit: "100000", limit: "500mb" })); // Add this line to enable CORS for all routes

app.use(express.json());

app.use("/api", productrouter);
app.use("/api", signuprouter);
app.use("/api", otprouter);
app.use("/api", reviewrouter);

module.exports = app;
