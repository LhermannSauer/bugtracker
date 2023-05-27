import express from 'express'
import path from "path"

import {router as indexRouter} from './routes/index' 
import {router as bugsRouter} from './routes/bugs'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bugs', bugsRouter)

const server = app.listen(3000,() =>{
    console.log("Listening at port 3000...")
})

module.exports = server;


