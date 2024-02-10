import "@styles/search/SearchItem.css";

import { SearchItemProps } from "@appTypes/SearchItemProps";
import { useAppSelector } from "@redux/hooks";
import { useState } from "react";
import { useMountEffect } from "@react-hookz/web";
import { FACEBOOK, INSTAGRAM, YOUTUBE } from "@constants/platfroms";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Link from "next/link";
import { YOUTUBE_URL } from "@constants/urlConstants";

export default function SearchItem({ itemId, itemUrl, imgSrc, title }: SearchItemProps) {
  const { name: platformName } = useAppSelector(state => state.platform);
  const [itemBorderClass, setItemBorderClass] = useState("");

  useMountEffect(() => {
    switch(platformName){
      case YOUTUBE:
        setItemBorderClass("youtube_border-bottom-right");
        break;
      case FACEBOOK:
        setItemBorderClass("facebook_border-bottom-right");
        break;
      case INSTAGRAM:
        setItemBorderClass("instagram_border-bottom-right");
        break;
    }
  });

  return (
    <section className={`search_item ${itemBorderClass}`}>
      <img src={imgSrc} alt={title}/>
      <div className="wrapper">
        <Link className="link" href={`/account/${itemId}/${itemUrl}`}>{title}</Link>
        <Link className="visit_icon-btn" href={`${YOUTUBE_URL}/${itemUrl}`} target="blank"><OpenInNewIcon/></Link>
      </div>
    </section>
  )
}
