import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Bug } from "./Bug.entity";
import { IProject } from "../interfaces/IProject";
import { IBug } from "../interfaces/IBug";
import { User } from "./User.entity";
import { IUser } from "../interfaces/IUser";

@Entity({ name: "projects" })
export class Project implements IProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.project)
  manager: IUser;

  @OneToMany(() => Bug, (bug) => bug.project)
  bugs: IBug[];
}
