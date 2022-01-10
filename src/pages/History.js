import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import backSvg from '../assets/icons/back.svg';
import mbakmbak from '../assets/images/michael-dam-mEZ3PoFGs_k-unsplash-profile.webp';
import searchSvg from '../assets/icons/search.svg';

function History() {
  return (
    <>
      <Header />
      <div
        className='row content d-flex flex-row align-items-center content-search'
        style={{
          backgroundImage: `url("../assets/icons/circle.svg")`,
          backgroundPosition: 'center bottom',
          backgroundSize: '2vw 2vw',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className='row'>
          <div className='col-11 col-md-7'>
            <div className='col-12'>
              <div className='history-search-wrapper'>
                <input
                  type='text'
                  placeholder='Search history'
                  className='history-search'
                />
                <button type='submit' className='search-icon'>
                  <img
                    src={searchSvg}
                    alt='search button'
                    className='history-search-button'
                    width={30}
                    height={30}
                  />
                </button>
              </div>
            </div>
            <div className='col-6 col-md-5 col-lg-4'>
              <select name='' id='' className='history-search-filter'>
                <option value='type'>Type</option>
                <option value='date'>Date Added</option>
                <option value='name'>Name</option>
                <option value='favourite'>Favourite Product</option>
              </select>
            </div>
          </div>
          <div className='col-1 mx-auto text-center'>
            Delete
            <input type='checkbox' name='' id='' className='checkbox-history' />
          </div>
          <div className='col-12 col-md-4 mb-3'>
            <section className='new-arrival-wrapper mx-auto text-center'>
              <h3 className='mt-3'>New Arrival</h3>
              <div className='new-arrival-box'>
                <div className='vehicle-content d-flex justify-content-center'>
                  <div className='vehicle-images'>
                    <Link to={`/vehicle/1`}>
                      <img src={require('../assets/images/car-default.jpg')} alt='vehicles' />
                      <figcaption>
                        <span className='fig-title'>
                          Lamborghini
                        </span>
                        <br />
                        <span className='fig-subtitle'>
                          South Jakarta
                        </span>
                      </figcaption>
                    </Link>
                  </div>
                </div>
                <br />
                <div className='vehicle-content d-flex justify-content-center'>
                  <div className='vehicle-images'>
                    <Link to={`/vehicle/1`}>
                      <img src={require('../assets/images/car-default.jpg')} alt='vehicles' />
                      <figcaption>
                        <span className='fig-title'>
                          Lamborghini
                        </span>
                        <br />
                        <span className='fig-subtitle'>
                          South Jakarta
                        </span>
                      </figcaption>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default History;
