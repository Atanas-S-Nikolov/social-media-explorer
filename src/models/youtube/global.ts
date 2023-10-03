import { thumbnailsKey } from "@constants/youtubeConstants";

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface Kind {
  kind: string;
}

export interface YoutubeGlobal extends Kind {
  etag: string;
}

interface ItemId extends Kind {
  videoId: string;
  channelId: string;
  playlistId: string;
}

export interface Item extends YoutubeGlobal {
  id: ItemId;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  customUrl: string;
  thumbnails: {
    [thumbnailsKey]: {
      url: string,
      width: number,
      height: number
    }
  }
}


