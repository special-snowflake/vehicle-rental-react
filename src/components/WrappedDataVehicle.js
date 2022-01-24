import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Counter from '../components/Counter';
import LoadingPage from './LoadingPage';
import SliderDetailVehicle from './SliderDetailVehicle';
import {numberToRupiah} from '../helpers/collection';

import backSvg from '../assets/icons/back.svg';

import axios from 'axios';

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
    this.getDetailVehicle(vehicleId);
  }
  render() {
    const {city, category, name, price, status, description, user_id} =
      this.state.detailVehicle;
    const {isSuccess} = this.state;
    const vehicleId = this.props.vid;
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
                    <SliderDetailVehicle
                      data={this.state.detailVehicle.images}
                    />
                  </div>
                  <div className='col-12 col-sm-6 vehicle-info-details'>
                    <span className='vehicle-detail-header'>{name}</span>
                    <br />
                    <span className='vehicle-detail-subheader'>{city}</span>
                    <br />
                    <br />
                    <span className='availabiliy'>{status}</span> <br />
                    <br />
                    <span
                      className='prepayment-status'
                      style={{color: '#9b0a0a'}}>
                      No Prepayment
                    </span>
                    <p>
                      <br />
                      {description}
                      <br />
                      <br />
                      {/* Capacity : 2 person <br /> */}
                      {/* Reservation before 2 PM */}
                      Type : {category} <br />
                    </p>
                    <div className='col-12'>
                      <div className='row'>
                        <div className='col-1 col-sm-6'></div>
                        <div className='col-11 col-sm-6 price'>
                          <span
                            style={{
                              fontFamily: `'Playfair Display', serif`,
                              fontSize: 'calc(18px + 0.5vw)',
                              fontWeight: 800,
                            }}>
                            Rp {numberToRupiah(price)}/day
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
                  <div className='col 12 mt-5'>
                    {localStorage['vehicle-rental-userId'] && user_id ===
                    JSON.parse(localStorage['vehicle-rental-userId']) ? (
                      <div className='row justify-content-between'>
                        <div className='col-12'>
                          <Link
                            to={`/vehicles/edit/${vehicleId}`}
                            className='btn btn-gold'>
                            Edit Item
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className='row justify-content-between'>
                        <div className='col-12 col-sm-4'>
                          <a href='#chat' className='btn btn-black'>
                            Chat Admin
                          </a>
                        </div>
                        <div className='col-12 col-sm-4'>
                          <Link
                            to='/reservation'
                            state={{
                              dataVehicle: this.state.detailVehicle,
                              counter: this.state.counter,
                            }}
                            className='btn btn-gold'>
                            Reservation
                          </Link>
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
                    )}
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
