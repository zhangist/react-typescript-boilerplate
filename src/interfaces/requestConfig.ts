import { AxiosRequestConfig } from "axios";
import { AbortContext } from "./abortContext";

/**
 * Request Config
 */
export interface RequestConfig extends AxiosRequestConfig {
  requestId?: symbol;
  abortContext?: AbortContext;
}
