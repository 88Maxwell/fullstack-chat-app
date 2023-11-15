import express from "express";
import http from "http";
import cors from "cors";
import ChatModel from "domains/chat/ChatModel";
import { ChatController } from "domains/chat/ChatController";
import ChatRouter from "domains/chat/ChatRouter";
import UserFakeDatabase from "domains/user/UserFakeDatabase";
import ChatFakeDatabase from "domains/chat/ChatFakeDatabase";
import { userAuthMiddleware } from "domains/user/userAuthMiddleware";
import FakeDatabase from "./FakeDatabase";
import AppRouter from "./AppRouter";

import SocketService from "./services/SocketService";

export class AppFacade {
  app: express.Application;

  httpServer: http.Server;

  socketService: SocketService;

  constructor(private port: number) {
    this.app = express();
    this.httpServer = http.createServer(this.app);

    const userFakeDatabase = new UserFakeDatabase();
    const chatFakeDatabase = new ChatFakeDatabase();
    const fakeDb = new FakeDatabase(userFakeDatabase, chatFakeDatabase);
    this.socketService = new SocketService(this.httpServer, fakeDb);

    const chatModel = new ChatModel(fakeDb);
    const chatController = new ChatController(chatModel);
    const chatRouter = new ChatRouter(chatController);
    const appRouter = new AppRouter(chatRouter);

    this.app.use(cors());
    this.app.use(userAuthMiddleware());
    this.app.use("/api/v1", appRouter.router);
  }

  initialize() {
    this.socketService.init();
    // eslint-disable-next-line no-console
    this.httpServer.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`));
  }
}
