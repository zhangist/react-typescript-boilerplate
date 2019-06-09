import axios, { AxiosRequestConfig } from "axios";
import { StatusCode } from "../enums/statusCode";
import { AbortContext } from "../interfaces/abortContext";
import { RequestConfig } from "../interfaces/requestConfig";
import { HttpError } from "../interfaces/httpError";

/**
 * http service
 */
export class HttpService {
  /**
   * request
   */
  public static async request<T = any>(
    config: RequestConfig,
    abortContext?: AbortContext,
  ): Promise<T> {
    try {
      const axiosRequestConfig: AxiosRequestConfig = config;
      if (typeof abortContext !== "undefined") {
        axiosRequestConfig.cancelToken = new axios.CancelToken(cancel => {
          abortContext.abort = cancel;
        });
      }
      const response = await axios(axiosRequestConfig);
      return new Promise<T>(resolve => resolve(response.data));
    } catch (error) {
      return new Promise<T>((resolve, reject) => reject(error));
    }
  }

  /**
   * json
   */
  public static async json<T = any>(
    config: RequestConfig,
    abortContext?: AbortContext,
  ): Promise<T> {
    try {
      const data = await this.request<T>(config, abortContext);
      return new Promise<T>(resolve => resolve(data));
    } catch (error) {
      const data: HttpError = {
        statusCode: StatusCode.Error,
        message: "error",
      };
      if (error.response) {
        data.statusCode = error.response.status || data.statusCode;
        data.message = error.response.statusText || data.message;
      } else if (axios.isCancel(error)) {
        data.statusCode = StatusCode.Cancel;
        data.message = "cancel";
      }
      return new Promise<T>((resolve, reject) => reject(data));
    }
  }

  private constructor() {}
}
