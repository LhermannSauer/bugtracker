import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  isInt,
} from "class-validator";

import { IPriority } from "../interfaces/IPriority";
import { IStatus } from "../interfaces/IStatus";
import { IProject } from "../interfaces/IProject";

export class BugDTO {
  @IsNotEmpty()
  @Length(10, 255)
  title: string;

  @IsNotEmpty()
  @Length(10, 5000)
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsDateString()
  dateCompleted?: Date;

  @IsNotEmpty()
  priority: IPriority;

  @IsNotEmpty()
  status: IStatus;

  @IsNotEmpty()
  project: IProject;

  @IsOptional()
  assignedDeveloper?: string;

  @IsOptional()
  tester?: string;
}
