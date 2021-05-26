import * as express from 'express';

const Routes = express.Router();
import CreateLeadController from "../../controllers/CreateLeadController";

Routes.get("/hello-world", (req, res) => {
  return res.send({
    success: true,
    message: "Hello World!",
  });
});

Routes.post("/lead", CreateLeadController.post);

export default Routes;
