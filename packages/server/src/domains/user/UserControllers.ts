import express from "express";
import { CreateUserParams, CreateUserResponse } from "@chat-app/types";
import UserModel from "./UserModel";

export class UserController {
  constructor(private userModel: UserModel) {
    this.createUser = this.createUser.bind(this);
  }

  createUser(req: express.Request<CreateUserParams>, res: express.Response<CreateUserResponse>) {
    const user = this.userModel.createUser(req.body.name);

    res.send({ user });

    return user;
  }
}
