import youtube from "../youtube";

import { SEARCH_URL, CHANNELS_URL } from "@constants/urlConstants";
import { BRANDING_SETTINGS, CHANNEL } from "@constants/youtubeConstants";
import { ChannelItem } from "@models/youtube/global";
import { YoutubeGlobalResponse } from "@models/youtube/responses";
import { resolveAxiosResponse } from "../utils/RequestUtils";

function searchChannels(query: string): Promise<YoutubeGlobalResponse<ChannelItem>> {
  return resolveAxiosResponse(youtube.get(SEARCH_URL, {
    params: {
      q: query,
      type: CHANNEL
    }
  }));
}

function findChannels(chanelIds: string): Promise<YoutubeGlobalResponse<ChannelItem>> {
  return resolveAxiosResponse(youtube.get(CHANNELS_URL, {
    params: {
      id: chanelIds,
      part: BRANDING_SETTINGS
    }
  }));
}

export async function getChannels(query: string): Promise<YoutubeGlobalResponse<ChannelItem>> {
  const { items } = await searchChannels(query);
  let channelIds = "";
  const itemsLength = items.length;
  for (let index = 0; index < itemsLength; index++) {
    const id = items[index].id.channelId;
    index === itemsLength - 1
      ? channelIds += id
      : channelIds += `${id},`
  }
  return await findChannels(channelIds);
}
