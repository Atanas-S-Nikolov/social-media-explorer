import { AxiosResponse } from "axios";

export async function resolveAxiosResponse<T>(promise: Promise<AxiosResponse<T, any>>) {
  try {
    return (await promise).data as T
  } catch(error) {
    console.log(error);
  }
  return {} as T;
}
