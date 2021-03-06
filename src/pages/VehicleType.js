import axios from 'axios';
import React, {Component} from 'react';
import {useSearchParams, useLocation, Link} from 'react-router-dom';

import {searchVehicle, getPopular} from '../utils/https/vehicles';
import {getCategory} from '../utils/https/category';
import {getCity} from '../utils/https/city';
import '../assets/css/Homepage.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage';
import VehicleCard from '../components/VehicleCard';
import SearchVehicle from '../components/SearchVehicle';
import forwardSvg from '../assets/icons/forward.svg';

import {toast} from 'react-toastify';

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
    defaultOrderBy: 'all',
    defaultSort: 'asc',
    page: null,
    filter: '',
    category: null,
    city: null,
  };
  getData = () => {
    const urlPopular = getPopular();
    const urlBike = searchVehicle('?keyword=&category=2&sort=asc');
    const urlCar = searchVehicle('?keyword=&category=1&sort=asc');
    const urlMotorCycle = searchVehicle('?keyword=&category=3&sort=asc');
    axios
      .all([urlPopular, urlBike, urlCar, urlMotorCycle])
      .then(
        axios.spread((...responses) => {
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
    const {setSearchParams} = this.props;
    const city = e.target.city.value;
    const category = e.target.category.value;
    const sort = e.target.sort.value;
    const orderBy = e.target.orderBy.value;
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
    if (orderBy !== 'all') {
      params = {...params, orderBy};
      filter += '&orderBy=' + orderBy;
    }
    if (sort !== 'all') {
      params = {...params, sort};
      filter += '&sort=' + sort;
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
        toast.error('Error get category');
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
        toast.error('Error get category');
      });
  }
  componentDidMount() {
    this.getCity();
    this.getCategory();
    const {searchParams} = this.props;
    if (searchParams.get('keyword') === null) {
      this.setState({
        isSearching: false,
      });
      this.getData();
    } else {
      const keyword = searchParams.get('keyword');
      const city = searchParams.get('city');
      const orderBy = searchParams.get('orderBy');
      const sort = searchParams.get('sort');
      const page = !searchParams.get('page') ? '1' : searchParams.get('page');
      const defaultCity = city === null ? 'all' : city;
      const category = searchParams.get('category');
      const defaultCategory = category === null ? 'all' : category;
      const defaultSort = sort === null ? 'all' : sort;
      let filter = '';
      if (city !== 'all' && city !== null) {
        filter += '&cityId=' + city;
      }
      if (category !== 'all' && category !== null) {
        filter += '&categoryId=' + category;
      }
      if (orderBy !== 'all' && orderBy !== null) {
        filter += '&orderBy=' + orderBy;
      }
      if (sort !== 'all' && sort !== null) {
        filter += '&sort=' + sort;
      }
      filter += '&page=' + page;
      this.setState({
        filter: filter,
        keyword: keyword,
        isSearching: true,
        isSuccess: true,
        page,
        defaultCity: defaultCity,
        defaultCategory: defaultCategory,
        defaultSort: defaultSort,
      });
    }
  }
  componentDidUpdate(prev, current) {
    const location = this.props.location;
    console.log(prev, location.search);
    if (prev.location.search !== location.search) {
      this.setState({
        isSearching: true,
      });
      const button = document.getElementById('searchButton');
      button.scrollIntoView({behavior: 'smooth'});
    }
  }
  render() {
    const {
      isSuccess,
      keyword,
      isSearching,
      city,
      category,
      defaultCity,
      defaultCategory,
      defaultOrderBy,
      defaultSort,
    } = this.state;
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
              <div className='col-6 col-sm-3'>
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
              <div className='col-6 col-sm-3'>
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
              <div className='col-6 col-sm-3'>
                <label htmlFor='orderBy'>Order : </label>
                <select
                  name='orderBy'
                  id='orderBy'
                  className='search-vehicle'
                  defaultValue={defaultOrderBy}>
                  <option value='all'>Default</option>
                  <option value='price'>Price</option>
                  <option value='name'>Name</option>
                  <option value='city'>City</option>
                </select>
              </div>
              <div className='col-6 col-sm-3'>
                <label htmlFor='sort'>Sort : </label>
                <select
                  name='sort'
                  id='sort'
                  className='search-vehicle'
                  defaultValue={defaultSort}>
                  <option value='asc'>Ascending</option>
                  <option value='desc'>Descending</option>
                </select>
              </div>
              <div className='col-12 col-sm-6 col-lg-3'>
                <button className='btn btn-yellow' id='searchButton'>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        {isSuccess & !isSearching ? (
          <>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start pb-0'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-8 col-sm-9 row-header'>Popular in Town</div>
              <div
                className='col-4 col-sm-3 text-right align-bottom'
                style={{textAlign: 'right'}}>
                <Link to='/view-more' className='more'>
                  View More
                  <img
                    src={forwardSvg}
                    width='14px'
                    height='14px'
                    alt='View More'
                    style={{
                      filter:
                        'invert(70%) sepia(32%) saturate(5220%) hue-rotate(347deg) brightness(102%) contrast(97%)',
                    }}
                  />
                </Link>
              </div>
              <VehicleCard dataVehicle={this.state.dataPopular} length={4} />
            </div>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start pb-0'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-8 col-sm-9 row-header'>Car</div>
              <div
                className='col-4 col-sm-3 text-right align-bottom'
                style={{textAlign: 'right'}}>
                <Link to={`?keyword=&category=1&sort=asc`} className='more'>
                  View More
                  <img
                    src={forwardSvg}
                    width='14px'
                    height='14px'
                    alt='View More'
                    style={{
                      filter:
                        'invert(70%) sepia(32%) saturate(5220%) hue-rotate(347deg) brightness(102%) contrast(97%)',
                    }}
                  />
                </Link>
              </div>
              <VehicleCard dataVehicle={this.state.dataCar} length={4} />
            </div>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start pb-0'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-8 col-sm-9 row-header'>Motorcycle</div>
              <div
                className='col-4 col-sm-3 text-right align-bottom'
                style={{textAlign: 'right'}}>
                <Link to={`?keyword=&category=3&sort=asc`} className='more'>
                  View More
                  <img
                    src={forwardSvg}
                    width='14px'
                    height='14px'
                    alt='View More'
                    style={{
                      filter:
                        'invert(70%) sepia(32%) saturate(5220%) hue-rotate(347deg) brightness(102%) contrast(97%)',
                    }}
                  />
                </Link>
              </div>
              <VehicleCard dataVehicle={this.state.dataMotorCycle} length={4} />
            </div>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start pb-0'
              style={{
                backgroundImage: require(`../assets/icons/circle.svg`),
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-8 col-sm-9 row-header'>Bike</div>
              <div
                className='col-4 col-sm-3 text-right align-bottom'
                style={{textAlign: 'right'}}>
                <Link to={`?keyword=&category=2&sort=asc`} className='more'>
                  View More
                  <img
                    src={forwardSvg}
                    width='14px'
                    height='14px'
                    alt='View More'
                    style={{
                      filter:
                        'invert(70%) sepia(32%) saturate(5220%) hue-rotate(347deg) brightness(102%) contrast(97%)',
                    }}
                  />
                </Link>
              </div>
              <VehicleCard dataVehicle={this.state.dataBike} length={4} />
            </div>
          </>
        ) : isSuccess & isSearching ? (
          <SearchVehicle
            searchParams={this.props.searchParams}
            location={this.props.location}
          />
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
  const location = useLocation();
  return (
    <VehicleType
      {...props}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      location={location}
    />
  );
}
