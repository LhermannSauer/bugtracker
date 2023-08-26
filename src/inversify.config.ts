import "reflect-metadata";
import { Container } from "inversify";
import { BugsService } from "./services/Bugs.service";
import { BugsController } from "./controllers/Bugs.controller";
import { IBugsService } from "./interfaces/IBugsService";
import { IBugsController } from "./interfaces/IBugsController";
import TYPES from "./types";
import { Repository } from "typeorm";
import { Bug } from "./entities/Bug.entity";
import { bugRepository } from "./repositories/Bugs.repo";

export const container = new Container();
container.bind<IBugsService>(TYPES.IBugsService).to(BugsService);
container.bind<IBugsController>(TYPES.IBugsController).to(BugsController);
container
  .bind<Repository<Bug>>(TYPES.BugRepository)
  .toConstantValue(bugRepository);
