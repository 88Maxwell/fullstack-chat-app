import { Router } from "express";
import { ChatController } from "./ChatController";

export default class ChatRouter {
  private router: Router;

  constructor(chatController: ChatController) {
    this.router = Router();
    this.router.get("createChat", chatController.getChats);
  }
}
