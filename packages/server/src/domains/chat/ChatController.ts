import express from "express";
import { GetChatsParams, GetChatsResponse } from "@chat-app/types";
import ChatModel from "./ChatModel";

export class ChatController {
  constructor(private chatModel: ChatModel) {}

  getChats(req: express.Request<GetChatsParams>, res: express.Response<GetChatsResponse>) {
    const chats = this.chatModel.getChats(req.params.userNameFilter);

    res.send({ chats });

    return chats;
  }
}