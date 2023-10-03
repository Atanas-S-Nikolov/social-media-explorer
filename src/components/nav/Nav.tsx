'use client';

import '@styles/nav/Nav.css';

import { useState, useRef } from 'react';
import { useMediaQuery, useUpdateEffect } from "@react-hookz/web";

import Button from "@components/utils/Button";
import Collapse from '@components/utils/Collapse';

import Link from 'next/link';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@components/utils/IconButton';

import { navigationButtons } from '@utils/navigationButtons';
import { ButtonProps } from "@appTypes/ButtonProps";

const NavButton = (props: ButtonProps) => <Button className="nav_btn" {...props} />;

export default function Nav() {
  const isDesktop = useMediaQuery('(min-width: 520px)', { initializeWithValue: false });
  const logoSrc = isDesktop ? "/logo-gray.png" : "/mobile-logo-gray.png";
  const logoAlt = isDesktop ? "Desktop Social Media Explorer Logo" : "Mobile Social Media Explorer Logo";
  const navMenuRef = useRef<HTMLElement>(null);
  const collapseReservedAreaRef = useRef<HTMLDivElement>(null);
  const [isCollapseOpen, setIsCollapseOpen] = useState({} as any);
  const [toggleMenuIcon, setToggleMenuIcon] = useState(<MenuIcon />);
  const isToggleMenuBtnVissible = !isDesktop;

  useUpdateEffect(() => {
    if (isDesktop) {
      closeCollapse();
      showNavMenu();
      changeCollapseReservedAreaPosition('relative');
    } else {
      hideNavMenu();
      handleToggleMenuIconChange();
    }
  }, [isDesktop])

  function showNavMenu() {
    navMenuRef.current?.classList.remove('hidden_el');
  }

  function hideNavMenu() {
    navMenuRef.current?.classList.add('hidden_el');
  }

  function closeCollapse() {
    setIsCollapseOpen(false);
  }

  function changeCollapseReservedAreaPosition(position: string) {
    const collapseReservedAreaDiv = collapseReservedAreaRef.current;
    if (collapseReservedAreaDiv) {
      collapseReservedAreaDiv.style.position = position;
    }
  }

  function handleNavButtonClick(event: React.MouseEvent<HTMLButtonElement>, id: number) {
    event?.preventDefault();
    setIsCollapseOpen((prevState: any[]) => ({ ...prevState, [id]: !prevState[id] }));
    changeCollapseReservedAreaPosition(isCollapseOpen[id] ? 'relative' : 'fixed');
  }

  function handleToggleMenuOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    navMenuRef.current?.classList.toggle('hidden_el');
    if (isCollapseOpen) {
      closeCollapse();
    }
    handleToggleMenuIconChange();
  }

  function handleToggleMenuIconChange() {
    setToggleMenuIcon(navMenuRef.current?.classList.contains('hidden_el') ? <MenuIcon /> : <CloseIcon />);
  }

  return (
    <>
      <header className='nav'>
        <Link className='logo_link' href='http://localhost:3000'>
          <img className="logo" src={logoSrc} alt={logoAlt} />
        </Link>
        <nav className='nav_menu' ref={navMenuRef}>
          <ul className="nav_list">
            {navigationButtons.map((item, index) => {
              const { btnText, collapseChilds } = item;
              return (
                <li className="nav_item" key={btnText}>
                  <NavButton
                    text={btnText}
                    endIcon={<ArrowDropDownIcon />}
                    onClick={(event) => handleNavButtonClick(event, index)}
                  />
                  <Collapse className='platforms_collapse' open={isCollapseOpen[index]}>
                    {collapseChilds.map(child => {
                      const { text, iconSrc } = child;
                      return (
                        <div className="platform_btn_wrapper" key={text}>
                          <NavButton
                            text={text}
                            startIcon={<img className='platform_logo' src={iconSrc} alt={`${text} icon`} />}
                          />
                        </div>
                      )
                    })}
                  </Collapse>
                </li>
              )
            })}
          </ul>
        </nav>
        {
          isToggleMenuBtnVissible
            ? <IconButton
              className='toggle_menu'
              icon={toggleMenuIcon}
              aria-label='open mobile navigation'
              onClick={handleToggleMenuOnClick}
            />
            : null
        }
      </header>
      <div className='collapse_reserved_area' ref={collapseReservedAreaRef}/>
    </>
  );
}
