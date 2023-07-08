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

@Entity({ name: "Bugs" })
export class Bug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column({ nullable: true })
  dueDate?: Date;

  @Column({ nullable: true })
  dateCompleted?: Date;

  @ManyToOne(() => Priority)
  priority: Priority;

  @ManyToOne(() => Status)
  status: Status;

  @ManyToOne(() => Project, (project) => project.bugs)
  project: Project;

  // TO BE REPLACED WITH USER CLASSES
  @Column({ nullable: true })
  assignedDeveloper?: string;

  @Column({ nullable: true })
  tester?: string;
}
