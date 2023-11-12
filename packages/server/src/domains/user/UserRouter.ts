import { Router } from "express";
import { UserController } from "./UserControllers";

export default class UserRouter {
  public router: Router;

  constructor(userController: UserController) {
    this.router = Router();
    this.router.get("createUser", userController.createUser);
  }
}
