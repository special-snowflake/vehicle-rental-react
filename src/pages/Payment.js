import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

// import Counter from '../components/Counter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';

import backSvg from '../assets/icons/back.svg';

export default class Payment extends Component {
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
                    <div className='col-12 col-sm-4 vehicle-noslide-detail'>
                      <div className='payment-img-wrapper'>
                        <img
                          src={require('../assets/images/iqx-azmi-jn01MSrsUpE-unsplash-cmobile.webp')}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='col-12 col-sm-8 vehicle-info-details'>
                      <span className='vehicle-detail-header'>
                        {'brand'} - {'model'}
                      </span>
                      <br />
                      <span className='vehicle-detail-subheader'>{'city'}</span>
                      <br />
                      <br />
                      <p>No Prepayment</p>
                      <p className='booking-code mt-5'>#FG1209878YZS</p>
                      <button className='copy-boking-code mt-2 fw-bold'>
                        Copy booking code
                      </button>
                    </div>
                    <div className='col-12 col-sm-4 detail-box payment-quantitiy-box d-flex'>
                      <section className='box-wrapper col-12 col-4'>
                        <span className='fw-bold'>Quantity :</span> 2 bikes
                      </section>
                    </div>
                    <div className='col-12 col-sm-8 detail-box payment-reservation-box'>
                      <section className='box-wrapper'>
                        <span className='fw-bold'>Reservation Date :</span> Jan
                        18 - 20 2021
                      </section>
                    </div>
                    <div className='col-12 col-sm-4 detail-box payment-quantitiy-box d-flex'>
                      <section className='box-wrapper col-12 col-4'>
                        <p className='box-header'>Order details :</p>
                        <p className='quantity-item'>1 bike : Rp. 78.000 </p>
                        <p className='quantity-item'>1 bike : Rp. 78.000 </p>
                        <p className='total-item'>Total : 178.000</p>
                      </section>
                    </div>
                    <div className='col-12 col-sm-8 detail-box payment-reservation-box'>
                      <section className='box-wrapper'>
                        <p className='box-header'>Identity : </p>
                        <p>Samantha Doe (+6290987682) </p>
                        <p>samanthadoe@mail.com</p>
                      </section>
                    </div>
                    <div className='col-12 mt-2'>
                      <Link
                        to='/reservation-payment'
                        className='btn btn-yellow'>
                        Paynow 178.000
                      </Link>
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
