import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserInterface } from '../models/user.model';

export class UserController {
  public async store(req: Request, res: Response) {
    try {
      const params: UserInterface = req.body;
      params.passwordHash = bcrypt.hashSync(params.password, 8);

      await User.create<User>(params);

      res.status(200).json({ data: 'User create with success' });
    } catch (err) {
      return res.status(500).json({ errors: ["User doesn't create"] });
    }
  }
}
