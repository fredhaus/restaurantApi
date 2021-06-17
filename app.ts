import express from "express";
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const restaurantRouter = require("./routes/restaurants");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((error: any) => {
    console.error("Error connecting to mongo", error);
  });

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/restaurants", restaurantRouter);
app.get("/", (req, res) => res.send("Hello Express Server"));

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`
  );
});
