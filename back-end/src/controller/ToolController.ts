import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Tool } from '../entity/Tool';

export default class ToolController {
  static index = async (request: Request, response: Response) => {
    const toolRepository = getRepository(Tool);
    const tools = await toolRepository.find();

    response.send(tools);
  };

  static async show(request: Request) {
    const toolRepository = getRepository(Tool);
    return toolRepository.findOne(request.params.id);
  }

  static async store(request: Request, response: Response) {
    const toolRepository = getRepository(Tool);
    const newTool = toolRepository.create(request.body);
    const tool = await toolRepository.save(newTool);
    response.send(tool);
  }

  static async update(request: Request) {
    const toolRepository = getRepository(Tool);
    return toolRepository.save(request.body);
  }

  static async delete(request: Request) {
    const toolRepository = getRepository(Tool);
    const userToRemove = await toolRepository.findOne(request.params.id);
    await toolRepository.remove(userToRemove);
  }
}
