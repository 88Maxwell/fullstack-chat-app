import express from "express";
import http from "http";
import cors from "cors";
import ChatModel from "domains/chat/ChatModel";
import { ChatController } from "domains/chat/ChatController";
import ChatRouter from "domains/chat/ChatRouter";
import UserFakeDatabase from "domains/user/UserFakeDatabase";
import ChatFakeDatabase from "domains/chat/ChatFakeDatabase";
import FakeDatabase from "./FakeDatabase";
import AppRouter from "./AppRouter";

import SocketService from "./services/SocketService";

export function initialize(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const userFakeDatabase = new UserFakeDatabase();
  const chatFakeDatabase = new ChatFakeDatabase();
  const fakeDb = new FakeDatabase(userFakeDatabase, chatFakeDatabase);
  const socketService = new SocketService(httpServer, fakeDb);

  const chatModel = new ChatModel(fakeDb);
  const chatController = new ChatController(chatModel);
  const chatRouter = new ChatRouter(chatController);
  const appRouter = new AppRouter(chatRouter);

  app.use(cors());
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.user = { id: req.headers.user as string };

    return next();
  });
  app.use("/api/v1", appRouter.router);

  socketService.init();
  // eslint-disable-next-line no-console
  httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
