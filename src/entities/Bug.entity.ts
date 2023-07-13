import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

import { Priority } from "./Priority.entity";
import { Status } from "./Status.entity";
import { Project } from "./Project.entity";
import { IBug } from "../interfaces/IBug";
import { IPriority } from "../interfaces/IPriority";
import { IStatus } from "../interfaces/IStatus";
import { IProject } from "../interfaces/IProject";

@Entity({ name: "bugs" })
export class Bug implements IBug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  title: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(5000)
  @MinLength(10)
  description: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateCompleted?: Date;

  @ManyToOne(() => Priority)
  @IsNotEmpty()
  priority: IPriority;

  @ManyToOne(() => Status)
  status: IStatus;

  @ManyToOne(() => Project, (project) => project.bugs, { eager: true })
  @IsNotEmpty()
  project: IProject;

  // TO BE REPLACED WITH USER CLASSES
  @Column({ nullable: true })
  @IsOptional()
  assignedDeveloper?: string;

  @Column({ nullable: true })
  @IsOptional()
  tester?: string;
}
