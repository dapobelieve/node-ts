import express from "express";
import usersService from "../services/users.service";

import debug from "debug";

const log: debug.IDebugger = debug('app:users-middleware');

class UsersMiddleware {
  async validateRequiredFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  )
  {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields email and password`,
      });
    }
  }

  async validateEmailDoesntExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {

    const user = await usersService.getUserByEmail(req.body.email);
    if(user) {
      res.status(400).send({
        error: `User email already exists`
      })
    }else {
      next()
    }
  }

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.readById(req.params.userId);
    if(user) {
      next();
    }else {
      res.status(404).send({
        error: `User ${req.params.userId} not found`
      })
    }
  }

  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware()