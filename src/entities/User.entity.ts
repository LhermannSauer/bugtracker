import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bug } from "./Bug.entity";
import { Project } from "./Project.entity";
import { IUser } from "../interfaces/IUser";

@Entity("Users")
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  profilePictureUrl?: string;

  @Column()
  role: "Tester" | "Dev" | "Manager" | "Admin";

  @OneToMany(() => Bug, (bug) => bug.assignedDeveloper)
  bugsAssigned: Bug[];

  @OneToMany(() => Bug, (bug) => bug.tester)
  bugsToTest: Bug[];

  @OneToMany(() => Project, (project) => project.manager)
  project?: Project;
}
