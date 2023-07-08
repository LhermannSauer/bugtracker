import express from "express";
import path from "path";
import "dotenv/config";

import { router as indexRouter } from "./routes/index";
import { router as bugsRouter } from "./routes/bugs";
import { AppDataSource } from "./typeorm.config";

const app = express();

AppDataSource.initialize()
  .then(async (c) => {
    await c.query(`
                    USE bugtracker_dev;
                    `);

    console.log("connected to db");
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/bugs", bugsRouter);

const port = process.env.PORT ?? 3000;
const server = app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});

module.exports = server;
