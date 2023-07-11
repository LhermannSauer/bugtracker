import { Container } from "inversify";
import { BugsService } from "./services/Bugs.service";
import { bugsRepository } from "./repositories/Bugs.repo";
import { BugsController } from "./controllers/Bugs.controllers";

export const container = new Container();
container.bind<BugsService>("BugsService").to(BugsService);
// const bugsService = container.resolve(BugsService);
// container.bind<BugsService>("BugsService").toConstantValue(bugsService);
container.bind<BugsController>(BugsController).toSelf();

container
  .bind<typeof bugsRepository>("BugsRepository")
  .toConstantValue(bugsRepository);
