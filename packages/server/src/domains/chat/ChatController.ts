import express from "express";
import { GetChatsParams, GetChatsResponse } from "@chat-app/types";
import ChatModel from "./ChatModel";

export class ChatController {
  constructor(private chatModel: ChatModel) {
    this.getChats = this.getChats.bind(this);
  }

  public getChats(req: express.Request<GetChatsParams>, res: express.Response<GetChatsResponse>) {
    const chats = this.chatModel.getChats(req.params.userNameFilter).map((c) => {
      if (c.user1.id === req?.user?.id) return { ...c, user: c.user2 };
      return { ...c, user: c.user1 };
    });

    res.send({ chats });

    return chats;
  }
}
