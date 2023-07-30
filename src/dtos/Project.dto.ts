import { IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { BugDTO } from "./Bug.dto";

export class ProjectDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 5000)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  manager?: string; // to be switched to User class when implemented

  @ValidateNested()
  bugs: BugDTO[];
}
