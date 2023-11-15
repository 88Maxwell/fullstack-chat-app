import { EmitMessageParams } from "@chat-app/types";
import { createAction } from "@reduxjs/toolkit";

export const emitMessageAction = createAction<EmitMessageParams>("socket-emit-message");
export const emitCloseAction = createAction("socket-emit-close");
