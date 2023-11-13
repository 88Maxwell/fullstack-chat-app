import { createAction } from "@reduxjs/toolkit";
import type { EmitMessageParams } from "services/SocketService";

export const emitMessageAction = createAction<EmitMessageParams>("socket-emit-message");
export const emitCloseAction = createAction("socket-emit-close");
