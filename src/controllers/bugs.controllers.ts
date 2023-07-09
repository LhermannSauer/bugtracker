import { Bug } from "../entities/Bug.entity";
import { bugRepository } from "../repositories/bugs.repo";

const getBugs = async (): Promise<Bug[]> => {
  const bugs = await bugRepository.find({
    relations: { project: true, priority: true, status: true },
    order: {
      priority: {
        id: "ASC",
      },
    },
  });

  return bugs;
};

const getBugById = async (id: number): Promise<Bug> => {
  validateId(id);

  const bug = await bugRepository.findOne({
    where: { id: id },
    relations: { project: true, priority: true, status: true },
  });

  if (!bug) throw new Error("Not found: Bug"); // to be replaced with not found error

  return bug;
};

const createBug = async (
  bugDTO: Omit<Bug, "id" | "dateCreated">
): Promise<Bug> => {
  const bug = bugRepository.create(bugDTO);
  bug.dateCreated = new Date();

  return await bugRepository.save(bug);
};

const updateBug = async (
  id: number,
  bugDTO: Omit<Bug, "id" | "dateCreated">
): Promise<Bug> => {
  validateId(id);

  let bug = await bugRepository.preload({ ...bugDTO, id: id });

  if (!bug) throw new Error("Bug not found");
  // await bugRepository.merge(bug, bugDTO);

  return bugRepository.save(bug);
};

const deleteBug = async (id: number) => {
  validateId(id);

  const bug = await getBugById(id);

  const result = await bugRepository.remove(bug);

  return result;
};

const validateId = (id: number) => {
  if (id <= 0 || Number.isNaN(id)) throw new Error("Invalid ID"); // to be replaces with invalid request bug
};

export default {
  createBug,
  getBugs,
  getBugById,
  updateBug,
  deleteBug,
};
