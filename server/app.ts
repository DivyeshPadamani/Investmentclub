import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as path from "path";

import dbLoader from "./db";
import { loadCompanies } from "./market/migrator";
import { updatePrices } from "./market/priceUpdater";
import { fulfillOrders } from "./market/orderFullfilment";

import { loginRouter } from "./routes/login";
import { userRouter } from "./routes/user";
import { companyRouter } from "./routes/company";
import { positionRouter } from "./routes/position";
import { orderRouter } from "./routes/order";
import { classRouter } from "./routes/class";

// preinit

loadCompanies();

setTimeout(() => {
  updatePrices(updatePrices);
  fulfillOrders(fulfillOrders);
}, 1000);

// end preinit
const app: express.Application = express();

app.disable("x-powered-by");

dbLoader((db) => {
  app.use(cors());
  app.use(json());
  app.use(compression());
  app.use(urlencoded({ extended: true }));

  // api routes
  app.use("/api/login", loginRouter);
  app.use("/api/user", userRouter);
  app.use("/api/company", companyRouter);
  app.use("/api/position", positionRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/class", classRouter);

  if (app.get("env") === "production") {

    // in production mode run application from dist folder
    app.use(express.static(path.join(__dirname, "/../client")));
  }

  // catch 404 and forward to error handler
  app.use((req: express.Request, res: express.Response, next) => {
    const err = new Error("Not Found");
    next(err);
  });

  // production error handler
  // no stacktrace leaked to user
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    res.status(err.status || 500);
    res.json({
      error: {},
      message: err.message,
    });
  });
});

export { app };
