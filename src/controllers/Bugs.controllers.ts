import { Bug } from "../entities/Bug.entity";
import {
  createBugService,
  getBugsService,
  getBugByIdService,
  updateBugService,
  deleteBugService,
} from "../services/Bugs.service";

// ...

const getBugs = async (): Promise<Bug[]> => {
  const bugs = await getBugsService();

  return bugs;
};

const getBugById = async (id: number): Promise<Bug> => {
  const bug = await getBugByIdService(id);

  if (!bug) throw new Error("Not found: Bug");

  return bug;
};

const createBug = async (
  bugDTO: Omit<Bug, "id" | "dateCreated">
): Promise<Bug> => {
  const bug = await createBugService(bugDTO);

  return bug;
};

const updateBug = async (
  id: number,
  bugDTO: Omit<Bug, "id" | "dateCreated">
): Promise<Bug> => {
  let bug = await updateBugService(id, bugDTO);

  return bug;
};

const deleteBug = async (id: number) => {
  const bug = await getBugByIdService(id);

  const result = await deleteBugService(id);

  return result;
};

export default {
  createBug,
  getBugs,
  getBugById,
  updateBug,
  deleteBug,
};
