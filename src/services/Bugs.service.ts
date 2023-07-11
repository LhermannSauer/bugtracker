import { Bug } from "../entities/Bug.entity";
import { BugRepository } from "../repositories/Bugs.repo";

export const getBugsService = async (): Promise<Bug[]> => {
  const bugs = await BugRepository.find({
    relations: { project: true, priority: true, status: true },
    order: {
      priority: {
        id: "ASC",
      },
      dueDate: "ASC",
    },
  });

  return bugs;
};

export const getBugByIdService = async (id: number): Promise<Bug> => {
  validateId(id);

  const bug = await BugRepository.findOne({
    where: { id: id },
    relations: { project: true, priority: true, status: true },
  });

  if (!bug) throw new Error("Not found: Bug"); // to be replaced with not found error

  return bug;
};

export const createBugService = async (
  bugDTO: Omit<Bug, "id" | "dateCreated">
): Promise<Bug> => {
  const bug = BugRepository.create(bugDTO);
  bug.dateCreated = new Date();

  return await BugRepository.save(bug);
};

export const updateBugService = async (
  id: number,
  bugDTO: Omit<Bug, "id" | "dateCreated">
): Promise<Bug> => {
  validateId(id);

  let bug = await BugRepository.preload({ ...bugDTO, id: id });

  if (!bug) throw new Error("Bug not found");

  return await BugRepository.save(bug);
};

export const deleteBugService = async (id: number) => {
  validateId(id);

  const bug = await getBugByIdService(id);

  const result = await BugRepository.remove(bug);

  return result;
};

const validateId = (id: number) => {
  if (id <= 0 || Number.isNaN(id)) throw new Error("Invalid ID"); // to be replaces with invalid request bug
};
