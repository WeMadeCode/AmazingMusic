// 封装成类 -> 实例
import { baseURL } from "./config";

class Request {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  request<T>(options: WechatMiniprogram.RequestOption): Promise<T> {
    const { url } = options;
    return new Promise((resolve, reject) => {
      wx.request<T>({
        ...options,
        url: this.baseURL + url,
        success: (response) => {
          const data = response.data;
          resolve(data);
        },
        fail: (error) => {
          reject(error);
        },
      });
    });
  }
  get<T>(options: WechatMiniprogram.RequestOption) {
    return this.request<T>({ ...options, method: "GET" });
  }
  post<T>(options: WechatMiniprogram.RequestOption) {
    return this.request<T>({ ...options, method: "POST" });
  }
}

export const request = new Request(baseURL);
