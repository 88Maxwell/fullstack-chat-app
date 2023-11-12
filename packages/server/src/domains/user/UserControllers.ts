import express from "express";
import { GetMeParams, GetMeResponse } from "@chat-app/types";
import UserModel from "./UserModel";

export class UserController {
  constructor(private userModel: UserModel) {}

  createUser(req: express.Request<GetMeParams>, res: express.Response<GetMeResponse>) {
    const user = this.userModel.createUser(req.body.name);

    res.send({ user });

    return user;
  }
}
