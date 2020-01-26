import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserInterface } from '@models/user.model';
import { UpdateOptions, DestroyOptions } from 'sequelize';

export class UserController {
  public async index(_req: Request, res: Response) {
    const users: Array<User> = await User.findAll<User>({
      attributes: {
        exclude: ['passwordHash'],
      },
    });

    res.status(200).json(users);
  }

  public async show(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id, 10);

    const user: User | null = await User.findByPk<User>(userId, {
      attributes: { exclude: ['passwordHash'] },
    });

    if (!user) {
      return res.status(404).json({
        errors: ["User don't found"],
      });
    }

    return res.json(user);
  }

  public async store(req: Request, res: Response) {
    const params: UserInterface = req.body;
    params.passwordHash = bcrypt.hashSync(params.password, 8);

    const user = await User.create<User>(params);

    return res.status(200).json({ messsage: 'User update with success', data: user });
  }

  public async update(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id, 10);
    const params: UserInterface = req.body;
    if (params.password) {
      params.passwordHash = bcrypt.hashSync(params.password, 8);
    }

    const options: UpdateOptions = {
      where: { id: userId },
      returning: true,
      limit: 1,
    };

    const [, user] = await User.update(params, options);
    if (!user) {
      return res.status(404).json({
        errors: ["User don't found"],
      });
    }

    return res.status(200).json({ messsage: 'User update with success', data: user });
  }

  public async delete(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id, 10);

    const options: DestroyOptions = {
      where: { id: userId },
      limit: 1,
    };

    const user = await User.destroy(options);

    if (!user) {
      return res.status(404).json({
        errors: ["User don't found"],
      });
    }

    return res.status(200).json({ data: 'User delete with success' });
  }
}
