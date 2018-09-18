import orderModel from '../models/order';
import userModel from '../models/user';
import positionModel from '../models/position';

const TIME_DELAY = 5000;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fulfillOrders(done) {
    const orders: any[] = await orderModel.find({ completed: false }).populate("company positions");
    orders.forEach(async order => {
        const owner = await userModel.findOne({ orders: { $all: [order._id] } }).populate("positions");
        if (!owner) {
            return;
        }

        let cash = owner.cash;

        const price = order.orderPrice;

        const orderType = order.action;

        if (orderType === 'BUY Market Order') {
            const debitAmount = price * order.amount;

            await orderModel.findOneAndUpdate({ _id: order._id }, { completed: true });

            const validPosition = owner.positions.find(position => {
                return position.company + "" == order.company._id + "";
            });

            cash -= debitAmount;

            if (!validPosition) {
                const positionQuery = {
                    action: "LONG",
                    amount: order.amount,
                    company: order.company,
                    order: order
                };
                const position = await positionModel.create(positionQuery);
                await userModel.findOneAndUpdate({ orders: { $all: [order._id] } }, { $set: { cash }, $pull: { orders: order }, $push: { positions: position } });
            } else {
                await positionModel.findOneAndUpdate({ _id: validPosition._id }, { amount: order.amount });
                await userModel.findOneAndUpdate({ orders: { $all: [order._id] } }, { $set: { cash }, $pull: { orders: order } });
            }

        } else if (orderType === 'BUY Limit Order') {
            if (price >= order.company.lastPrice) {
                const debitAmount = price * order.company.lastPrice;

                await orderModel.findOneAndUpdate({ _id: order._id }, { completed: true });

                const validPosition = owner.positions.find(position => {
                    return position.company + "" == order.company._id + "";
                });

                cash -= debitAmount;

                if (!validPosition) {
                    const positionQuery = {
                        action: "LONG",
                        amount: order.amount,
                        company: order.company,
                        order: order
                    };
                    const position = await positionModel.create(positionQuery);
                    await userModel.findOneAndUpdate({ orders: { $all: [order._id] } }, { $set: { cash }, $pull: { orders: order._id }, $push: { positions: position._id } });
                } else {
                    await positionModel.findOneAndUpdate({ _id: validPosition._id }, { amount: order.amount });
                    await userModel.findOneAndUpdate({ orders: { $all: [order._id] } }, { $set: { cash }, $pull: { orders: order._id } });
                }
            }
        } else if (orderType === 'SELL Market Order') {
            const creditAmount = price * order.amount;

            await orderModel.findOneAndUpdate({ _id: order._id }, { completed: true });

            const validPosition = owner.positions.find(position => {
                return position.company + "" == order.company._id + "";
            });

            cash += creditAmount;

            if (validPosition) {
                const position = await positionModel.findOne({ _id: validPosition._id });
                if (position.amount < order.amount) {
                    console.log("Cannot fulfill sell, not enough shares!");
                    return;
                }

                const newAmount = position.amount - order.amount;

                if (newAmount === 0) {
                    await positionModel.remove({ _id: position._id });
                    await userModel.findOneAndUpdate({ orders: { $all: [order._id] } }, { $set: { cash }, $pull: { orders: order._id, positions: position._id } });
                } else {
                    await positionModel.findOneAndUpdate({ _id: position._id }, { $set: { amount: newAmount } });
                    await userModel.findOneAndUpdate({ orders: { $all: [order._id] } }, { $set: { cash }, $pull: { orders: order._id } });
                }
            }
        } else if (orderType === 'SELL Limit Order') {

        }
    });

    await timeout(TIME_DELAY);

    done(done);
}