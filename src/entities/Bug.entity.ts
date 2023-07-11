import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Priority } from "./Priority.entity";
import { Status } from "./Status.entity";
import { Project } from "./Project.entity";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

@Entity({ name: "bugs" })
export class Bug {
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
  priority: Priority;

  @ManyToOne(() => Status)
  status: Status;

  @ManyToOne(() => Project, (project) => project.bugs, { eager: true })
  @IsNotEmpty()
  project: Project;

  // TO BE REPLACED WITH USER CLASSES
  @Column({ nullable: true })
  @IsOptional()
  assignedDeveloper?: string;

  @Column({ nullable: true })
  @IsOptional()
  tester?: string;
}
