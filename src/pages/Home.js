import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/css/Home.css';
import '../assets/css/Homepage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import prevSvg from '../assets/icons/previous.svg';
import nextSvg from '../assets/icons/next.svg';
import circleSvg from '../assets/icons/circle.svg';
import forwardSvg from '../assets/icons/forward.svg';

function Home() {
  return (
    <>
      <Header />
      <main>
        <div className='row'>
          <div className='col-12 poster'>
            <div className='layer'>
              <div className='row'>
                <div className='col-xl-6 col-12'>
                  <div className='tagline-wrapper' style={{minHeight: '20vh'}}>
                    <div className='col-12 col-sm-6 col-md-12 tagline'>
                      Explore And Travel
                    </div>
                    <div className='col-12'>
                      <div className='sub-tagline'>Vehicle Finder</div>
                    </div>
                  </div>
                </div>
                <div
                  className='col-12 form'
                  style={{minHeight: '25vh', paddingTop: '10vh'}}>
                  <div className='wrapper col-12 col-sm-8 col-md-8 col-xl-6'>
                    <div className='row' style={{color: '#393939'}}>
                      <div className='col-sm-6 col-12'>
                        <select>
                          <option value='Location' selected>
                            Location
                          </option>
                          <option value='Bali'>Bali</option>
                          <option value='Yogyakarta'>Yogyakarta</option>
                          <option value='Jakarta'>Jakarta</option>
                          <option value='Kalimantan'>Kalimantan</option>
                          <option value='Malang'>Malang</option>
                        </select>
                      </div>
                      <div className='col-sm-6 col-12'>
                        <select>
                          <option value='Type' selected>
                            Type
                          </option>
                          <option value='Car'>Car</option>
                          <option value='Bike'>Bike</option>
                          <option value='Motorcycle'>Motorcycle</option>
                          <option value='Sports Car'>Sports Car</option>
                        </select>
                      </div>
                      <div className='col-sm-6 col-12'>
                        <select>
                          <option value='Payment' selected>
                            Payment
                          </option>
                        </select>
                      </div>
                      <div className='col-sm-6 col-12'>
                        <input
                          type='date'
                          name='date'
                          id=''
                          placeholder='now'
                        />
                      </div>
                    </div>
                    <div className='col-sm-4 col-8'>
                      <a href='#explore' className='btn btn-md btn-yellow'>
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className=' row content d-flex flex-row align-items-center justify-content-between'
          style={{
            backgroundImage: `url("../assets/icons/circle.svg")`,
            backgroundPosition: 'center bottom',
            backgroundSize: '2vw 2vw',
            backgroundRepeat: 'no-repeat',
          }}>
          <div className='col-8 col-sm-9 row-header'>Popular in Town</div>
          <div
            className='col-4 col-sm-3 text-right align-bottom'
            style={{textAlign: 'right'}}>
            <a href='#view-all' className='more'>
              View All
              <img
                src={forwardSvg}
                width='14px'
                height='14px'
                alt='View All'
                style={{
                  filter:
                    'invert(70%) sepia(32%) saturate(5220%) hue-rotate(347deg) brightness(102%) contrast(97%)',
                }}
              />
            </a>
          </div>
          <div className='col-md-3 col-sm-6 col-6 text-center vehicle-card'>
            <div className='vehicle-content'>
              <div className='vehicle-images'>
                <Link to='/detail-vehicle'>
                  <img
                    src={require('../assets/images/eric-muhr-ZPsJW-OLZQM-unsplash-preview.webp')}
                    alt='vehicles'
                  />
                  <figcaption>
                    <span className='fig-title'>Merapi </span>
                    <br />
                    <span className='fig-subtitle'> Yogyakarta </span>
                  </figcaption>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 col-6 text-center vehicle-card card-right'>
            <div className='vehicle-content'>
              <div className='vehicle-images'>
                <Link to='/detail-vehicle'>
                  <img
                    src={require('../assets/images/manny-moreno-tdVPKfC_rP8-unsplash-preview.webp')}
                    alt='vehicles'
                  />
                  <figcaption>
                    <span className='fig-title'>Teluk Bogam </span>
                    <br />
                    <span className='fig-subtitle'> Kalimantan </span>
                  </figcaption>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 col-6 text-center vehicle-card'>
            <div className='vehicle-content'>
              <div className='vehicle-images'>
                <Link to='/detail-vehicle'>
                  <img
                    src={require('../assets/images/iqx-azmi-jn01MSrsUpE-unsplash-preview.webp')}
                    alt='vehicles'
                  />
                  <figcaption>
                    <span className='fig-title'>Bromo </span>
                    <br />
                    <span className='fig-subtitle'> Malang </span>
                  </figcaption>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 col-6 vehicle-card card-right'>
            <div className='vehicle-content text-right'>
              <div className='vehicle-images'>
                <Link to='/detail-vehicle'>
                  <img
                    src={require('../assets/images/chuttersnap-AcdxiyTSR0A-unsplash-preview.webp')}
                    alt='vehicles'
                  />
                  <figcaption>
                    <span className='fig-title'>Malioboro </span>
                    <br />
                    <span className='fig-subtitle'> Yogyakarta </span>
                  </figcaption>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className='row content'
          style={{
            backgroundImage: `url(./assets/icons/circle.svg)`,
            backgroundPosition: '2rem center',
            backgroundSize: '2vw 2vw',
            backgroundRepeat: 'no-repeat',
          }}>
          <div className='col-12 row-header'>Testimonials</div>
          <div className='row testimony'>
            <div className='col-12 col-sm-6'>
              <div className='col-12'>
                <i className='bi bi-star-fill checked'></i>
                <i className='bi bi-star-fill checked'></i>
                <i className='bi bi-star-fill checked'></i>
                <i className='bi bi-star-fill checked'></i>
                <i className='bi bi-star-fill'></i>
              </div>
              <div className='testimonies col-12 col-sm-10 col-md-8'>
                <blockquote className='blockquote'>
                  <p className='mb-0'>
                    ”It was the right decision to rent vehicle here, I spent
                    less money and enjoy the trip. It was an amazing experience
                    to have a ride for wildlife trip!”
                  </p>
                </blockquote>
              </div>
              <div className='col-12 user'>
                <Link to='/profile' style={{color: 'black'}}>
                  Edward Newgate
                </Link>
                <br />
                <span
                  style={{fontSize: 'calc(13px + 0.3vw)', color: '#393939b4'}}>
                  Founder Circle
                </span>
              </div>
            </div>
            <div className='col-12 col-sm-6 mx-auto'>
              <div className='wrapper-all'>
                <div className='testimony-images'>
                  <img
                    src={require('../assets/images/Ek66rgtXgAAww_V.webp')}
                    alt='testimony'
                    className='user-image'
                  />
                  <figcaption>
                    <div className='text-center wrapper-testimony-btn'>
                      <a href='home' aria-label='Previous testimony'>
                        <img
                          src={prevSvg}
                          className='non-active next-previous'
                          width='25px'
                          height='25px'
                          alt=''
                        />
                      </a>
                      <a href='home' aria-label='Next testimony'>
                        <img
                          src={nextSvg}
                          className='active next-previous'
                          width='25px'
                          height='25px'
                          alt=''
                        />
                      </a>
                    </div>
                  </figcaption>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 32 32'
                    className='border-plus'
                    fill='none'>
                    <path
                      d='M19.8172 30.9471L19.8218 20.6474C19.8782 20.2542 20.1974 19.8988 20.6103 19.8243L30.9316 19.8358C31.3257 19.8924 31.6448 19.5369 31.7201 19.0126L31.7415 13.2636C31.7979 12.8704 31.4415 12.5517 30.9161 12.4762L20.5947 12.4647C20.2007 12.4081 19.8443 12.0893 19.7694 11.6773L19.7739 1.37761C19.8304 0.984415 19.474 0.665664 18.9485 0.590174L13.1874 0.565064C12.7933 0.508447 12.4741 0.863895 12.3988 1.38816L12.3943 11.6878C12.3379 12.081 12.0187 12.4365 11.6058 12.5109L1.28443 12.4995C0.890369 12.4428 0.571189 12.7983 0.495893 13.3226L0.474558 19.0716C0.418086 19.4648 0.774517 19.7836 1.29994 19.8591L11.6213 19.8705C12.0154 19.9271 12.3718 20.2459 12.4467 20.6579L12.4421 30.9576C12.3856 31.3508 12.7421 31.6695 13.2675 31.745L19.0287 31.7702C19.4415 31.6957 19.7607 31.3403 19.8172 30.9471Z'
                      fill='#FDD08D'
                    />
                  </svg>
                  <img
                    src={circleSvg}
                    width='25'
                    height='25'
                    className='border-circle'
                    alt='user frame'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
