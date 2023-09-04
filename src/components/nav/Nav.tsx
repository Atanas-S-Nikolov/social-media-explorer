'use client';
import '@styles/nav/Nav.css';
import { useState, useRef } from 'react';
import { useMediaQuery, useUpdateEffect } from "@react-hookz/web";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@components/utils/IconButton';
import NavButton from '@components/nav/NavButton';
import Link from 'next/link';
import { navigationButtons } from '@utils/NavigationButtons';
import Collapse from '@components/utils/Collapse';

export default function Nav() {
  const isDesktop = useMediaQuery('(min-width: 420px)', { initializeWithValue: false });
  const logoSrc = isDesktop ? "/logo-gray.png" : "/mobile-logo-gray.png";
  const logoAlt = isDesktop ? "Desktop Social Media Explorer Logo" : "Mobile Social Media Explorer Logo";
  const navMenuEl = useRef<HTMLElement>(null);
  const [isCollapseOpen, setIsCollapseOpen] = useState({} as any);
  const [toggleMenuIcon, setToggleMenuIcon] = useState(<MenuIcon/>);
  const isToggleMenuBtnVissible = !isDesktop;

  useUpdateEffect(() => {
    if (isDesktop) {
      closeCollapse();
      showNavMenu();
    } else {
      hideNavMenu();
      handleToggleMenuIconChange();
    }
  }, [isDesktop])

  return (
    <header className='nav'>
      <Link className='logo_link' href='http://localhost:3000'>
        <img className="logo" src={logoSrc} alt={logoAlt}/>
      </Link>
      <nav className='nav_menu' ref={navMenuEl}>
        <ul className="nav_list">
          {navigationButtons.map((item, index) => (
            <li className="nav_item" key={crypto.randomUUID()}>
              <NavButton
                text={item.btnText}
                endIcon={<ArrowDropDownIcon/>}
                onClick={(event) => handleNavButtonClick(event, index)}
              />
              <Collapse className='platforms_collapse' open={isCollapseOpen[index]}>
              {item.collapseChilds.map(child => (
                <div className="platform_btn_wrapper" key={crypto.randomUUID()}>
                  <NavButton
                    text={child.text}
                    startIcon={<img className='platform_logo' src={child.iconSrc} alt={`${child.text} icon`}/>}
                  />
                </div>
              ))}
              </Collapse>
            </li>
          ))}
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
  );

  function showNavMenu() {
    navMenuEl.current?.classList.remove('hidden_el');
  }

  function hideNavMenu() {
    navMenuEl.current?.classList.add('hidden_el');
  }

  function closeCollapse() {
    setIsCollapseOpen(false);
  }

  function handleNavButtonClick(event: React.MouseEvent<HTMLButtonElement>, id: number) {
    event?.preventDefault();
    setIsCollapseOpen((prevState: any[]) => ({ ...prevState, [id]: !prevState[id] }));
  }

  function handleToggleMenuOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    navMenuEl.current?.classList.toggle('hidden_el');
    if (isCollapseOpen) {
      closeCollapse();
    }
    handleToggleMenuIconChange();
  }

  function handleToggleMenuIconChange() {
    setToggleMenuIcon(navMenuEl.current?.classList.contains('hidden_el') ? <MenuIcon/> : <CloseIcon/>);
  }
}
