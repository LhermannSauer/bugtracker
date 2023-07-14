import "reflect-metadata";
import express from "express";
import path from "path";
import "dotenv/config";

import { router as indexRouter } from "./routes/Index";
import { router as bugsRouter } from "./routes/Bugs";
import { AppDataSource } from "./typeorm.config";

const app = express();

// DB
AppDataSource.initialize()
  .then(async (c) => {
    await c.query(`
                    USE bugtracker_dev;
                    `);

    console.log("connected to db");
  })
  .catch((e) => console.log(e));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/bugs", bugsRouter);

const port = process.env.PORT ?? 3000;
const server = app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});

module.exports = server;
