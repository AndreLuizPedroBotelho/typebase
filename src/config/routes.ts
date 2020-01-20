import { UserController } from '../app/controllers/user.controller';

export class Routes {
  /**
   * @Controllers
   * @public
   */
  public usersController: UserController = new UserController();

  /**
   * @Routes
   * @public
   */
  public routes(app): void {
    /**
     * @public
     */
    app.route('/users').post(this.usersController.store);
  }
}
