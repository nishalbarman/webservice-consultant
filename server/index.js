const express = require("express");

const port = process.env.SERVER_PORT || 8000;
const app = express();

app.listen(port, () => {
  console.log("App is running on port " + port);
});
