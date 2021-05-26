import * as express from "express";
const InvalidRoutes = express.Router();

const message = "Invalid route!";

InvalidRoutes.get("*", (req, res) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.post("*", (req, res) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.put("*", (req, res) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.delete("*", (req, res) =>
  res.status(404).send({ success: false, message })
);
InvalidRoutes.patch("*", (req, res) =>
  res.status(404).send({ success: false, message })
);

export default InvalidRoutes;
