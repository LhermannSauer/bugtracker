import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bug } from "./Bug.entity";

@Entity({ name: "projects" })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  manager?: string; // to be switched to User class when implemented

  @OneToMany(() => Bug, (bug) => bug.project)
  bugs: Bug[];
}
