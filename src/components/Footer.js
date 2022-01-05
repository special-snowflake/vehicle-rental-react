import React from 'react';
import logoVehicleRental from '../assets/icons/logo-vehicle-rental.svg';
import twitterSvg from '../assets/icons/twitter.svg';
import facebookSvg from '../assets/icons/facebook.svg';
import instagramSvg from '../assets/icons/instagram.svg';
import linkedinSvg from '../assets/icons/linkedin.svg';
import youtubeSvg from '../assets/icons/youtube.svg';

function Footer() {
  return (
    <>
      <footer className='row foot'>
        <div className='col-lg-6 col-md-3 col-sm-12 col-12'>
          <img src={logoVehicleRental} alt='Icon' width='25px' height='25px' />
          <br />
          <br />
          <p style={{textAlign: 'justify'}}>
            Plan and book your perfect trip with expert advice, travel tips for
            vehicle information from us.
          </p>
          <p>&copy;2020 Vehicle Rental Center. All rights reserved.</p>
        </div>
        <div className='col-lg-2 col-md-3 col-sm-4 col-6'>
          <div className='footer-title'>Destinations</div>
          <ul>
            <li key='Bali'>Bali</li>
            <li key='Yogyakarta'>Yogyakarta</li>
            <li key='Jakarta'>Jakarta</li>
            <li key='Kalimantan'>Kalimantan</li>
            <li key='Malang'>Malang</li>
          </ul>
        </div>
        <div className='col-lg-2 col-md-3 col-sm-4 col-6'>
          <div className='footer-title'>Vehicle</div>
          <ul>
            <li key='Bike'>Bike</li>
            <li key ='Cars'>Cars</li>
            <li key='Motorbike'>Motorbike</li>
            <li key='Return'>Return Times</li>
            <li key='FAQ'>FAQs</li>
          </ul>
        </div>
        <div
          className='col-lg-2 col-md-3 col-sm-4 col-6'
          style={{marginRight: 0}}>
          <div className='footer-title'>Interest</div>
          <ul>
            <li key='Adventure'>Adventure Travel</li>
            <li key='Art'>Art and Culture</li>
            <li key='Nature'>Wildlife and Nature</li>
            <li key='Family'>Family Holiday</li>
            <li key='Culinar'>Culinary Trip</li>
          </ul>
        </div>
        <div className='footer-info'>
          <div className='wrapper text-center col-12 mx-auto'>
            <div className='col-12 social-icons'>
              <a href='home'>
                <img
                  src={twitterSvg}
                  alt='twitter'
                  width='20px'
                  height='20px'
                />
              </a>
              <a href='home'>
                <img
                  src={facebookSvg}
                  alt='facebook'
                  height='20px'
                  width='20px'
                />
              </a>
              <a href='home'>
                <img
                  src={instagramSvg}
                  alt='instagram'
                  width='20px'
                  height='20px'
                />
              </a>
              <a href='home'>
                <img
                  src={linkedinSvg}
                  alt='linkedin'
                  width='20px'
                  height='20px'
                />
              </a>
              <a href='home'>
                <img
                  src={youtubeSvg}
                  alt='youtube'
                  width='20px'
                  height='20px'
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
