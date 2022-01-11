import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import searchSvg from '../assets/icons/search.svg';
import forwarSvg from '../assets/icons/forward.svg';
import downSvg from '../assets/icons/down.svg';

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
          <div className='col-12 col-md-8 p-0'>
            <div className='col-11'>
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
            <div className='info-history row'>
              <di className='info-history-wrapper col-10 col-sm-11 mb-2'>
                Please finish your payment for vespa for Vespa Rental Jogja
                <img src={forwarSvg} alt='next' />
              </di>
              <div className='col-2 col-sm-1 '>
                <input type='checkbox' className='checkbox-history m-auto' />
              </div>
              <di className='info-history-wrapper col-10 col-sm-11 mb-2'>
                Your payment has been confirmed!
                <img src={forwarSvg} alt='next' />
              </di>
              <div className='col-2 col-sm-1 m-auto'>
                <input type='checkbox' className='checkbox-history m-auto' />
              </div>
            </div>
            <div className='history-list p-0 text-start mt-4 row'>
              <h5 className='list-header'>A week ago</h5>
              <div className='history-product col-10 col-sm-11 p-0 mb-4 d-flex'>
                <div className='history-img-wrapper'>
                  <img
                    src={require('../assets/images/iqx-azmi-jn01MSrsUpE-unsplash-cmobile.webp')}
                    alt=''
                  />
                </div>
                <div className='history-product-info mt-auto mb-auto'>
                  <p className='vehicle-detail-header'>Fixie - Gray Only</p>
                  <p className='date-rental'>Jan 18 to 21 2020</p>
                  <p className='fw-bold'>Prepayment : Rp. 245.000</p>
                  <p className='availabiliy mt-2'>Has been returned</p>
                </div>
              </div>
              <div className='col-2 col-sm-1 m-auto'>
                <input type='checkbox' className='checkbox-history' />
              </div>
              <div className='history-product col-10 col-sm-11 p-0 mb-4 d-flex'>
                <div className='history-img-wrapper'>
                  <img
                    src={require('../assets/images/kilarov-zaneit-nan5wYNRwhs-unsplash.webp')}
                    alt=''
                  />
                </div>
                <div className='history-product-info mt-auto mb-auto'>
                  <p className='vehicle-detail-header'>Jeep - Juventus</p>
                  <p className='date-rental'>Jan 18 to 21 2020</p>
                  <p className='fw-bold'>Prepayment : Rp. 245.000</p>
                  <p className='availabiliy mt-2'>Has been returned</p>
                </div>
              </div>
              <div className='col-2 col-sm-1 m-auto'>
                <input type='checkbox' className='checkbox-history' />
              </div>
              <div className='col-12 col-sm-11 p-0'>
                <button className='btn btn-yellow'>Delete</button>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 mb-3 p-0'>
            <section className='new-arrival-wrapper mx-auto text-center'>
              <h3 className='m-3'>New Arrival</h3>
              <div className='new-arrival-box'>
                <div className='vehicle-content d-flex justify-content-center mb-3'>
                  <div className='vehicle-images'>
                    <Link to={`/vehicle/1`}>
                      <img
                        src={require('../assets/images/car-default.jpg')}
                        alt='vehicles'
                      />
                      <figcaption>
                        <span className='fig-title'>Lamborghini</span>
                        <br />
                        <span className='fig-subtitle'>South Jakarta</span>
                      </figcaption>
                    </Link>
                  </div>
                </div>
                <div className='vehicle-content d-flex justify-content-center mb-3'>
                  <div className='vehicle-images'>
                    <Link to={`/vehicle/1`}>
                      <img
                        src={require('../assets/images/car-default.jpg')}
                        alt='vehicles'
                      />
                      <figcaption>
                        <span className='fig-title'>Lamborghini</span>
                        <br />
                        <span className='fig-subtitle'>South Jakarta</span>
                      </figcaption>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-12 view-more mt-4 mb-4'>
                View More <br />
                <img src={downSvg} alt='view more' />
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
