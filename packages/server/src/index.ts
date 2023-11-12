import { initialize } from "./initialize";

const PORT = process.env.PORT ? +process.env.PORT : 8002;

initialize(PORT);
