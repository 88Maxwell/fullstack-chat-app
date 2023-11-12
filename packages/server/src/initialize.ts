import express from "express";
import http from "http";
import cors from "cors";
import ChatModel from "domains/chat/ChatModel";
import { ChatController } from "domains/chat/ChatController";
import ChatRouter from "domains/chat/ChatRouter";
import FakeDatabase from "./FakeDatabase";
import { UserController } from "./domains/user/UserControllers";
import UserModel from "./domains/user/UserModel";
import UserRouter from "./domains/user/userRouter";
import AppRouter from "./AppRouter";

import SocketService from "./services/SocketService";

export function initialize(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const fakeDb = new FakeDatabase();
  const socketService = new SocketService(httpServer, fakeDb);

  const userModel = new UserModel(fakeDb);
  const userController = new UserController(userModel);
  const userRouter = new UserRouter(userController);

  const chatModel = new ChatModel(fakeDb);
  const chatController = new ChatController(chatModel);
  const chatRouter = new ChatRouter(chatController);
  const appRouter = new AppRouter(chatRouter, userRouter);

  app.use(cors());
  app.use("/api/v1", appRouter.router);

  socketService.init();
  // eslint-disable-next-line no-console
  httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
