import { FACEBOOK, INSTAGRAM, YOUTUBE } from "@constants/platfroms";

import { getChannels } from '@app/_api/services/YoutubeService';

export async function search(query: string, platfrom: string) {
  switch (platfrom) {
    case YOUTUBE:
      return (await getChannels(query));
    case FACEBOOK:
      break;
    case INSTAGRAM:
      break;
  }
}
