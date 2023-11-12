export interface ApiOriginalError {
  message?: string;
  code?: number;
}

export class ApiError extends Error {
  public originalStatusCode: number;

  public originalError: ApiOriginalError;

  constructor(error: {
    originalError: ApiOriginalError;
    originalStatusCode: number;
  }) {
    const originalError = error.originalError || {};
    super(originalError.message);
    this.originalStatusCode = error.originalStatusCode;
    this.originalError = originalError;
  }

  static isUnauthorized(error: unknown): boolean {
    return error instanceof ApiError && error.originalStatusCode === 403;
  }
}
