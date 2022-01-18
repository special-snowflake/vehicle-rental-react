import React from 'react';
// import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import {numberToRupiah, getToday} from '../helpers/collection';
// import Counter from '../components/Counter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';

import backSvg from '../assets/icons/back.svg';

class Reservation extends React.Component {
  state = {
    dataVehicle: null,
    counter: null,
    isSuccess: false,
    totalPayment: null,
    vehicleImage: null,
    rentalDuration: 1,
    rentalDate: null,
  };

  onClickAdd = () => {
    if (this.state.counter < this.state.dataVehicle.stock) {
      const number = this.state.counter;
      const rental = this.state.rentalDuration;
      const price = this.state.dataVehicle.price;
      this.setState({
        counter: number + 1,
        totalPayment: (number + 1) * price * rental,
      });
    }
  };

  onDateChange = (e) => {
    const date = e.target.value;
    console.log('inside change:', date);
    this.setState({
      rentalDate: date,
    });
  };

  onRentalChange = (e) => {
    const number = this.state.counter;
    const price = this.state.dataVehicle.price;
    const rental = e.target.value;
    this.setState({
      rentalDuration: rental,
      totalPayment: number * price * rental,
    });
  };
  onClickSubstract = () => {
    if (this.state.counter > 1) {
      const number = this.state.counter;
      const rental = this.state.rentalDuration;
      const price = this.state.dataVehicle.price;
      this.setState({
        counter: number - 1,
        totalPayment: (number - 1) * price * rental,
      });
    }
  };

  componentDidMount() {
    const today = getToday();
    const hostImg = process.env.REACT_APP_HOST + '/vehicles';
    const location = this.props.location;
    const {dataVehicle, counter} = location.state;
    const totalPayment = counter * dataVehicle.price;
    const imgDefault = require('../assets/images/car-default.jpg');
    const dataImage = dataVehicle.images;
    const vehicleImage =
      dataImage.length === 0 ? imgDefault : `${hostImg}${dataImage[0]}`;
    console.log('Data vehicle: ', dataVehicle);
    this.setState({
      dataVehicle,
      counter,
      isSuccess: true,
      totalPayment,
      rentalDate: today,
      vehicleImage,
    });
  }
  render() {
    const {isSuccess} = this.state;
    console.log('data:', this.state.dataVehicle);
    const today = getToday();
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
                        <img src={this.state.vehicleImage} alt='' />
                      </div>
                    </div>
                    <div className='col-12 col-sm-6 vehicle-info-details'>
                      <span className='vehicle-detail-header'>
                        {this.state.dataVehicle.name}
                      </span>
                      <br />
                      <span className='vehicle-detail-subheader'>
                        {this.state.dataVehicle.city}
                      </span>
                      <br />
                      <br />
                      <p>{this.state.dataVehicle.description}</p>
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
                          {this.state.counter}
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
                        <input
                          type='date'
                          name='date'
                          onChange={this.onDateChange.bind(this)}
                          defaultValue={today}
                          // required
                          id='rentalDuration'
                          min={today}
                        />
                        <select
                          name='rentalDuration'
                          id='rentalDuration'
                          onChange={this.onRentalChange.bind(this)}>
                          <option value='1'>1 Day</option>
                          <option value='2'>2 Days</option>
                          <option value='3'>3 Days</option>
                          <option value='4'>4 Days</option>
                          <option value='5'>5 Days</option>
                          <option value='6'>6 Days</option>
                          <option value='7'>7 Days</option>
                        </select>
                      </section>
                    </div>
                    <div className='col 12 mt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-12'></div>
                        <Link
                          to='/payment'
                          className='btn btn-yellow'
                          state={{
                            dataVehicle: this.state.dataVehicle,
                            counter: this.state.counter,
                            rentalDuration: this.state.rentalDuration,
                            rentalDate: this.state.rentalDate,
                          }}>
                          Rp {numberToRupiah(this.state.totalPayment)}
                        </Link>
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

export default function WrapperReservation(props) {
  const location = useLocation();
  return <Reservation {...props} location={location} />;
}
