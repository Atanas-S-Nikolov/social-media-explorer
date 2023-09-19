import { BrandingSettings, ContentDetails, Statistics } from "./channels";

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

export interface ItemId extends Kind {
  videoId: string;
  channelId: string;
  playlistId: string;
}

interface Item extends YoutubeGlobal {
  id: ItemId;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    [thumbnailsKey]: {
      url: string,
      width: number,
      height: number
    }
  }
}

export interface ChannelItem extends Item {
  brandingSettings: BrandingSettings;
  contentDetails: ContentDetails;
  snippet: Snippet;
  statistics: Statistics;
}
