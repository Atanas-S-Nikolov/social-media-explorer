'use client';
import '@styles/utils/SearchInput.css';
import { useState } from "react";
import { useMediaQuery, useUpdateEffect } from "@react-hookz/web";

import Button from "./Button";

import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

import Collapse from "./Collapse";
import { capitalize } from 'underscore.string';

const platforms = [
  { text: 'Youtube', icon: <YouTubeIcon/> },
  { text: 'Facebook', icon: <FacebookIcon/> },
  { text: 'Instagram', icon: <InstagramIcon/> },
];

export default function SearchInput() {
  const isDesktop = useMediaQuery('(min-width: 426px)', { initializeWithValue: false });
  const [platform, setPlatform] = useState('Youtube');
  const [inputPlaceholder, setInputPlaceholder] = useState('Enter YouTube username');
  const [selectText, setSelectText] = useState('Youtube');
  const [selectIcon, setSelectIcon] = useState(<YouTubeIcon/>);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchBtnText, setSearchBtnText] = useState('Search');
  const [searchBtnBgColorClass, setSearchBtnBgColorClass] = useState('youtube_bg');

  useUpdateEffect(() => {
    if (isDesktop) {
      setSelectText(platform);
      setSearchBtnText('Search');
      if (platform.toLowerCase() === 'instagram')
        setSearchBtnBgColorClass('instagram_bg');
      return;
    }
    setSelectText('');
    setSearchBtnText('');
    if (platform.toLowerCase() === 'instagram')
      setSearchBtnBgColorClass('instagram_mob_bg');
  })

  return (
    <div className='search_input'>
      <div className="select">
        <Button
          className='select_btn'
          text={selectText}
          startIcon={selectIcon}
          endIcon={<ArrowDropDownIcon/>}
          onClick={handleSelectOnClick}
        />
        <Collapse className="search_collapse" open={isSelectOpen}>
          {platforms.map((platform, index) => (
            <Button
              key={index}
              text={platform.text}
              startIcon={platform.icon}
              onClick={event => handlePlatformChange(event, platform.text)}  
            />
          ))}
        </Collapse>
      </div>
      <input className='input' placeholder={inputPlaceholder}/>
      <Button className={`search_btn ${searchBtnBgColorClass}`} text={searchBtnText} startIcon={<SearchIcon fontSize='small'/>}/>
    </div>
  )

  function handleSelectOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    closeSelect();
  }

  function closeSelect() {
    setIsSelectOpen(prevState => !prevState);
  }

  function handlePlatformChange(event: React.MouseEvent<HTMLButtonElement>, platform: string) {
    event.preventDefault();
    switch(platform.toLowerCase()) {
      case 'youtube':
        setInputPlaceholder('Enter YouTube username');
        setSelectIcon(<YouTubeIcon/>);
        setSearchBtnBgColorClass('youtube_bg');
        break;
      case 'facebook':
        setInputPlaceholder('Enter Facebook username');
        setSelectIcon(<FacebookIcon/>);
        setSearchBtnBgColorClass('facebook_bg');
        break;
      case 'instagram':
        setInputPlaceholder('Enter Instagram ID');
        setSelectIcon(<InstagramIcon/>);
        setSearchBtnBgColorClass('instagram_bg');
        break;
    }
    const capitalizedPlatform = capitalize(platform);
    setPlatform(capitalizedPlatform);
    setSelectText(capitalizedPlatform);
    closeSelect();
  }
}
