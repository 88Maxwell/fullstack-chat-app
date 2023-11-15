import { AppFacade } from "./AppFacade";

const PORT = process.env.PORT ? +process.env.PORT : 8002;

const app = new AppFacade(PORT);

app.initialize();
