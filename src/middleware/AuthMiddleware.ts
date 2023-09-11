import { decode} from 'jsonwebtoken'
import { Request, Response } from 'express'
import { User } from '../entities/User.entity';
import {plainToClass}from 'class-transformer'

export const authMiddleware = (req:Request, res: Response, next: Function) =>{
    const token: string = req.headers['authorization'] ?? ''
    let user: User;
    
    if (!token){
        res.status(401).send("Unauthorized")
    }

    try {
        const decoded = decode(token)
        user =  plainToClass(User, decoded)
    } catch (error) {
        res.status(401).send("Unauthorized")
    }

    next()
}

export const adminMiddleware = (req:Request, res: Response, next: Function) =>{
    const token: string = req.headers['authorization'] ?? ''
    let user: User;
    
    if (!token){
        res.status(401).send("Unauthorized")
    }

    try {
        const decoded = decode(token)
        user =  plainToClass(User, decoded)
        if (user.role != "Admin") res.status(403).send("Need Admin Privileges")
    } catch (error) {
        res.status(401).send("Unauthorized")
    }

    next()
}