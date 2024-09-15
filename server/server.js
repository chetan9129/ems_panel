const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const dbconfig = require("./db");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const usersRoute = require("./routes/userRoute");
const crudRoute = require("./routes/crudRoute");

app.use(express.json());
app.use("/api", usersRoute);
app.use("/api", crudRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port 5000"));
