interface Socket {
  on(event: string, callback: (data: unknown) => void): void;
  emit(event: string, data: unknown): void;
}

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
