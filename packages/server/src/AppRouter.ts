import { Router } from "express";
import ChatRouter from "./domains/chat/ChatRouter";

export default class AppRouter {
  router: Router;

  constructor(chatRouter: ChatRouter) {
    this.router = Router();
    this.router.use(chatRouter.router);
  }
}
