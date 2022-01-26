import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import '../assets/css/Home.css';
import '../assets/css/Homepage.css';

import {getCategory} from '../utils/https/category';
import {getCity} from '../utils/https/city';
import { getPopular } from '../utils/https/vehicles';
import { getTestimony } from '../utils/https/testimony';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import VehicleCard from '../components/VehicleCard';
import SliderTestimony from '../components/SliderTestimony';

import circleSvg from '../assets/icons/circle.svg';
import forwardSvg from '../assets/icons/forward.svg';

const optionCity = (list) => {
  const elements = [];
  for (let index = 0; index < list.length; index++) {
    elements.push(
      <option value={list[index].id} key={list[index].id}>
        {list[index].city}
      </option>,
    );
  }
  return elements;
};
const optionCategory = (list) => {
  const elements = [];
  for (let index = 0; index < list.length; index++) {
    console.log(list[index]);
    elements.push(
      <option value={list[index].id} key={list[index].id}>
        {list[index].category}
      </option>,
    );
  }
  return elements;
};
class Home extends React.Component {
  state = {
    isSuccess: false,
    dataVehicle: '',
    dataTestimony: '',
    listCity: null,
    listCategory: null,
  };
  componentDidMount() {
    this.getPopular();
  }
  getPopular = () => {
    const popular = getPopular();
    const testi = getTestimony('?orderBy=rate&sort=desc');
    const city = getCity();
    const category = getCategory();
    axios
      .all([popular, testi, city, category])
      .then(
        axios.spread((...responses) => {
          console.log('list city getpop:', responses[2].data);
          this.setState({
            dataVehicle: responses[0].data.data,
            dataTestimony: responses[1].data.data,
            listCity: responses[2].data.data,
            listCategory: responses[3].data.data,
            isSuccess: true,
          });
        }),
      )
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const searchVehicles = (e) => {
      e.preventDefault();
      const navTo = `/vehicles/type?keyword=${e.target.keyword.value}&city=${e.target.city.value}&category=${e.target.category.value}&sort=asc`;
      // <Navigate to={navTo} />;
      console.log(e.target.category.value, e.target.city.value, navTo);
      const navigate = this.props.navigate;
      navigate(navTo);
    };
    const {isSuccess, listCategory, listCity} = this.state;
    let roles = localStorage['vehicle-rental-roles'];
    if (typeof roles !== 'undefined') {
      roles = JSON.parse(localStorage['vehicle-rental-roles']);
    }
    return (
      <>
        <Header />
        <main>
          <div className='row'>
            <div className='col-12 poster'>
              <div className='layer'>
                <div className='row'>
                  <div className='col-xl-6 col-12'>
                    <div
                      className='tagline-wrapper'
                      style={{minHeight: '20vh'}}>
                      <div className='col-12 col-sm-6 col-md-12 tagline'>
                        Explore And Travel
                      </div>
                      <div className='col-12'>
                        <div className='sub-tagline'>Vehicle Finder</div>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={searchVehicles}>
                    <div
                      className='col-12 form'
                      style={{minHeight: '25vh', paddingTop: '10vh'}}>
                      <div className='wrapper col-12 col-sm-8 col-md-8 col-xl-6'>
                        <div className='row' style={{color: '#393939'}}>
                        <div className="col-12">
                            <input type="text" name="keyword" placeholder='Search vehicle (ex. cars, cars name)' id="" />
                          </div>
                          <div className='col-sm-6 col-12'>
                            <select name='city'>
                              <option value=''>City</option>
                              {isSuccess && optionCity(listCity)}
                            </select>
                          </div>
                          <div className='col-sm-6 col-12'>
                            <select name='category'>
                              <option value=''>Category</option>
                              {isSuccess && optionCategory(listCategory)}
                            </select>
                          </div>
                          {/* <div className='col-sm-6 col-12'>
                            <select>
                              <option value='Payment'>Payment</option>
                            </select>
                          </div>
                          <div className='col-sm-6 col-12'>
                            <input
                              type='date'
                              name='date'
                              id=''
                              placeholder='now'
                            />
                          </div> */}
                          
                        </div>
                        <div className='col-sm-4 col-8 mt-5'>
                          <button
                            type='submit'
                            className='btn btn-md btn-yellow'>
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {isSuccess ? (
            <>
              <div
                className='row content d-flex flex-row align-items-center justify-content-start pb-0'
                style={{
                  backgroundImage: {circleSvg},
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
                <VehicleCard dataVehicle={this.state.dataVehicle} length={4} />
              </div>
              {roles === 'owner' && (
                <div className='row row content d-flex flex-row align-items-center justify-content-start mt-0 mb-2 pb-0 '>
                  <div className='add-item-wrapper'>
                    <Link to='/vehicles/new' className='btn btn-black'>
                      Add Item
                    </Link>
                  </div>
                </div>
              )}
              <div className='row mb-3'>
                <div
                  className='row content pb-0'
                  style={{
                    backgroundImage: {circleSvg},
                    backgroundPosition: '2rem center',
                    backgroundSize: '2vw 2vw',
                    backgroundRepeat: 'no-repeat',
                  }}>
                  <div className='col-12 row-header'>Testimonials</div>
                  <div
                    id='carouselExampleControls'
                    className='carousel slide'
                    data-bs-ride='carousel'>
                    <div className='carousel-inner'>
                      <SliderTestimony
                        dataTestimony={this.state.dataTestimony}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <LoadingPage />
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default function WrapperHome(props) {
  const navigate = useNavigate();
  return <Home {...props} navigate={navigate} />;
  // return <Home />;
}
