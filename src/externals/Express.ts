import Express from "express";
import bodyParser from "body-parser";
import Youch from "youch";
const helmet = require("helmet");
import ServiceLocator from "./ServiceLocator";
import { Request, Response, Error } from 'express';


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
    return;
    // this.express.use(require("../adapters/routes/Express/routes"));
  }

  invalidRoutes(): void {
    return;
    // this.express.use(require("../adapters/routes/Express/invalidRoutes"));
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
    this.express.listen(3000);
    console.log(`Server running at port ${3000}`);
  }
}
