import { check } from 'express-validator';
import { Op } from 'sequelize';
import { User } from '@models/user.model';

export class UserValidation {
  public validation = [
    check('name', 'Name must be less than 255 characters')
      .optional()
      .isLength({ max: 255 }),
    check('name', 'Invalid name')
      .optional()
      .isString(),
    check('email', 'Email must be less than 128 characters')
      .optional()
      .isLength({ max: 128 }),
    check('email', 'Invalid email')
      .optional()
      .isEmail(),
    check('email', 'User with this email already exists')
      .optional()
      .custom(
        (value, { req }) =>
          new Promise(async (resolve, reject) => {
            const id: number = parseInt(req.params.id) || 0;
            const user: User = await User.findOne({
              where: {
                email: value,
                id: {
                  [Op.not]: [id],
                },
              },
            });
            if (user) {
              return reject();
            }

            return resolve();
          })
      ),
    check('password', 'Password must be less than 255 characters')
      .optional()
      .isLength({ max: 255 }),
    check('password', 'The password must be at least 6 characters')
      .optional()
      .isLength({ min: 6 }),
    check('password', 'Invalid password')
      .optional()
      .isString(),
  ];

  public validationCreate = [
    check('name', 'Name is required').exists(),
    check('email', 'Email is required').exists(),
    check('password', 'Password is required').exists(),
    ...this.validation,
  ];
}
