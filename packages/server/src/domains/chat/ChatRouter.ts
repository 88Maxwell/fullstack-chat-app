import { Router } from "express";
import { ChatController } from "./ChatController";

export default class ChatRouter {
  router: Router;

  constructor(chatController: ChatController) {
    this.router = Router();
    this.router.get("/chats", chatController.getChats);
  }
}
