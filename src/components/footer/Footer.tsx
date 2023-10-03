'use client';
import '@styles/footer/Footer.css'; 

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <hr className='divider'/>
      <p>© {CURRENT_YEAR} Social Media Explorer. All rights reserved.</p>
      <section className='contacts_section'>
        <span className='contacts_section_text'>Developer contacts:</span>
        <section className='links'>
          <a className='facebook_link' href='https://www.facebook.com/profile.php?id=100004064927106' target='blank'>
            <FacebookIcon/>
          </a>
          <a className='instagram_link' href='https://www.instagram.com/atanas.s.nikolov/' target='blank'>
            <InstagramIcon/>
          </a>
          <a className='linkedin_link' href='https://www.linkedin.com/in/atanas-nikolov-67b1b1272/' target='blank'>
            <LinkedInIcon/>
          </a>
          <a className='github_link' href='https://github.com/Atanas-S-Nikolov' target='blank'>
            <GitHubIcon/>
          </a>
          <a className='email_link' href='mailto:atanas.stoyanov1199@gmail.com'>
            <MailOutlineIcon/>
          </a>
        </section>
      </section>
    </footer>
  )
}
