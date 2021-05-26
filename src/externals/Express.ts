import Express from "express";
import { Request, Response, Error } from 'express';
import bodyParser from "body-parser";
import Youch from "youch";
const helmet = require("helmet");
import InvalidRoutes from "../adapters/routes/Express/InvalidRoutes";
import Routes from "../adapters/routes/Express/Routes";
import ServiceLocator from "./ServiceLocator";

export default class Server {
  public express: Express;

  constructor() {
    this.express = Express();

    this.middlewares();
    this.routes();
    this.invalidRoutes();
    this.exception();

    this.createHTTPServer();
  }

  middlewares(): void {
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(this.buildServiceLocator);
  }

  buildServiceLocator(req, res, next): void {
    req.serviceLocator = ServiceLocator.getInstance();
    return next();
  }

  routes(): void {
    this.express.use(Routes);
  }

  invalidRoutes(): void {
    this.express.use(InvalidRoutes);
  }

  exception(): Response {
    this.express.use(async (err: Error, req: Request, res: Response, next: Function) => {
      let message: any = "Internal Server Error";

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err, req);
        message = await youch.toJSON();
      }

      return res.status(500).send({ success: false, message });
    });
  }

  createHTTPServer() {
    this.express.listen(process.env.PORT);
    console.log(`Server running at port ${process.env.PORT}`);
  }
}
