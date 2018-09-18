import { Request, Response, Router } from "express";
import Users from "../models/user";

const userRouter: Router = Router();

userRouter.post("/", async (request: Request, response: Response) => {
  const token = request.body.token;
  if (token) {
    const user = await Users.findOne({ token }).populate({
      path: "roles",
      populate: { path: "classes" }
    });
    if (user) {
      response.json({ loggedIn: true, user });
      return;
    }
  }
  response.json({ loggedIn: false });
});

userRouter.post("/value", async (request: Request, response: Response) => {
  const token = request.body.token;
  if (token) {
    const user = await Users.findOne({ token }).populate({
      path: "positions",
      populate: { path: "company" }
    })
    if (user) {
      let value = 0;
      user.positions.forEach(position => {
        let action = position.action;
        switch (action) {
          case "LONG":
            value += position.amount * position.company.lastPrice;
            break;
          case "SHORT":
            value += position.amount * position.company.lastPrice;
            break;
          default:
            break;
        }
      });
      response.json({ cash: user.cash, value: value });
      return;
    }
  }
  response.json({});
});

userRouter.post("/logout", async (request: Request, response: Response) => {
  const token = request.body.token;
  if (token) {
    const user = await Users.findOne({ token })
    if (user) {
      await Users.findOneAndUpdate({ token }, { $set: { token: null } });
      response.json({ success: true });
      return;
    }
  }
  response.json({ success: false });
});

export { userRouter };
