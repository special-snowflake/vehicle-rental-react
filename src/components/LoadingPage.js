import React from 'react';
import '../assets/css/LoadingPage.css';

function LoadingPage() {
  return (
    <>
      <div
        className='row loading-wrapper'
        style={{
          backgroundImage: `url("../assets/icons/circle.svg")`,
          backgroundPosition: 'center bottom',
          backgroundSize: '2vw 2vw',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className='col-6 col-sm-3 row-header-loading'></div>
        <div className="row">
          <div className="col-12 loading-content">

          </div>
        </div>

      </div>
    </>
  );
}

export default LoadingPage;
