'use client';
import '@styles/nav/Nav.css';
import { useState } from 'react';
import { useMediaQuery, useUpdateEffect } from "@react-hookz/web";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@components/utils/IconButton';
import NavButton from '@components/nav/NavButton';
import Link from 'next/link';
import { navigationButtons } from '@app/utils/NavigationButtons';
import Collapse from '@components/utils/Collapse';

export default function Nav() {
  const isDesktop = useMediaQuery('(min-width: 350px)', { initializeWithValue: false });
  const logoSrc = isDesktop ? "/logo-gray.png" : "/mobile-logo-gray.png";
  const logoAlt = isDesktop ? "Desktop Social Media Explorer Logo" : "Mobile Social Media Explorer Logo";
  const navMenuEl = document.querySelector('.nav_menu');
  const [isCollapseOpen, setIsCollapseOpen] = useState({} as any);

  useUpdateEffect(() => {
    isDesktop ? showNavMenu() : hideNavMenu();
  }, [isDesktop])

  return (
    <header className='nav'>
      <Link className='logo_link' href='http://localhost:3000'>
        <img className="logo" src={logoSrc} alt={logoAlt}/>
      </Link>
      <nav className='nav_menu'>
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
      <IconButton
        className='hamburger'
        icon={<MenuIcon/>}
        aria-label='open mobile navigation'
        onClick={handleHamburgerOnClick}
      />
    </header>
  );

  function showNavMenu() {
    navMenuEl?.classList.remove('hidden_el');
  }

  function hideNavMenu() {
    navMenuEl?.classList.add('hidden_el');
  }

  function handleNavButtonClick(event: React.MouseEvent<HTMLButtonElement>, id: number) {
    event?.preventDefault();
    setIsCollapseOpen((prevState: any[]) => ({ ...prevState, [id]: !prevState[id] }));
  }

  function handleHamburgerOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    navMenuEl?.classList.toggle('hidden_el');
    if (isCollapseOpen) {
      setIsCollapseOpen(false);
    }
  }
}
