import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common'
import { TaskService } from './task.service'
import { task } from '@prisma/client'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTask() {
    return this.taskService.getAllTask()
  }

  @Post()
  createTask(@Body() data: task) {
    return this.taskService.createTask(data)
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.taskService.getTaskById(Number(id))
    if (!taskFound) throw new NotFoundException('Task does not exist')
    return taskFound
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(Number(id))
    } catch (error) {
      throw new NotFoundException('Task does not exits')
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: task) {
    try {
      return await this.taskService.updateTask(Number(id), data)
    } catch (error) {
      throw new NotFoundException('Task does not exits')
    }
  }
}
