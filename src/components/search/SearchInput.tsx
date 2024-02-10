'use client';

import '@styles/search/SearchInput.css';

import { useRouter } from 'next/navigation';

import { useRef, useState, MouseEvent, ChangeEvent, KeyboardEvent } from "react";
import { useMediaQuery, useUpdateEffect, useDebouncedState } from "@react-hookz/web";

import Button from "../utils/Button";
import Collapse from "../utils/Collapse";

import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

import { capitalize } from 'underscore.string';

import useOutsideClick from '@hooks/useOutsideClick';
import useBeforeUnload from '@hooks/useBeforeUnload';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updatePlatformReducer, resetPlatformReducer } from '@redux/slices/platformSlice';

import { FACEBOOK, INSTAGRAM, YOUTUBE } from '@constants/platfroms';

const platforms = [
  { text: YOUTUBE, icon: <YouTubeIcon/> },
  { text: FACEBOOK, icon: <FacebookIcon/> },
  { text: INSTAGRAM, icon: <InstagramIcon/> },
];

export default function SearchInput() {
  const isDesktop = useMediaQuery('(min-width: 520px)', { initializeWithValue: false });
  const platformBtnRef = useRef<HTMLButtonElement>(null);
  const collapseRef = useRef<HTMLDivElement>(null);
  const platformName = useAppSelector(state => state.platform.name);
  const [searchQuery, setSearchQuery] = useDebouncedState('', 400);
  const [inputPlaceholder, setInputPlaceholder] = useState('Enter YouTube username');
  const [selectText, setSelectText] = useState(capitalize(platformName));
  const [selectIcon, setSelectIcon] = useState(<YouTubeIcon/>);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchBtnText, setSearchBtnText] = useState('Search');
  const [searchBtnBgColorClass, setSearchBtnBgColorClass] = useState('youtube_bg');
  const router = useRouter();
  
  const dispatch = useAppDispatch();

  useUpdateEffect(() => {
    if (isDesktop) {
      setSelectText(capitalize(platformName));
      setSearchBtnText('Search');
      if (platformName.toLowerCase() === INSTAGRAM)
        setSearchBtnBgColorClass('instagram_bg');
      return;
    }
    setSelectText('');
    setSearchBtnText('');
    if (platformName.toLowerCase() === INSTAGRAM)
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
      case YOUTUBE:
        setInputPlaceholder('Enter YouTube username');
        setSelectIcon(<YouTubeIcon/>);
        setSearchBtnBgColorClass('youtube_bg');
        break;
      case FACEBOOK:
        setInputPlaceholder('Enter Facebook username');
        setSelectIcon(<FacebookIcon/>);
        setSearchBtnBgColorClass('facebook_bg');
        break;
      case INSTAGRAM:
        setInputPlaceholder('Enter Instagram ID');
        setSelectIcon(<InstagramIcon/>);
        setSearchBtnBgColorClass('instagram_bg');
        break;
    }
    dispatch(updatePlatformReducer(platform));
    closeSelect();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.target;
    setSearchQuery(value);
  }

  function handleInputEnterPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key.toLowerCase() === 'enter') {
      navigateToSearchResult();
    }
  }

  function handleSearchButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    navigateToSearchResult();
  }

  function navigateToSearchResult() {
    if (searchQuery.trim()) {
      router.push(`search/?${new URLSearchParams({ platform: platformName.toLowerCase(), query: searchQuery})}`);
    }
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
              text={capitalize(platform.text)}
              startIcon={platform.icon}
              onClick={(event: MouseEvent<HTMLButtonElement>) => handlePlatformChange(event, platform.text)}  
            />
          ))}
        </Collapse>
      </div>
      <input
        className='input'
        placeholder={inputPlaceholder}
        onChange={handleInputChange}
        onKeyDown={handleInputEnterPress}
      />
      <Button
        className={`search_btn ${searchBtnBgColorClass}`}
        text={searchBtnText}
        startIcon={<SearchIcon fontSize='small'/>}
        onClick={handleSearchButtonClick}
      />
    </div>
  )
}
