import { AppDataSource } from "../typeorm.config";

export function initDB() {
  AppDataSource.initialize()
    .then(async (c) => {
      await c.query(`
                        USE bugtracker_dev;
                        `);

      console.log("connected to db");
    })
    .catch((e) => console.log(e));
}
