import { BugsService } from "../../services/Bugs.service";
import { Bug } from "../../entities/Bug.entity";
import { describe, expect, test } from "@jest/globals";
import { BugDTO } from "../../dtos/Bug.dto";

//Mock the required dependencies
jest.mock("../../typeorm.config", () => ({
  AppDataSource: {
    getRepository: jest.fn(() => ({
      find: jest.fn(() => []),
      findOne: jest.fn(() => null),
      create: jest.fn((data) => data),
      merge: jest.fn(),
      save: jest.fn((data) => data),
      delete: jest.fn(() => ({ affected: 1 })),
    })),
  },
}));

describe("BugsService", () => {
  let bugsService: BugsService;

  beforeEach(async () => {
    bugsService = new BugsService();

    const bugDto: BugDTO = {
      title: "New title for a bug",
      description: "Description for a bug",
      priority: {
        id: 1,
        name: "Priority",
      },
      status: {
        id: 1,
        name: "status",
      },
      project: {
        id: 1,
        name: "project number 1",
        description: "Project description",
        bugs: [],
      },
    };
    await bugsService.createBug(bugDto);

    let bug = await bugsService.getBugs();
    console.log(bug);
  });

  it("Shoudl get a list of bugs", async () => {
    const bugs: Bug[] = await bugsService.getBugs();

    expect(bugs).toBeDefined();
  });
});
