import axios from 'axios';
import React, {Component} from 'react';

import '../assets/css/Homepage.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage';
import VehicleCard from '../components/VehicleCard';
import SearchVehicle from '../components/SearchVehicle';

import searchSvg from '../assets/icons/search.svg';
export default class VehicleType extends Component {
  state = {
    isSuccess: false,
    dataPopular: '',
    dataBike: '',
    dataCar: '',
    dataMotorCycle: '',
    isSearching: false,
    keyword: null,
  };
  getData = () => {
    const host = process.env.REACT_APP_HOST;
    const urlPopular = axios.get(host+'/vehicles/popular');
    const urlBike = axios.get(host+'/vehicles/bike');
    const urlCar = axios.get(host+'/vehicles/car');
    const urlMotorCycle = axios.get(host+'/vehicles/motorcycle');
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
  onSearch(e) {
    e.preventDefault();
    console.log(e.target.searchVehicle.value);
    this.setState({
      keyword: e.target.searchVehicle.value,
      isSearching: true,
    });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const {isSuccess, keyword, isSearching} = this.state;
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
          <div className='col-11 col-md-12 search-input-wrapper'>
            <form onSubmit={this.onSearch.bind(this)}>
              <input
                type='text'
                name='searchVehicle'
                id='search-vehicle'
                className='input-search'
                placeholder='Search vehicle (ex. cars, cars name)'
              />
              <button type='submit' className='search-icon'>
                <img
                  src={searchSvg}
                  alt='search button'
                  width={30}
                  height={30}
                />
              </button>
            </form>
          </div>
        </div>
        {isSuccess & !isSearching ? (
          <>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start'
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
              className='row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 row-header'>Car</div>
              <VehicleCard dataVehicle={this.state.dataCar} length={4} />
            </div>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 row-header'>Motorcycle</div>
              <VehicleCard dataVehicle={this.state.dataMotorCycle} length={4} />
            </div>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 row-header'>Bike</div>
              <VehicleCard dataVehicle={this.state.dataBike} length={4} />
            </div>
          </>
        ) : isSuccess & isSearching ? (
          <SearchVehicle keyword={keyword} />
        ) : (
          <LoadingPage />
        )}

        <Footer />
      </>
    );
  }
}
