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
import { Project } from "./entities/Project.entity";
import { projectRepository } from "./repositories/Projects.repo";
import { IProjectService } from "./interfaces/IProjectService";
import { ProjectService } from "./services/Project.service";
import { IProjectController } from "./interfaces/IProjecController";
import { ProjectController } from "./controllers/Project.controller";

export const container = new Container();
container.bind<IBugsService>(TYPES.IBugsService).to(BugsService);
container.bind<IBugsController>(TYPES.IBugsController).to(BugsController);
container
  .bind<Repository<Bug>>(TYPES.BugRepository)
  .toConstantValue(bugRepository);

container
  .bind<Repository<Project>>(TYPES.ProjectRepository)
  .toConstantValue(projectRepository);

container.bind<IProjectService>(TYPES.IProjectsService).to(ProjectService);
container
  .bind<IProjectController>(TYPES.IProjectController)
  .to(ProjectController);
