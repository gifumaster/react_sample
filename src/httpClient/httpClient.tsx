import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { formatDate, validDate } from './dateUtil';

/**
 * HTTPクライアント
 */
export class HttpClient {
  protected client: AxiosInstance;

  constructor() {
    /*
    if (import.meta.env.VITE_APP_API_URL === undefined) {
      throw new Error('VITE_APP_API_URLが未設定です。');
    }

    const config: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_APP_API_URL as string,
    };
    */

    const config: AxiosRequestConfig = {};

    this.client = axios.create(config);
    this.client.interceptors.request.use(this.loggerInterceptor);
    this.client.interceptors.request.use(this.addDefaultContentType);
    this.client.interceptors.request.use(this.transformDate);
  }

  addDefaultContentType = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!(config.headers) && config.headers['Content-Type'] === void 0) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    return config;
  };

  transformDate = (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.transformRequest = [
      (data) => {
        if (data instanceof FormData) {
          return data;
        } else {
          return this.transformRequestDate(data);
        }
      },
    ];
    return config;
  };

  transformRequestDate = (data: any): string => {
    return JSON.stringify(data, function (key, value) {
      if (validDate(this[key])) {
        return formatDate(this[key]);
      }
      return value;
    });
  };

  loggerInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // 接続先用のロガーをセットする
    return config;
  };

  /**
   * GETリクエスト
   */
  get = async <T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return await this.client.get<T>(url, config);
  };

  /**
   * POSTリクエスト
   */
  post = async <T>(
    url: string,
    data: any = undefined,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any>> => {
    return await this.client.post<T>(url, data, config);
  };

  /**
   * PUTリクエスト
   */
  put = async <T>(
    url: string,
    data: any = undefined,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any>> => {
    return await this.client.put<T>(url, data, config);
  };

  /**
   * DELETEリクエスト
   */
  delete = async <T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any>> => {
    return await this.client.delete<T>(url, config);
  };
}

// singleton
const httpClient = new HttpClient();

export { httpClient };
