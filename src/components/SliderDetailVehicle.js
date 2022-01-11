import React from 'react';

import backSvg from '../assets/icons/back.svg';
import forwardSvg from '../assets/icons/forward.svg';

const host = process.env.REACT_APP_HOST;
function carousel(image, idx) {
  let imgSrc = `${host}/vehicles${image}`;
  if (image === 'default') imgSrc = require('../assets/images/car-default.jpg');
  return (
    <div
      className={`carousel-item carousel-item-vehicle ${idx === 0 && 'active'}`}
      data-bs-interval='false' key={idx}>
      <img src={imgSrc} className='d-block w-100' alt='...' />
      <div className='carousel-caption d-none d-md-block'></div>
    </div>
  );
}

function indicatorPreview(image, idx) {
  let imgSrc = `${host}/vehicles${image}`;
  if (image === 'default') imgSrc = require('../assets/images/car-default.jpg');
  return (
    <div className='img-preview-wrapper' key={idx}>
      <img
        data-bs-target='#carouselExampleDark'
        data-bs-slide-to={idx}
        className='active'
        aria-current='true'
        aria-label={`Slide ${idx}`}
        src={imgSrc}
        width='100%'
        alt=''
      />
    </div>
  );
}

function SliderDetailVehicle(props) {
  const data = props.data;
  console.log('inside slider detail vehicle', data);
  return (
    <>
      <div
        id='carouselExampleDark'
        className='carousel carousel-dark slide'
        data-bs-ride='carousel'
        data-bs-interval="false">
        <div className='carousel-inner'>
        {data.length !== 0
                ? data.map((image, idx) => {
                    return carousel(image, idx);
                  })
                : carousel('default', 0)}
        </div>
        <div className='row preview-images d-none d-sm-flex'>
          <div className='col-2 align-items-center'>
            <button
              href='#prev'
              aria-label='Previous Image'
              className='carousel-control-prev'
              type='button'
              data-bs-target='#carouselExampleDark'
              data-bs-slide='prev'>
              <img src={backSvg} width='18' height='18' alt='' />
            </button>
          </div>
          <div className='col-8'>
            <div className='carousel-indicators'>
              {data.length !== 0
                ? data.map((image, idx) => {
                    return indicatorPreview(image, idx);
                  })
                : indicatorPreview('default', 0)}
            </div>
          </div>
          <div className='col-2 align-items-center'>
            <button
              aria-label='Next Image'
              className='carousel-control-next'
              type='button'
              data-bs-target='#carouselExampleDark'
              data-bs-slide='next'>
              <img src={forwardSvg} width='18' height='18' alt='' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderDetailVehicle;
