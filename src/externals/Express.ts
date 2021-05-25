import express from "express";
import bodyParser from "body-parser";
import Youch from "youch";
const helmet = require("helmet");
import ServiceLocator from "./ServiceLocator";

export default class Express {
  public express;

  constructor() {
    this.express = express();

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

  exception(): any {
    this.express.use(async (err, req, res, next) => {
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
