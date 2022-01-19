import React, {Component} from 'react';

import {numberToRupiah, addDate} from '../helpers/collection';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {getUserData} from '../utils/https/user';
import {addTransaction} from '../utils/https/history';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';

import backSvg from '../assets/icons/back.svg';
import {toast} from 'react-toastify';

class Payment extends Component {
  state = {
    dataVehicle: null,
    isSuccess: false,
    totalPayment: null,
    vehicleImage: null,
  };
  copyBookingCode = (bookingCode) => {
    navigator.clipboard.writeText(bookingCode);
    toast.success('Booking code coppied to clipboard', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  getUserData = (id) => {
    getUserData(id)
      .then((response) => {
        const data = response.data.data;
        // console.log('data-detail', data.id);
        this.setState({
          userData: data,
          isSuccess: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showOrderDetails = () => {
    const elements = [];
    const total = this.state.counter * this.state.dataVehicle.price;
    for (let i = 0; i < this.state.rentalDuration; i++) {
      const element = (
        <p className='quantity-item' key={`detail-${i}`}>
          {this.state.counter} bike : {numberToRupiah(total)}{' '}
        </p>
      );
      elements.push(element);
    }
    return elements;
  };

  addHistory = () => {
    const returnDate = addDate(
      this.state.rentalDate,
      parseInt(this.state.rentalDuration),
    );
    const userId = JSON.parse(localStorage['vehicle-rental-userId']);
    const token = localStorage['vehicle-rental-token'];
    const body = {
      user_id: userId,
      vehicle_id: this.state.dataVehicle.id,
      total_payment: this.state.totalPayment,
      rental_date: this.state.rentalDate,
      return_date: returnDate,
    };
    console.log('body: ', body);
    addTransaction(body, token)
      .then((response) => {
        const navigate = this.props.navigate;
        toast.success('Payment success.', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/history')
        }, 3500);
      })
      .catch((err) => {
        toast.error(err.response.data.errMsg, {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  componentDidMount() {
    const hostImg = process.env.REACT_APP_HOST + '/vehicles';
    const location = this.props.location;
    const {dataVehicle, counter, rentalDate, rentalDuration} = location.state;
    console.log('rental date is:', rentalDate);
    const totalPayment = counter * dataVehicle.price * rentalDuration;
    const imgDefault = require('../assets/images/car-default.jpg');
    const dataImage = dataVehicle.images;
    const vehicleImage =
      dataImage.length === 0 ? imgDefault : `${hostImg}${dataImage[0]}`;
    console.log('Data vehicle: ', dataVehicle);
    const id = localStorage['vehicle-rental-userId'];
    this.setState({
      dataVehicle,
      counter,
      rentalDate,
      rentalDuration,
      totalPayment,
      vehicleImage,
    });
    this.getUserData(id);
  }
  render() {
    console.log(this.state);
    const bookingCode = '#FG1209878YZS';
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
                        <img src={this.state.vehicleImage} alt='' />
                      </div>
                    </div>
                    <div className='col-12 col-sm-8 vehicle-info-details'>
                      <span className='vehicle-detail-header'>
                        {this.state.dataVehicle.name}
                      </span>
                      <br />
                      <span className='vehicle-detail-subheader'>
                        {this.state.dataVehicle.city}
                      </span>
                      <br />
                      <br />
                      <p>No Prepayment</p>
                      <p className='booking-code mt-5'>{bookingCode}</p>
                      <button
                        className='copy-boking-code mt-2 fw-bold'
                        onClick={() => {
                          this.copyBookingCode(bookingCode);
                        }}>
                        Copy booking code
                      </button>
                    </div>
                    <div className='col-12 col-sm-4 detail-box payment-quantitiy-box d-flex'>
                      <section className='box-wrapper col-12 col-4'>
                        <span className='fw-bold'>Quantity : </span>
                        {this.state.counter}
                        {this.state.dataVehicle.counter} bikes
                      </section>
                    </div>
                    <div className='col-12 col-sm-8 detail-box payment-reservation-box'>
                      <section className='box-wrapper'>
                        <span className='fw-bold'>Reservation Date :</span>
                        {' ' + this.state.rentalDate + ' - '}
                        {addDate(
                          this.state.rentalDate,
                          parseInt(this.state.rentalDuration),
                        )}
                      </section>
                    </div>
                    <div className='col-12 col-sm-4 detail-box payment-quantitiy-box d-flex'>
                      <section className='box-wrapper col-12 col-4'>
                        <p className='box-header'>Order details :</p>
                        {this.showOrderDetails()}
                        {/* <p className='quantity-item'>1 bike : Rp. 78.000 </p>
                        <p className='quantity-item'>1 bike : Rp. 78.000 </p> */}
                        <p className='total-item'>
                          Total : {numberToRupiah(this.state.totalPayment)}
                        </p>
                      </section>
                    </div>
                    <div className='col-12 col-sm-8 detail-box payment-reservation-box'>
                      <section className='box-wrapper'>
                        <p className='box-header'>Identity : </p>
                        <p>
                          {this.state.userData.full_name}(
                          {this.state.userData.phone})
                        </p>
                        <p>{this.state.userData.email}</p>
                      </section>
                    </div>
                    <div className='col-12 mt-2'>
                      <button
                        to='/reservation-payment'
                        onClick={this.addHistory}
                        className='btn btn-yellow'>
                        Paynow {numberToRupiah(this.state.totalPayment)}
                      </button>
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

export default function WrapperPayment(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return <Payment {...props} location={location} navigate={navigate} />;
}
