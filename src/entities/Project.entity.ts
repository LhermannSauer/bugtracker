import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Bug } from "./Bug.entity";
import { IProject } from "../interfaces/IProject";
import { IBug } from "../interfaces/IBug";

@Entity({ name: "projects" })
export class Project implements IProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  manager?: string; // to be switched to User class when implemented

  @OneToMany(() => Bug, (bug) => bug.project)
  bugs: IBug[];
}
