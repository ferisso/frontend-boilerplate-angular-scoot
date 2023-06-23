import { prisma } from "../prisma";
import { todoRepository } from "../repository/todoRepository"
import { CustomError } from "../service/CustomError";
import { ITodos } from "../types/interfaces"


export const todoCase = {
  executeList: async () => {
    return await todoRepository.list()
  },
  executeCreate: async (data: ITodos) => {
    const priorityEnum = [
      'HIGH',
      'MEDIUM',
      'LOW'
    ];

    console.log(data.due)

    if (data.due) {
      data.due = new Date(data.due)
    }

    if (!data.name) {
      throw CustomError({ msg: 'A todo should have a name', status: 400 })
    }

    if (!priorityEnum.includes(data.priority.toUpperCase())) {
      throw CustomError({ msg: 'Priority should be HIGH, MEDIUM, LOW', status: 400 })
    }

    return await todoRepository.create(data)
  },
  executeUpdate: async (data: ITodos) => {
    if (!data.id) {
      throw CustomError({ msg: 'The id of the todo is necessary', status: 400 })
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: data.id
      }
    });

    if (!todo) {
      throw CustomError({ msg: 'This particular todo does not exists', status: 400 })
    }

    if (data.due) {
      data.due = new Date(data.due)
    }

    if (data.priority) {
      const priorityEnum = [
        'HIGH',
        'MEDIUM',
        'LOW'
      ];

      if (!priorityEnum.includes(data.priority.toUpperCase())) {
        throw CustomError({ msg: 'Priority should be HIGH, MEDIUM, LOW', status: 400 })
      }
    }
    return await todoRepository.update(data)
  },
  executeDelete: async (id: string) => {
    if (!id) {
      throw CustomError({ msg: 'The id of the todo is necessary', status: 400 })
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: id
      }
    });

    if (!todo) {
      throw CustomError({ msg: 'This particular todo does not exists', status: 400 })
    }

    return await todoRepository.delete(id)
  }
}