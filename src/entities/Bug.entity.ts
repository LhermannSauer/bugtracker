import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Priority } from "./Priority.entity";
import { Status } from "./Status.entity";
import { Project } from "./Project.entity";

@Entity()
export class Bug{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    @Column()
    description: string;

    @Column()
    priority: Priority;

    @Column()
    status: Status;

    @CreateDateColumn()
    dateCreated: Date;
    
    @Column()
    dueDate: Date;

    @Column()
    dateCompleted?: Date;

    @ManyToOne(() => Project, project => project.bugs)
    project: Project;

    // TO BE REPLACED WITH USER CLASSES
    @Column()
    assignedDeveloper?: string

    @Column()
    tester?: string;

    
}


