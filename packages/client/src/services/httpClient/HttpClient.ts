import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiError } from "./ApiError";

type MethodConfig = Omit<AxiosRequestConfig, "url" | "method">;

export class HttpClient {
  private readonly client: AxiosInstance;

  private errorListeners: ((err: AxiosError) => void)[] = [];

  private auth = "";

  constructor(
    private readonly prefix: string,
    private readonly apiUrl: string,
  ) {
    this.client = axios.create({
      headers : {
        "content-type" : "application/json",
      },
      responseType : "json",

    });
  }

  setAuth(v: string) {
    this.auth = v;
  }

  async get<ResponseData = unknown>(url: string, config: MethodConfig = {}) {
    return this.request<ResponseData>({ url, method: "GET", ...config });
  }

  async getBlob<ResponseData = unknown>(url: string, config: MethodConfig = {}) {
    return this.request<ResponseData>({
      url,
      method       : "GET",
      ...config,
      responseType : "blob",
    });
  }

  async postBlob(url: string, config: MethodConfig = {}) {
    return this.request<Blob>({
      url,
      method       : "POST",
      ...config,
      responseType : "blob",
    });
  }

  async post<ResponseData = unknown>(url: string, config: MethodConfig = {}) {
    return this.request<ResponseData>({ url, method: "POST", ...config });
  }

  async put<ResponseData = unknown>(url: string, config: MethodConfig = {}) {
    return this.request<ResponseData>({ url, method: "PUT", ...config });
  }

  async delete<ResponseData = unknown>(url: string, config: MethodConfig = {}) {
    return this.request<ResponseData>({ url, method: "DELETE", ...config });
  }

  public pushErrorListener(cb: (err: AxiosError) => void) {
    this.errorListeners.push(cb);
  }

  private async request<ResponseData>(reqPayload: AxiosRequestConfig) {
    try {
      return await this.rawRequest<ResponseData>(reqPayload);
    } catch (err) {
      const isApiError = err instanceof ApiError;
      if (isApiError && err.originalStatusCode !== 403) throw err;

      return this.rawRequest<ResponseData>(reqPayload);
    }
  }

  private async rawRequest<ResponseData = unknown>(config: AxiosRequestConfig) {
    try {
      const url = `${this.apiUrl}/${this.prefix}${config.url}`;
      const { data: result } = await this.client.request<ResponseData>({
        ...config,
        method  : config.method,
        headers : {
          ...(config.headers || {}),
          User : this.auth,
        },
        url,
      });
      return result;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error: { message: string } }>;
      const originalError = axiosError.response && axiosError.response.data
        ? axiosError.response.data.error
        : { message: axiosError.message };

      throw new ApiError({
        originalError,
        originalStatusCode : axiosError.response ? axiosError.response.status : 400,
      });
    }
  }
}
