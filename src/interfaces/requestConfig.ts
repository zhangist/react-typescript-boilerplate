import { AxiosRequestConfig } from "axios";
import { AbortContext } from "./abortContext";

export interface RequestConfig extends AxiosRequestConfig {
  requestId?: symbol;
  abortContext?: AbortContext;
}
