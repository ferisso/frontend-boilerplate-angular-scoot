import { prisma } from "../prisma"
import { ITodos } from "../types/interfaces";


export const todoRepository = {
  list: async () => {
    const res = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return res;
  },
  create: async (data: ITodos) => {
    const res = await prisma.todo.create({
      data: {
        name: data.name,
        description: data.description,
        due: data.due,
        priority: data.priority,
        status: data.status
      }
    });
    return res
  },
  update: async (data: ITodos) => {
    const res = await prisma.todo.update({
      data: {
        ...data
      },
      where: {
        id: data.id
      }
    });
    return res
  },
  delete: async (id: string) => {
    const res = await prisma.todo.delete({
      where: {
        id: id,
      }
    })
    return res
  },
}