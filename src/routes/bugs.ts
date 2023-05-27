import {Request, Response, NextFunction, Router } from 'express';
import { Project } from '../entities/Project.entity';
import { Bug } from '../entities/Bug.entity';
import * as _ from 'lodash'
import { Status } from '../entities/Status.entity';
import { Priority } from '../entities/Priority.entity';

const priorities: Priority[] =[
    {
        id:1,
        name:'Critical'
    }
]

const statuses: Status[] = [
    {
        id:1,
        name:'Open'
    }
]

export const router: Router = Router()

const projects: Project[] = [
    {
        id: 1,
        name: 'Bugtracker',
        description: 'A simple bugtracking app',
        manager: 'lhermann@bugtracker.com',
        bugs: []
    },    
    {
        id: 2,
        name: 'TodoList',
        description: 'Track TODO stuff',
        manager: 'lhermann@todolist.com',
        bugs: []
    }
]

const bugs: Bug[] = [
    {
        id: 1,
        title:'Bug 1',
        description:'Bug 1 description',
        priority: priorities[0],
        project: projects[0],
        status: statuses[0],
        dateCreated: new Date(),
        dueDate: new Date(Date.now() + 2)
    },
    {
        id: 2,
        title:'Bug 2',
        description:'Bug 2 description',
        priority: priorities[0],
        project: projects[1],
        status: statuses[0],
        dateCreated: new Date(),
        dueDate: new Date(Date.now() + 5)
    }
]

router.get('/', (req:Request, res: Response, next: NextFunction) =>{
    res.send(bugs)
})

router.get('/:id', (req:Request, res: Response, next: NextFunction) =>{

    const bug = bugs.find(b => b.id === +req.params.id)
    if (!bug) return res.status(404).send('Bug with the given ID not found')

    res.send(bug)
})

router.post('/', (req:Request, res: Response, next: NextFunction) =>{
    const bugDTO: Omit<Bug, 'id' | 'dateCreated'> = _.pick(
        req.body, 
        ['title',
        'description',
        'priority',
        'project',
        'status',
        'dueDate',
        'assignedDev',
        'tester'])

    const bug: Bug = {
        ...bugDTO,
        id: bugs.length,
        dateCreated: new Date()
    }

    bugs.push(bug)

    res.status(201).send(bugs[bugs.length-1])
})

router.put('/:id', (req:Request, res: Response, next: NextFunction) =>{
    const bug = bugs.find(b => b.id === +req.params.id)
    if (!bug) return res.status(404).send('bug with the given id not found')

    const bugDTO: Omit<Partial<Bug>, 'id' | 'dateCreated'> = _.pick(
        req.body, 
        ['title',
        'description',
        'priority',
        'project',
        'status',
        'dueDate',
        'assignedDev',
        'tester'])

    _.assign(bug, bugDTO)

    res.send(bug)
})

router.delete('/:id', (req:Request,res:Response,next:NextFunction) =>{
    const bug = bugs.find(b => b.id === +req.params.id)
    if (!bug) return res.status(404).send('bug with the given id not found')

    bugs.splice(bugs.indexOf(bug),1)

    res.send(bug)   
})

