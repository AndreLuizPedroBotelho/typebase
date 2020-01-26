import { check } from 'express-validator';

export class SessionValidation {
  public validation = [
    check('email', 'Email must be less than 255 characters')
      .exists()
      .isLength({ max: 128 }),
    check('email', 'Invalid email')
      .exists()
      .isEmail(),
    check('password', 'Password must be less than 255 characters')
      .exists()
      .isLength({ max: 128 }),
    check('password', 'The password must be at least 6 characters')
      .exists()
      .isLength({ min: 6 }),
    check('password', 'Invalid password')
      .exists()
      .isString(),
  ];
}
