import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import User from '../entity/User';
import config from '../config/config';

export default class AuthController {
  static login = async (req: Request, res: Response) => {
    // Check if username and password are set
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    // Send the jwt in the response
    res.send({ user, token });
  };

  static register = async (req: Request, res: Response) => {
    // Get parameters from the body
    const { username, password } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;

    // Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Hash the password, to securely store on DB
    user.hashPassword();

    // Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }

    // If all ok, send 201 response
    res.status(201).send('User created');
  };
}
