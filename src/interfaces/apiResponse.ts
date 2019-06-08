/**
 * api response
 */
export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}
