import "reflect-metadata";
import express from "express";
import "dotenv/config";

import { initMiddleware } from "./init/initMiddleware";
import { initDB } from "./init/initDB";

const app = express();

// Init
initDB();
initMiddleware(app);

const port = process.env.PORT ?? 3000;
const server = app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});

module.exports = server;
