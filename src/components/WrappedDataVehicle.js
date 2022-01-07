import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Counter from '../components/Counter';
import LoadingPage from './LoadingPage';

import backSvg from '../assets/icons/back.svg';
import forwardSvg from '../assets/icons/forward.svg';

import axios from 'axios';

const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);

class WrappedDataVehicle extends React.Component {
  state = {
    counter: 1,
    detailVehicle: '',
    isSuccess: false,
  };
  onClickAdd = () => {
    if (this.state.counter < this.state.detailVehicle.stock) {
      const number = this.state.counter;
      this.setState({
        counter: number + 1,
      });
    }
  };
  onClickSubstract = () => {
    if (this.state.counter > 1) {
      const number = this.state.counter;
      this.setState({
        counter: number - 1,
      });
    }
  };
  getDetailVehicle = (id) => {
    const urlDetail = `http://localhost:8000/vehicles/detail/${id}`;
    console.log('url', urlDetail);
    axios
      .get(urlDetail)
      .then((response) => {
        const data = response.data.data;
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
    this.getDetailVehicle(vehicleId);
  }
  render() {
    const {city, category, brand, model, capacity, price, status} =
      this.state.detailVehicle;
    const formatPrice = numberFormat(price);
    // console.log(formatPrice);
    const {isSuccess} = this.state;
    return (
      <>
        <Header />
        {isSuccess ? (
          <main>
            <div className='row text-left'>
              <div className='.d-none .d-sm-block col-sm-1'></div>
              <div className='col-12 col-sm-10'>
                <div className='row content content-center'>
                  <div className='back-detail'>
                    <div className='col-12'>
                      <Link to='/home'>
                        <img src={backSvg} alt='' width='23px' height='23px' />
                        <span style={{paddingLeft: '10px'}}> Detail </span>
                      </Link>
                    </div>
                  </div>
                  <div className='col-12 col-sm-6 vehicle-images-detail'>
                    <img
                      src={require('../assets/images/robert-bye-tG36rvCeqng-unsplash-c.webp')}
                      alt='Product'
                      width='100%'
                    />
                    <div className='row preview-images'>
                      <div className='col-2 align-items-center'>
                        <a href='#prev' aria-label='Previous Image'>
                          <img src={backSvg} width='18' height='18' alt='' />
                        </a>
                      </div>
                      <div className='col-8'>
                        <div className='row'>
                          <div className='col-6'>
                            <img
                              src={require('../assets/images/robert-bye-tG36rvCeqng-unsplash-c.webp')}
                              width='100%'
                              alt=''
                            />
                          </div>
                          <div className='col-6'>
                            <img
                              src={require('../assets/images/robert-bye-tG36rvCeqng-unsplash-c.webp')}
                              width='100%'
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-2 align-items-center'>
                        <a href='#next' aria-label='Next Image'>
                          <img src={forwardSvg} width='18' height='18' alt='' />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-6 vehicle-info-details'>
                    <span className='vehicle-detail-header'>
                      {brand} - {model}
                    </span>
                    <br />
                    <span className='vehicle-detail-subheader'>{city}</span>
                    <br />
                    <br />
                    <span className='availabiliy'>{status}</span> <br />
                    <span
                      className='prepayment-status'
                      style={{color: '#9b0a0a'}}>
                      No Prepayment
                    </span>
                    <p>
                      Capacity : {capacity} person <br />
                      Type : {category} <br />
                      Reservation before 2 PM
                    </p>
                    <div className='col-12'>
                      <div className='row'>
                        <div className='col-1 col-sm-6'></div>
                        <div className='col-11 col-sm-6 price'>
                          <span
                            style={{
                              fontFamily: `'Playfair Display', serif`,
                              fontSize: '20px',
                              fontWeight: 800,
                            }}>
                            {formatPrice}/day
                          </span>
                        </div>
                      </div>
                      <div className='row text-center total-items'>
                        <div className='col-3'>
                          <button onClick={this.onClickSubstract}>
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
                            fontSize: '25px',
                            padding: '5px',
                          }}>
                          <Counter
                            onClickAddCounter={this.onClickAdd}
                            onClickSubstractCounter={this.onClickSubstract}
                            counterNumber={this.state.counter}
                          />
                        </div>
                        <div className='col-3'>
                          <button onClick={this.onClickAdd}>
                            <div className='wrapper-add-item'>
                              <span
                                style={{
                                  fontWeight: 800,
                                  color: 'black',
                                  fontSize: '25px',
                                }}>
                                +
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col 12'>
                    <div className='row justify-content-between'>
                      <div className='col-12 col-sm-4'>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='.d-none .d-sm-block col-sm-1'></div>
            </div>
          </main>
        ) : (
          <LoadingPage />
        )}
        <Footer />
      </>
    );
  }
}

export default WrappedDataVehicle;
