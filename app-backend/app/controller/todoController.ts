import { Request, Response } from "express"
import { todoCase } from "../use-case/todoCase"
import { ITodos } from "../types/interfaces";

export const todoController = {
  list: async (req: Request, res: Response) => {
    const todos = await todoCase.executeList()
    res.status(200).json(todos)
  },
  create: async (req: Request, res: Response) => {
    const data: ITodos = req.body[0]
    const createdTodo = await todoCase.executeCreate(data)
    res.status(201).json(createdTodo)
  },
  update: async (req: Request, res: Response) => {
    const data: ITodos = req.body[0]
    console.log(data)
    const createdTodo = await todoCase.executeUpdate(data)
    res.status(200).json(createdTodo)
  },
  delete: async (req: Request, res: Response) => {
    const data: string = req.params.id
    const createdTodo = await todoCase.executeDelete(data)
    res.status(200).json(createdTodo)
  },

}