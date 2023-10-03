'use client';

import { search } from '@app/_api/utils/actions';
import { useAsync, useMountEffect } from '@react-hookz/web';
import { Suspense } from 'react';

import SearchItem from '@components/search/SearchItem';
import { naturalCmp } from 'underscore.string';

export default function Result({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { platform, query } = searchParams;
  const [state, actions] = useAsync(() => search(query as string, platform as string), []);

  useMountEffect(actions.execute);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        {state.result?.sort((i1, i2) => naturalCmp(i1.brandingSettings.channel.title, i2.brandingSettings.channel.title))
          .map(item => {
            const { id } = item;
            const { customUrl } = item.snippet;
            const { url } = item.snippet.thumbnails.default;
            const { title } = item.brandingSettings.channel;
            const itemUrl = customUrl ? customUrl : id;
            return <SearchItem key={id} itemUrl={itemUrl} imgSrc={url} title={title}/>;
          })}
      </Suspense>
    </main>
  )
}
