import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialMigration1694377325774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`


        CREATE TABLE IF NOT EXISTS bugs  (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            dateCreated DATETIME NOT NULL,
            dueDate DATETIME NULL,
            dateCompleted DATETIME NULL,
            priority_id INT NOT NULL,
            status_id INT NOT NULL,
            project_id INT NOT NULL,
            assignedDeveloper_id VARCHAR(255) NULL,
            tester_id VARCHAR(255) NULL
          );
          
        CREATE TABLE IF NOT EXISTS  priorities (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
          );
          
        CREATE TABLE IF NOT EXISTS statuses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
          );
          
        CREATE TABLE IF NOT EXISTS  projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            manager_id VARCHAR(255) NOT NULL
          );
          
        CREATE TABLE  IF NOT EXISTS users (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            project_id INT NULL
          );
          
        ALTER TABLE bugs
        ADD FOREIGN KEY (priority_id) REFERENCES priorities (id);
        
        ALTER TABLE bugs
        ADD FOREIGN KEY (status_id) REFERENCES statuses (id);
        
        ALTER TABLE bugs
        ADD FOREIGN KEY (project_id) REFERENCES projects (id);
        
        ALTER TABLE projects
        ADD FOREIGN KEY (manager_id) REFERENCES users (id);
        
        
        ALTER TABLE users
        ADD FOREIGN KEY (project_id) REFERENCES projects (id);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        drop table bugs, priorities, statuses, projects, users;
`)
    }

}
