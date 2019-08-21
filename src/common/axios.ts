import axios, { AxiosResponse, Canceler } from "axios";
import { RequestConfig } from "../interfaces/requestConfig";

const requestCancelMap = new Map<symbol, Canceler>();

/**
 * request
 */
export async function request<T = any, R = AxiosResponse<T>>(
  config: RequestConfig,
): Promise<R> {
  const { cancelId, ...restConfig } = config;

  if (typeof cancelId !== "undefined") {
    if (requestCancelMap.has(cancelId)) {
      const c = requestCancelMap.get(cancelId);

      if (typeof c !== "undefined") {
        c("cancel");
      }

      requestCancelMap.delete(cancelId);
    }

    restConfig.cancelToken = new axios.CancelToken(cancel => {
      requestCancelMap.set(cancelId, cancel);
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
