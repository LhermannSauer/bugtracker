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
import { IBug } from "../interfaces/IBug";
import { IPriority } from "../interfaces/IPriority";
import { IStatus } from "../interfaces/IStatus";
import { IProject } from "../interfaces/IProject";
import { User } from "./User.entity";
import { IUser } from "../interfaces/IUser";

@Entity({ name: "bugs" })
export class Bug implements IBug {
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
  priority: IPriority;

  @ManyToOne(() => Status)
  status: IStatus;

  @ManyToOne(() => Project, (project) => project.bugs, { eager: true })
  project: IProject;

  @ManyToOne(() => User, (user) => user.bugsAssigned)
  assignedDeveloper?: IUser;

  @ManyToOne(() => User, (user) => user.bugsAssigned)
  tester?: IUser;
}
