import express from "express";
import { GetChatsParams, GetChatsResponse } from "@chat-app/types";
import ChatModel from "./ChatModel";

export class ChatController {
  constructor(private chatModel: ChatModel) {
    this.getChats = this.getChats.bind(this);
  }

  public getChats(req: express.Request<void, void, void, GetChatsParams>, res: express.Response<GetChatsResponse>) {
    const chats = this.chatModel.getChats(req.user.id, {
      userName   : req.query.userNameFilter,
      userStatus : req.query.userStatusFilter,
    });

    res.send({ chats });

    return chats;
  }
}
