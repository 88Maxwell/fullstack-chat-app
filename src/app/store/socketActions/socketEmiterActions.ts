import { createAction } from "@reduxjs/toolkit";
import type { EmitMessageParams } from "services/SocketService";

export const emitMessageAction = createAction<EmitMessageParams>("socket-emit-message");
export const emitConnectAction = createAction<EmitMessageParams>("socket-emit-connect");
export const emitCloseAction = createAction<EmitMessageParams>("socket-emit-close");
