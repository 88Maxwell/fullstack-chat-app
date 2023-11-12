import { Router } from "express";
import ChatRouter from "./domains/chat/ChatRouter";
import UserRouter from "./domains/user/UserRouter";

export default class AppRouter {
  router: Router;

  constructor(chatRouter: ChatRouter, userRouter: UserRouter) {
    this.router = Router();
    this.router.use(chatRouter.router);
    this.router.use(userRouter.router);
  }
}
