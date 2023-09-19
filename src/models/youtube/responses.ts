import { YoutubeGlobal, PageInfo } from "./global";

export interface YoutubeGlobalResponse<T> extends YoutubeGlobal {
  pageInfo: PageInfo;
  items: T[];
}
