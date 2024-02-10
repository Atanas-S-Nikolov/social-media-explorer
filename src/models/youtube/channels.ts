import { Item, Snippet } from "./global";

export interface ContentDetails {
  relatedPlaylists: {
    likes: string;
    favorites: string;
    uploads: string
  }
}

export interface Statistics {
  viewCount: number;
  subscriberCount: number;
  hiddenSubscriberCount: boolean;
  videoCount: number;
}

export interface BrandingSettings {
  channel: {
    title: string;
    description: string;
    keywords: string;
    trackingAnalyticsAccountId: string
    moderateComments: boolean;
    unsubscribedTrailer: string;
    defaultLanguage: string;
    country: string;
  }
}

export interface ChannelItem {
  id: string;
  brandingSettings: BrandingSettings;
  contentDetails: ContentDetails;
  snippet: Snippet;
  statistics: Statistics;
}

export interface SearchChannelItem extends Item {
  brandingSettings: BrandingSettings;
  contentDetails: ContentDetails;
  snippet: Snippet;
  statistics: Statistics;
}
