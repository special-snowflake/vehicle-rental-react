import axios from 'axios';
import React, {Component} from 'react';

import '../assets/css/Homepage.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage';
import VehicleCard from '../components/VehicleCard';

export default class VehicleType extends Component {
  state = {
    isSuccess: false,
    dataPopular: '',
    dataBike: '',
    dataCar: '',
    dataMotorCycle: '',
  };
  getData = () => {
    const host = 'http://localhost:8000/';
    const urlPopular = axios.get(`${host}vehicles/popular`);
    const urlBike = axios.get(`${host}vehicles/bike`);
    const urlCar = axios.get(`${host}vehicles/car`);
    const urlMotorCycle = axios.get(`${host}vehicles/motorcycle`);
    console.log(urlPopular, urlCar);
    axios
      .all([urlPopular, urlBike, urlCar, urlMotorCycle])
      .then(
        axios.spread((...responses) => {
          console.log('responses', responses);
          this.setState({
            dataPopular: responses[0].data.data,
            dataBike: responses[1].data.data,
            dataCar: responses[2].data.data,
            dataMotorCycle: responses[3].data.data,
            isSuccess: true,
          });
        }),
      )
      .catch((err) => {
        console.log('error', err);
      });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const {isSuccess} =
      this.state;
    return (
      <>
        <Header />
        {isSuccess ? (
          <>
            <div
              className=' row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 row-header'>Popular in Town</div>
              <VehicleCard dataVehicle={this.state.dataPopular} length={4} />
            </div>
            <div
              className=' row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 row-header'>Popular in Car</div>
              <VehicleCard dataVehicle={this.state.dataCar} length={4} />
            </div>
            <div
              className=' row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 row-header'>
                Popular in Motorcycle
              </div>
              <VehicleCard dataVehicle={this.state.dataMotorCycle} length={4} />
            </div>
            <div
              className=' row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 row-header'>Popular in Bike</div>
              <VehicleCard dataVehicle={this.state.dataBike} length={4} />
            </div>
          </>
        ) : (
          <LoadingPage />
        )}

        <Footer />
      </>
    );
  }
}
