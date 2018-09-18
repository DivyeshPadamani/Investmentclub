import { pbkdf2, randomBytes } from "crypto";
import { NextFunction, Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";

import { digest, length, secret } from "../config";
import Users from "../models/user";
import Role from "../models/role";
import Class from "../models/class";

const loginRouter: Router = Router();

loginRouter.post("/signup", async (request: Request, response: Response, next: NextFunction) => {
  if (!request.body.hasOwnProperty("password")) {
    const err = new Error("No password");
    return next(err);
  }

  const salt = randomBytes(128).toString("base64");
  const token = randomBytes(128).toString("base64");
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const birthday = request.body.birthday;
  const type = request.body.type;
  const roles = [];
  const orders = [];
  const positions = [];
  const icon = "";
  const email = request.body.email;
  const classCode = request.body.classCode;
  const cash = 100000;
  const exists = await Users.findOne({ email });

  if (exists) {
    const err = new Error("Account already exists with that email!");
    return next(err);
  }

  let createdRole;
  if (classCode.length !== 0) {
    const foundClass = await Class.findOne({ classCode });
    if (!foundClass) {
      const err = new Error("Cannot find a class with that class code! Please consult your mentor.");
      return next(err);
    }
    const roleCreation = {
      role: "Student",
      classes: [foundClass._id]
    };


    createdRole = await Role.create(roleCreation);
  }

  pbkdf2(request.body.password, salt, 10000, length, digest, async (err: Error, hash: Buffer) => {
    const userRequest = {
      birthday,
      cash,
      email,
      firstName,
      icon,
      lastName,
      roles: (createdRole) ? [createdRole] : [],
      token,
      salt,
      hash,
      orders,
      type,
      positions,
    };
    const userResponse = await Users.create(userRequest);

    await Class.findOneAndUpdate({ classCode }, { $push: { students: userResponse._id } });

    response.cookie("token", token);
    response.json({ success: true, token: token });
  });
});

// login method
loginRouter.post("/", async (request: Request, response: Response, next: NextFunction) => {
  const user = await Users.findOne({ email: request.body.email });
  if (!user) {
    const err = new Error("No account exists with that email!");
    return next(err);
  }

  pbkdf2(request.body.password, user.salt, 10000, length, digest, async (err: Error, hash: Buffer) => {
    if (err) {
      throw new Error(err.message);
    }

    console.log(hash.toString("hex"));
    console.log(user.hash.toString("hex"))
    // check if password is active
    if (hash.toString("hex") !== user.hash.toString("hex")) {
      const err = new Error("Wrong password!");
      return next(err);
    }

    const token = randomBytes(128).toString("base64");
    response.cookie("token", token);

    await Users.findOneAndUpdate({ email: request.body.email }, { $set: { token } });

    response.json({ success: true, token: token });
  });
});

export { loginRouter };
