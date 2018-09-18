import { Request, Response, Router } from "express";
import Position from "../models/position";
import Order from "../models/order";
import User from "../models/user";

const orderRouter: Router = Router();

orderRouter.post("/", async (request: Request, response: Response) => {
    const token = request.body.token;
    if (token) {
        const user = await User.findOne({ token }).populate({
            path: 'orders',
            populate: { path: 'company' }
        });
        if (user) {
            response.json(user.orders);
            return;
        }
    }
    response.json([]);
});

orderRouter.post("/place", async (request: Request, response: Response) => {
    const token = request.body.token;
    if (token) {
        const order = request.body;
        const dbOrder = await Order.create({ ...order, completed: false });
        const user = await User.findOneAndUpdate({ token }, { $push: { orders: dbOrder } });
        response.json(dbOrder);
        return;
    }
    response.json({});
});

export { orderRouter };
