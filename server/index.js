const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const usersRoute = require("./routers/users.routes");
const servicesRoute = require("./routers/services.route");
const projectsRoute = require("./routers/projects.routes");
const clientsRoute = require("./routers/clients.routes");

const port = process.env.SERVER_PORT || 8000;
const app = express();
app.use(cors());

// log every api call and write it on access.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream })); // log every api call and write it on access.log
app.use(express.json()); // this middleware is used to parse the incoming json data

app.use("/users", usersRoute);
app.use("/services", servicesRoute);
app.use("/projects", projectsRoute);
app.use("/clients", clientsRoute);

app.get("/", (req, res) => {
  res.send("Not allowed");
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});
