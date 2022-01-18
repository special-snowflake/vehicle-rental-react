import axios from 'axios';
import React, {Component} from 'react';
import {useSearchParams} from 'react-router-dom';

import {getCategory} from '../utils/https/category';
import {getCity} from '../utils/https/city';
import '../assets/css/Homepage.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage';
import VehicleCard from '../components/VehicleCard';
import SearchVehicle from '../components/SearchVehicle';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import searchSvg from '../assets/icons/search.svg';
class VehicleType extends Component {
  state = {
    isSuccess: false,
    dataPopular: '',
    dataBike: '',
    dataCar: '',
    dataMotorCycle: '',
    isSearching: false,
    keyword: null,
    defaultCity: 'all',
    defaultCategory: 'all',
    defaultSortBy: 'all',
    filter: '',
    category: null,
    city: null,
  };
  getData = () => {
    const host = process.env.REACT_APP_HOST;
    const urlPopular = axios.get(host + '/vehicles/popular');
    const urlBike = axios.get(host + '/vehicles/bike');
    const urlCar = axios.get(host + '/vehicles/car');
    const urlMotorCycle = axios.get(host + '/vehicles/motorcycle');
    // console.log(urlPopular, urlCar);
    axios
      .all([urlPopular, urlBike, urlCar, urlMotorCycle])
      .then(
        axios.spread((...responses) => {
          // console.log('responses', responses);
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
    // console.log(e.target.searchVehicle.value);
    const {searchParams, setSearchParams} = this.props;
    const city = e.target.city.value;
    const category = e.target.category.value;
    const sortBy = e.target.sortBy.value;
    const keyword = e.target.searchVehicle.value;
    let params = {
      keyword: e.target.searchVehicle.value,
    };
    let filter = '';
    if (city !== 'all') {
      params = {...params, city};
      filter += '&cityId=' + city;
    }
    if (category !== 'all') {
      params = {...params, category};
      filter += '&categoryId=' + category;
    }
    if (sortBy !== 'all') {
      params = {...params, sortBy};
      const orderBy = sortBy.substr(0, sortBy.indexOf('-'));
      const sort = sortBy.substr(sortBy.indexOf('-') + 1);
      filter += '&orderBy=' + orderBy + '&sort=' + sort;
    }
    setSearchParams(params);
    this.setState({
      keyword: keyword,
      filter: filter,
      isSearching: true,
    });
  }
  getCategory() {
    getCategory()
      .then((response) => {
        this.setState({
          category: response.data.data,
        });
      })
      .catch((err) => {
        toast.error('Error get category', {
          position: 'bottom-left',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  }
  getCity() {
    getCity()
      .then((response) => {
        this.setState({
          city: response.data.data,
        });
      })
      .catch((err) => {
        toast.error('Error get category', {
          position: 'bottom-left',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  }
  componentDidMount() {
    this.getCity();
    this.getCategory();
    const {searchParams} = this.props;
    if (searchParams.get('keyword') === null) {
      this.getData();
    } else {
      const keyword = searchParams.get('keyword');
      const city = searchParams.get('city');
      const defaultCity = city === null ? 'all' : city;
      const category = searchParams.get('category');
      const defaultCategory = category === null ? 'all' : category;
      const sortBy = searchParams.get('sortBy');
      const defaultSortBy = sortBy === null ? 'all' : sortBy;
      let filter = '';
      if (city !== 'all' && city !== null) {
        filter += '&cityId=' + city;
      }
      if (category !== 'all' && category !== null) {
        filter += '&categoryId=' + category;
      }
      if (sortBy !== 'all' && sortBy !== null) {
        const orderBy = sortBy.substr(0, sortBy.indexOf('-'));
        const sort = sortBy.substr(sortBy.indexOf('-') + 1);
        filter += '&orderBy=' + orderBy + '&sort=' + sort;
      }
      this.setState({
        filter: filter,
        keyword: keyword,
        isSearching: true,
        isSuccess: true,
        defaultCity: defaultCity,
        defaultCategory: defaultCategory,
        defaultSortBy: defaultSortBy,
      });
    }
  }
  render() {
    const {
      isSuccess,
      keyword,
      isSearching,
      city,
      category,
      filter,
      defaultCity,
      defaultCategory,
      defaultSortBy,
    } = this.state;
    return (
      <>
        <Header />
        <ToastContainer />
        <div
          className='row content d-flex flex-row align-items-center content-search'
          style={{
            backgroundImage: `url("../assets/icons/circle.svg")`,
            backgroundPosition: 'center bottom',
            backgroundSize: '2vw 2vw',
            backgroundRepeat: 'no-repeat',
          }}>
          <form onSubmit={this.onSearch.bind(this)}>
            <div className='col-12 col-md-12 search-input-wrapper mt-4'>
              <input
                type='text'
                name='searchVehicle'
                id='search-vehicle'
                className='search-vehicle'
                defaultValue={keyword}
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
            </div>
            <div className='row'>
              <div className='col-12 col-sm-4'>
                <label htmlFor='city'>Location: </label>
                <select
                  name='city'
                  id='city'
                  className='search-vehicle'
                  defaultValue={defaultCity}>
                  <option value='all'>All</option>
                  {city !== null &&
                    city.map((city, idx) => (
                      <option value={city.id} key={city.id}>
                        {city.city}
                      </option>
                    ))}
                </select>
              </div>
              <div className='col-12 col-sm-4'>
                <label htmlFor='category'>Category: </label>
                <select
                  name='category'
                  id='category'
                  className='search-vehicle'
                  defaultValue={defaultCategory}>
                  <option value='all'>All</option>
                  {category !== null &&
                    category.map((category, idx) => (
                      <option value={category.id} key={category.id}>
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>
              <div className='col-12 col-sm-4'>
                <label htmlFor='sortBy'>Sort By: </label>
                <select
                  name='sortBy'
                  id='sortBy'
                  className='search-vehicle'
                  defaultValue={defaultSortBy}>
                  <option value='all'>Default</option>
                  <option value='price-asc'>Price (Low To High)</option>
                  <option value='price-desc'>Price (High To Low)</option>
                  <option value='name-asc'>Name (A-Z)</option>
                  <option value='name-desc'>Name (Z-A)</option>
                </select>
              </div>
              <div className='col-12 col-sm-4'>
                <button className='btn btn-yellow'>Search</button>
              </div>
            </div>
          </form>
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
          <SearchVehicle keyword={keyword} filter={filter} />
        ) : (
          <LoadingPage />
        )}

        <Footer />
      </>
    );
  }
}

export default function VehicleTypeWrapper(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <VehicleType
      {...props}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}
