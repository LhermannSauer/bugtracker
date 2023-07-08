import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"priorities"})
export class Priority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
