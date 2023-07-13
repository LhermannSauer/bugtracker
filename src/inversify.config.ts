import { Container } from "inversify";
import { BugsService } from "./services/Bugs.service";
import { bugsRepository } from "./repositories/Bugs.repo";
import { BugsController } from "./controllers/Bugs.controllers";
import { IBugsService } from "./interfaces/IBugsService";
import { IBugsController } from "./interfaces/IBugsController";
import TYPES from "./types";

export const container = new Container();
container.bind<IBugsService>(TYPES.IBugsService).to(BugsService);
container.bind<IBugsController>(TYPES.IBugsController).to(BugsController);

container
  .bind<typeof bugsRepository>(TYPES.BugsRepository)
  .toConstantValue(bugsRepository);

// const bugsService = container.resolve(BugsService);
// container.bind<BugsService>("BugsService").toConstantValue(bugsService);
