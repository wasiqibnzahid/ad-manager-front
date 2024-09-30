import axios, { AxiosRequestConfig } from "axios";
export interface RequestConfig<T> extends AxiosRequestConfig<T> {
  url: string;
}
export async function makeApiCall<ResType = any, PayloadType = any>(
  options: RequestConfig<PayloadType>
): Promise<ResType> {
  const headers: AxiosRequestConfig["headers"] = {};
  const token = localStorage.getItem("auth-token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await axios<ResType>({
      method: "GET",
      ...options,
      headers: {
        ...headers,
        ...(options?.headers || {}),
      },
      url: `${import.meta.env.VITE_APP_API_URL}/${options.url}`,
    }).then((res) => res.data);
    return res;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-data");
        setTimeout(() => {
          if (!window.location.href.includes("login")) window.location.reload();
        }, 200);
      }
    }
    throw e;
  }
}
