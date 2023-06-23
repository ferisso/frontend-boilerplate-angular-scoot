import express from 'express'
import { todoController } from './controller/todoController';

export const routes = express.Router();

routes.get('/todos', todoController.list)
routes.post('/todos', todoController.create)
routes.put('/todos', todoController.update)
routes.delete('/todos/:id', todoController.delete)