import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersControllers from "./controllers/users.controllers";
import UsersMiddleware from "./middlewares/users.middleware";
import express from 'express'

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/users')
      .get(
        UsersControllers.listUsers
      )
      .post(
        UsersMiddleware.validateRequiredFields,
        UsersMiddleware.validateEmailDoesntExists,
        UsersControllers.createUser
      )

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route('/users/:userId')
      .all()
      .get(UsersControllers.getUserById)
      .delete(UsersControllers.removeUser);


    this.app.put('/users/:userId', [
      UsersMiddleware.validateRequiredFields,
      UsersControllers.put
    ]);

    return this.app
  }
}