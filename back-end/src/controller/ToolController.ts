import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import Tool from '../entity/Tool';

export default class ToolController {
  static index = async (request: Request, response: Response) => {
    const toolRepository = getRepository(Tool);
    const skip: any = (request.query.skip as any) || 0;
    const search: any = (request.query.search as any) || '';
    const searchTagsOnly: any = request.query.searchTagsOnly === 'true';

    const tools = await toolRepository.findAndCount({
      order: { id: 'DESC' },
      where: searchTagsOnly
        ? `array_to_string(tags, ', ') LIKE '%${search}%'`
        : `title LIKE ' % ${search} % '
            OR description LIKE '%${search}%' 
            OR link LIKE '%${search}%' 
            OR array_to_string(tags, ', ') LIKE '%${search}%'`,
      skip,
      take: 2,
    });
    response.send(tools);
  };

  static async store(request: Request, response: Response) {
    const toolRepository = getRepository(Tool);
    const newTool = toolRepository.create(request.body);
    validateOrReject(newTool).catch((errors) => {
      response.status(400).send(errors);
    });
    const tool = await toolRepository
      .save(newTool)
      .catch((e) => response.status(400).send(e));
    response.send(tool);
  }

  static async update(request: Request, response: Response) {
    const toolRepository = getRepository(Tool);
    const toolToUpdate = await toolRepository.findOne(request.params.id);
    const tool = toolRepository.merge(toolToUpdate, request.body);
    validateOrReject(tool).catch((errors) => {
      response.status(400).send(errors);
    });
    await toolRepository.save(tool).catch((e) => response.status(400).send(e));
    response.send(tool);
  }

  static async delete(request: Request, response: Response) {
    const toolRepository = getRepository(Tool);
    const toolToRemove = await toolRepository.findOne(request.params.id);
    const tool = await toolRepository.remove(toolToRemove);
    tool.id = parseInt(request.params.id, 10);
    response.send(tool);
  }
}
