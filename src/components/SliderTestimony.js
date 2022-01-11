import React from 'react';
import {Link} from 'react-router-dom';

import prevSvg from '../assets/icons/previous.svg';
import nextSvg from '../assets/icons/next.svg';
import circleSvg from '../assets/icons/circle.svg';

const rateStar = (rate, testiID) => {
  const elements = [];
  for (let j = 0; j < rate; j++) {
    const element = (
      <i className='bi bi-star-fill checked' key={`${testiID}${j}`}></i>
    );
    elements.push(element);
  }
  if (rate < 5) {
    for (let i = rate; i < 5; i++) {
      const element = (
        <i className='bi bi-star-fill' key={`${testiID}${i}`}></i>
      );
      elements.push(element);
    }
  }
  return elements;
};
function SliderTestimony(props) {
  const testimonyData = props.dataTestimony;
  const testimonies = [];
  for (let i = 0; i < 3; i++) {
    const profilPhoto =
      testimonyData[i].image !== 'null' &&
      testimonyData[i].image !== ''
        ? `${process.env.REACT_APP_HOST}/user${testimonyData[i].image}`
        : require('../assets/images/default2.jpg');
    let carouselClass = 'carousel-item';
    console.log(testimonyData[i]);
    console.log(typeof testimonyData[i].image);
    if (i === 0) {
      carouselClass = 'carousel-item active';
    }
    const element = (
      <div
        className={carouselClass}
        style={{minHeight: '500px'}}
        data-bs-interval='5000'
        key={testimonyData[i].testiID}>
        <div className='row testimony'>
          <div className='col-12 col-sm-6'>
            <div className='col-12'>
              {rateStar(testimonyData[i].rate, testimonyData[i].testiID)}
            </div>
            <div className='testimonies col-12 col-sm-10 col-md-8'>
              <blockquote className='blockquote'>
                <p className='mb-0'>”{testimonyData[i].testimony}”</p>
              </blockquote>
            </div>
            <div className='col-12 user'>
              <Link to='/profile' style={{color: 'black'}}>
                {testimonyData[i].full_name}
              </Link>
              <br />
              <span
                style={{
                  fontSize: 'calc(12px + 0.3vw)',
                  color: '#393939b4',
                }}>
                {testimonyData[i].return_date}
              </span>
            </div>
          </div>
          <div className='col-12 col-sm-6 mx-auto'>
            <div className='wrapper-all'>
              <div className='testimony-images'>
                <img src={profilPhoto} alt='testimony' className='user-image' />
                <figcaption>
                  <div className='text-center wrapper-testimony-btn'>
                    <a href='home' aria-label='Previous testimony'>
                      <img
                        src={prevSvg}
                        className='non-active next-previous carousel-control-prev'
                        data-bs-target='#carouselExampleControls'
                        data-bs-slide='prev'
                        width='25px'
                        height='25px'
                        alt=''
                      />
                    </a>
                    <a href='home' aria-label='Next testimony'>
                      <img
                        src={nextSvg}
                        className='active next-previous carousel-control-next'
                        data-bs-target='#carouselExampleControls'
                        data-bs-slide='next'
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
    );
    testimonies.push(element);
  }
  return testimonies;
}

export default SliderTestimony;
