const mongoose = require("mongoose");
const express = require("express");
const router = require("./routers/cardRouter");
const app = express();
const port = 3000;
mongoose
  .connect("mongodb://localhost:27017/toDoList")
  .then(() => console.log("Connect Success!"));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
