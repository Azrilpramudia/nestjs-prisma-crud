import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { task } from '@prisma/client'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTask(): Promise<task[]> {
    return this.prisma.task.findMany()
  }

  async getTaskById(id: number): Promise<task> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    })
  }

  async createTask(data: task): Promise<task> {
    return this.prisma.task.create({
      data,
    })
  }

  async updateTask(id: number, data: task): Promise<task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    })
  }

  async deleteTask(id: number): Promise<task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    })
  }
}
