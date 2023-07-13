import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IStatus } from "../interfaces/IStatus";

@Entity({ name: "statuses" })
export class Status implements IStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
