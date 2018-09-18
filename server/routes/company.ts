import { Request, Response, Router } from "express";
import Company from "../models/company";
import Users from "../models/user";

const companyRouter: Router = Router();

companyRouter.get("/", async (request: Request, response: Response) => {
  const start = parseInt(request.query.start);
  const count = parseInt(request.query.count);
  const filter = new RegExp(request.query.filter, "i");
  
  const companies = await Company.paginate(
    {
      $or: [
        { companyName: filter },
        { ticker: filter }
      ]
    }, { offset: start, limit: count });

  response.json(companies);
});

export { companyRouter };
