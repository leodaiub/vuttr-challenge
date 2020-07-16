import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export default class UserController {
  private static userRepository = getRepository(User);

  static async index(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  static async show(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  static async store(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  static async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    return this.userRepository.save(request.body);
  }

  static async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}
