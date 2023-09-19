import { AxiosResponse } from "axios";

export async function resolveAxiosResponse<T>(promise: Promise<AxiosResponse<T, any>>) {
  return (await promise).data as T;
}
