const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/api.user.routes");
const messageRoutes = require("./routes/api.message.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(messageRoutes);

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log("Server started on PORT ", process.env.PORT);
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));
