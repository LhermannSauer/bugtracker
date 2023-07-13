import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IPriority } from "../interfaces/IPriority";

@Entity({ name: "priorities" })
export class Priority implements IPriority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
