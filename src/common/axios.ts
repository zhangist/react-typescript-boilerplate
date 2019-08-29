import axios, { AxiosResponse, Canceler } from "axios";
import { RequestConfig } from "../interfaces/requestConfig";

const requestMap = new Map<symbol, Canceler>();

/**
 * request
 */
export async function request<T = any, R = AxiosResponse<T>>(
  config: RequestConfig,
): Promise<R> {
  const { requestId, abortContext, ...restConfig } = config;

  if (typeof requestId !== "undefined" || typeof abortContext !== "undefined") {
    if (typeof requestId !== "undefined") {
      if (requestMap.has(requestId)) {
        const c = requestMap.get(requestId);

        if (typeof c !== "undefined") {
          c("cancel");
        }

        requestMap.delete(requestId);
      }
    }

    restConfig.cancelToken = new axios.CancelToken(cancel => {
      if (typeof requestId !== "undefined") {
        requestMap.set(requestId, cancel);
      }

      if (typeof abortContext !== "undefined") {
        abortContext.abort = () => {
          if (typeof requestId !== "undefined" && requestMap.has(requestId)) {
            requestMap.delete(requestId);
          }

          cancel("cancel");
        };
      }
    });
  }

  try {
    const r = await axios.request<T, R>(restConfig);

    return Promise.resolve(r);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * json
 */
export async function json<T = any>(config: RequestConfig): Promise<T> {
  try {
    const response = await request<T>(config);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * api
 */
export async function api<T = any>(config: RequestConfig): Promise<T> {
  try {
    const data = await json<T>(config);

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
