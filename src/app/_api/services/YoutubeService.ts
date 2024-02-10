import youtube from "../youtube";

import { SEARCH_URL, CHANNELS_URL } from "@constants/urlConstants";
import { BRANDING_SETTINGS, CHANNEL, CONTENT_DETAILS, SNIPPET, STATISTICS, STATUS } from "@constants/youtubeConstants";
import { ChannelItem, SearchChannelItem } from "@models/youtube/channels";
import { YoutubeGlobalResponse } from "@models/youtube/responses";
import { resolveAxiosResponse } from "../utils/RequestUtils";

function searchChannels(query: string): Promise<YoutubeGlobalResponse<SearchChannelItem>> {
  return resolveAxiosResponse(youtube.get(SEARCH_URL, {
    params: {
      q: query,
      type: CHANNEL
    }
  }));
}

function findChannels(chanelIds: string, part: string): Promise<YoutubeGlobalResponse<ChannelItem>> {
  return resolveAxiosResponse(youtube.get(CHANNELS_URL, {
    params: {
      id: chanelIds,
      part
    }
  }));
}

function getChannelIds(items?: SearchChannelItem[]) {
  let channelIds = "";
  if (items) {
    const itemsLength = items.length;
    for (let index = 0; index < itemsLength; index++) {
      const id = items[index].id.channelId;
      index === itemsLength - 1
        ? channelIds += id
        : channelIds += `${id},`
    }
  }
  return channelIds;
}

export async function getChannels(query: string): Promise<ChannelItem[]> {
  const items = (await searchChannels(query))?.items;
  return (await findChannels(getChannelIds(items), `${BRANDING_SETTINGS},${SNIPPET}`)).items;
}

export async function getChannelById(id: string): Promise<ChannelItem> {
  return (await findChannels(id, `${CONTENT_DETAILS},${SNIPPET},${STATISTICS},${STATUS}`)).items[0];
}
