import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';

import backSvg from '../assets/icons/back.svg';

export default class ReservationDate extends Component {
  state = {
    detailVehicle: null,
    isSuccess: true,
  };
  getDetailVehicle = (id) => {
    const urlDetail = process.env.REACT_APP_HOST + `/vehicles/detail/${id}`;
    console.log('url', urlDetail);
    axios
      .get(urlDetail)
      .then((response) => {
        const data = response.data.data;
        console.log('data-detail', data.id);
        this.setState({
          detailVehicle: data,
          isSuccess: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const vehicleId = this.props.vid;
    console.log('id', vehicleId);
    this.getDetailVehicle(vehicleId);
  }
  render() {
    const {isSuccess} = this.state;
    return (
      <>
        <Header />
        {isSuccess ? (
          <div>
            <main>
              <div className='row text-left'>
                <div className='.d-none .d-sm-block col-sm-1'></div>
                <div className='col-12 col-sm-10'>
                  <div className='row content content-center'>
                    <div className='back-detail'>
                      <div className='col-12'>
                        <Link to='/home'>
                          <img
                            src={backSvg}
                            alt=''
                            width='23px'
                            height='23px'
                          />
                          <span style={{paddingLeft: '10px'}}> Detail </span>
                        </Link>
                      </div>
                    </div>
                    <div className='col-12 col-sm-6 vehicle-noslide-detail'>
                      <div className='nonslide-img-wrapper'>
                        <img
                          src={require('../assets/images/iqx-azmi-jn01MSrsUpE-unsplash-cmobile.webp')}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='col-12 col-sm-6 vehicle-info-details'>
                      <span className='vehicle-detail-header'>
                        {'brand'} - {'model'}
                      </span>
                      <br />
                      <span className='vehicle-detail-subheader'>{'city'}</span>
                      <br />
                      <br />
                      <section className='box-qty'>
                        <p>Qt: 2 bikes</p>
                        <p>No Prepayment</p>
                      </section>
                      <section className='box-detail'>
                        <h3 className='box-detail-header'>Details: </h3>
                        <p className='count-bike'>1 Bike Rp.78.000</p>
                        <p className='count-bike'>1 Bike Rp.78.000</p>
                      </section>
                    </div>
                    <div className='col 12 mt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-12'></div>
                        {/* <div className='col-12 col-sm-4'>
                          <a href='#chat' className='btn btn-black'>
                            Chat Admin
                          </a>
                        </div>
                        <div className='col-12 col-sm-4'>
                          <a href='#reservation' className='btn btn-gold'>
                            Reservation
                          </a>
                        </div>
                        <div className='col-12 col-sm-3 like-item'>
                          <a href='#Like' className='btn btn-black'>
                            <i
                              className='bi bi-heart-fill'
                              style={{fontSize: '13px'}}></i>{' '}
                            Like
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='.d-none .d-sm-block col-sm-1'></div>
              </div>
            </main>
          </div>
        ) : (
          <LoadingPage />
        )}
        <Footer />
      </>
    );
  }
}
