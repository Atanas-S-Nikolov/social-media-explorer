'use client';

import '@styles/utils/SearchInput.css';

import { useRef, useState, MouseEvent, ChangeEvent } from "react";
import { useMediaQuery, useUpdateEffect } from "@react-hookz/web";

import Button from "./Button";
import Collapse from "./Collapse";

import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

import { capitalize } from 'underscore.string';
import { debounce } from 'underscore';

import useOutsideClick from '@hooks/useOutsideClick';
import useBeforeUnload from '@hooks/useBeforeUnload';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updatePlatformReducer, resetPlatformReducer } from '@redux/slices/platformSlice';

import { getChannels } from '@app/_api/services/YoutubeService';

const platforms = [
  { text: 'Youtube', icon: <YouTubeIcon/> },
  { text: 'Facebook', icon: <FacebookIcon/> },
  { text: 'Instagram', icon: <InstagramIcon/> },
];

export default function SearchInput() {
  const isDesktop = useMediaQuery('(min-width: 426px)', { initializeWithValue: false });
  const platformBtnRef = useRef<HTMLButtonElement>(null);
  const collapseRef = useRef<HTMLDivElement>(null);
  const platformName = useAppSelector(state => state.platform.name);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('Enter YouTube username');
  const [selectText, setSelectText] = useState(platformName);
  const [selectIcon, setSelectIcon] = useState(<YouTubeIcon/>);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchBtnText, setSearchBtnText] = useState('Search');
  const [searchBtnBgColorClass, setSearchBtnBgColorClass] = useState('youtube_bg');
  
  const dispatch = useAppDispatch();

  useUpdateEffect(() => {
    if (isDesktop) {
      setSelectText(platformName);
      setSearchBtnText('Search');
      if (platformName.toLowerCase() === 'instagram')
        setSearchBtnBgColorClass('instagram_bg');
      return;
    }
    setSelectText('');
    setSearchBtnText('');
    if (platformName.toLowerCase() === 'instagram')
      setSearchBtnBgColorClass('instagram_mob_bg');
  })

  useBeforeUnload(() => dispatch(resetPlatformReducer()));

  useOutsideClick(collapseRef, closeSelect, [platformBtnRef])

  function handleSelectOnClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggleSelect();
  }

  function closeSelect() {
    setIsSelectOpen(false);
  }

  function toggleSelect() {
    setIsSelectOpen(prevState => !prevState);
  }

  function handlePlatformChange(event: MouseEvent<HTMLButtonElement>, platform: string) {
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
    dispatch(updatePlatformReducer(capitalizedPlatform));
    setSelectText(capitalizedPlatform);
    closeSelect();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.target;
    const debouncedFn = debounce(() => {
      setSearchQuery(value);
      getChannels(value);
    }, 400);

    debouncedFn();
  }

  return (
    <div className='search_input'>
      <div className="select">
        <Button
          className='select_btn'
          text={selectText}
          startIcon={selectIcon}
          endIcon={<ArrowDropDownIcon/>}
          onClick={handleSelectOnClick}
          ref={platformBtnRef}
        />
        <Collapse
          className="select_collapse"
          open={isSelectOpen}
          ref={collapseRef}
        >
          {platforms.map((platform, index) => (
            <Button
              key={index}
              text={platform.text}
              startIcon={platform.icon}
              onClick={(event: MouseEvent<HTMLButtonElement>) => handlePlatformChange(event, platform.text)}  
            />
          ))}
        </Collapse>
      </div>
      <input className='input' placeholder={inputPlaceholder} onChange={handleInputChange}/>
      <Button
        className={`search_btn ${searchBtnBgColorClass}`}
        text={searchBtnText}
        startIcon={<SearchIcon fontSize='small'/>}
      />
    </div>
  )
}
