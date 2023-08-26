import { Bug } from "../../src/entities/Bug.entity";
import { BugsService } from "../../src/services/Bugs.service";
import { NotFoundError } from "../../src/common/errors";
import { Repository } from "typeorm";
import {
  bugsService,
  bugRepository,
  mockBugs,
  validateMock,
} from "./Bugs.services.test";

describe("BugsService", () => {
  beforeEach(() => {
    bugsService = new BugsService(bugRepository as any as Repository<Bug>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBugs", () => {
    it("should return mock bugs", async () => {
      bugRepository.find.mockResolvedValueOnce(mockBugs);

      const actual = await bugsService.getBugs();

      expect(actual).toEqual(mockBugs);
      expect(bugRepository.find).toBeCalledTimes(1);
      expect(bugRepository.find).toBeCalledWith({
        relations: { project: true, priority: true, status: true },
        order: {
          priority: {
            id: "ASC",
          },
          dueDate: "ASC",
        },
      });
    });
  });

  describe("getBugByID", () => {
    it("should return a bug when a valid id is passed", async () => {
      bugRepository.findOne.mockResolvedValueOnce(mockBugs[0]);

      const actual = await bugsService.getBugById(1);

      expect(actual).toEqual(mockBugs[0]);
      expect(bugRepository.findOne).toBeCalledTimes(1);
      expect(bugRepository.findOne).toBeCalledWith({
        where: { id: 1 },
        relations: { project: true, priority: true, status: true },
      });
    });

    it("should throw NotFoundError when no bug is found", () => {
      bugRepository.findOne.mockResolvedValueOnce(0);

      const shouldThrow = async () => {
        const actual = await bugsService.getBugById(1);
      };

      expect(shouldThrow).rejects.toBeInstanceOf(NotFoundError);
    });
  });

  describe("createBug", () => {
    it("should create a bug when a valid request is sent", async () => {
      validateMock.mockResolvedValueOnce([]);

      bugRepository.create.mockReturnValueOnce(mockBugs[0]);
      bugRepository.save.mockResolvedValueOnce(mockBugs[0]);

      const actual = await bugsService.createBug(mockBugs[0]);

      expect(actual).toEqual(mockBugs[0]);
      expect(bugRepository.create).toBeCalledTimes(1);
      expect(bugRepository.create).toBeCalledWith(mockBugs[0]);
      expect(bugRepository.save).toBeCalledTimes(1);
      expect(bugRepository.save).toBeCalledWith(mockBugs[0]);
      expect(validateMock).toHaveBeenCalledTimes(1);
    });

    it("should throw when an invalid request is sent", () => {
      validateMock.mockResolvedValueOnce([1, 2]);

      const shouldThrow = async () => {
        const actual = await bugsService.createBug(mockBugs[1]);
      };

      expect(shouldThrow).rejects.toBeInstanceOf(Error);
    });
  });

  describe("updateBug", () => {
    it("should update a bug with a valid request", async () => {
      bugRepository.findOne.mockResolvedValueOnce(mockBugs[0]);
      bugRepository.save.mockResolvedValueOnce(mockBugs[1]);
      validateMock.mockResolvedValueOnce([]);

      const actual = await bugsService.updateBug(1, mockBugs[1]);

      expect(actual).toEqual(mockBugs[1]);
      // expect(validateMock).toHaveBeenCalledWith(mockBugs[1]);
      expect(bugRepository.findOne).toBeCalled();
      expect(bugRepository.merge).toBeCalledWith(mockBugs[0], mockBugs[1]);
      expect(bugRepository.save).toBeCalled();
    });

    it("should throw with an invalid request", () => {
      validateMock.mockResolvedValueOnce([1]);

      const shouldThrow = async () => {
        const actual = await bugsService.updateBug(1, mockBugs[1]);
      };

      expect(shouldThrow).rejects.toBeInstanceOf(Error);
    });
  });

  describe("deleteBug", () => {
    it("should delete a bug and return true affected", () => {
      bugRepository.delete.mockResolvedValueOnce({ affected: 1 });

      const actual = await;
    });
  });
});
