import { Request, Response, Router } from "express";
import Position from "../models/position";
import User from "../models/user";

const positionRouter: Router = Router();

positionRouter.post("/", async (request: Request, response: Response) => {
  const token = request.body.token;
  if (token) {
    const user = await User.findOne({ token }).populate({
      path: 'positions',
      populate: { path: 'company' }
    });
    if (user) {
      response.json(user.positions);
      return;
    }
  }
  response.json([]);
});

export { positionRouter };
