import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export default class UserController {
  static async index(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    return userRepository.find();
  }

  static async show(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    return userRepository.findOne(request.params.id);
  }

  static async store(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    return userRepository.save(request.body);
  }

  static async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const userRepository = getRepository(User);
    return userRepository.save(request.body);
  }

  static async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const userRepository = getRepository(User);
    const userToRemove = await userRepository.findOne(request.params.id);
    await userRepository.remove(userToRemove);
  }
}
