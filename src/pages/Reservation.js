import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Counter from '../components/Counter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';

import backSvg from '../assets/icons/back.svg';

class Reservation extends React.Component {
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
    // const {city, category, brand, model, capacity, status} =
    //   this.state.detailVehicle;
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
                      <p>No Prepayment</p>
                      <div className='row text-center total-items'>
                        <div className='col-3'>
                          <button
                            onClick={this.onClickSubstract}
                            style={{float: 'left'}}>
                            <div className='wrapper-sub-item'>
                              <span
                                style={{
                                  fontWeight: 800,
                                  color: 'black',
                                  fontSize: '25px',
                                }}>
                                -
                              </span>
                            </div>
                          </button>
                        </div>
                        <div
                          className='col-6'
                          style={{
                            fontWeight: 800,
                            fontSize: '30px',
                            padding: '5px',
                          }}>
                          <Counter
                            onClickAddCounter={this.onClickAdd}
                            onClickSubstractCounter={this.onClickSubstract}
                            counterNumber={this.state.counter}
                          />
                          2
                        </div>
                        <div className='col-3'>
                          <button
                            onClick={this.onClickAdd}
                            style={{float: 'right'}}>
                            <div className='wrapper-add-item'>
                              <span
                                style={{
                                  fontWeight: 800,
                                  color: 'black',
                                  fontSize: '30px',
                                }}>
                                +
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                      <section className='box-date mt-4'>
                        <h3 className='box-header'>Reservation Date:</h3>
                        <input type='date' name='date' id='' />
                        <input
                          type='text'
                          name='rentalDuration'
                          id='rentalDuration'
                          list='durationList'
                        />
                        <datalist id='durationList'>
                          <option>1 Day</option>
                          <option>2 Day</option>
                          <option>3 Day</option>
                        </datalist>
                      </section>
                    </div>
                    <div className='col 12 mt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-12'></div>
                        <Link to='/payment' className='btn btn-yellow'>Paynow 178.000</Link>
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

export default Reservation;
