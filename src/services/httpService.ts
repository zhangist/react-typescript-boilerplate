import axios, { AxiosRequestConfig } from "axios";
import { StatusCode } from "../enums/statusCode";
import { AbortContext } from "../interfaces/abortContext";
import { ApiResponse } from "../interfaces/apiResponse";
import { RequestConfig } from "../interfaces/requestConfig";

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
   * api
   */
  public static async api<T = any>(
    config: RequestConfig,
    abortContext?: AbortContext,
  ): Promise<T> {
    try {
      const data = await this.request<ApiResponse<T>>(config, abortContext);
      return new Promise<T>(resolve => resolve(data.data));
    } catch (error) {
      let data = {};
      if (error.response) {
        data = error.response.data;
      } else if (axios.isCancel(error)) {
        data = { statusCode: StatusCode.Cancel, message: "cancel" };
      } else {
        data = { statusCode: StatusCode.Error, message: "error" };
      }
      return new Promise<T>((resolve, reject) => reject(data));
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
      let data = {};
      if (error.response) {
        data = {
          statusCode: error.response.status,
          message: error.response.statusText,
          ...error.response.data,
        };
      } else if (axios.isCancel(error)) {
        data = { statusCode: StatusCode.Cancel, message: "cancel" };
      } else {
        data = { statusCode: StatusCode.Error, message: "error" };
      }
      return new Promise<T>((resolve, reject) => reject(data));
    }
  }

  private constructor() {}
}
