import {
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";

import { ProjectDTO } from "./Project.dto";
import { PriorityDTO } from "./Priority.dto";
import { StatusDTO } from "./Status.dto";

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
  @IsObject()
  priority: PriorityDTO;

  @IsNotEmpty()
  @ValidateNested()
  status: StatusDTO;

  @IsNotEmpty()
  @ValidateNested()
  project: ProjectDTO;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  assignedDeveloper?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  tester?: string;
}
