import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../assets/css/Home.css';
import '../assets/css/Homepage.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import VehicleCard from '../components/VehicleCard';
import SliderTestimony from '../components/SliderTestimony';

// import prevSvg from '../assets/icons/previous.svg';
// import nextSvg from '../assets/icons/next.svg';
// import circleSvg from '../assets/icons/circle.svg';
import forwardSvg from '../assets/icons/forward.svg';

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
    const popular = axios.get('http://localhost:8000/vehicles/popular');
    const testi = axios.get(
      'http://localhost:8000/testimony?orderBy=rate&sort=desc',
    );
    const getLocation = axios.get('http://localhost:8000/city');
    const getCategory = axios.get('http://localhost:8000/category');
    axios
      .all([popular, testi, getLocation, getCategory])
      .then(
        axios.spread((...responses) => {
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
    const {isSuccess} = this.state;
    console.log('data testi:', this.state.dataTestimony);
    console.log('state:', this.state);
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
                  <div
                    className='col-12 form'
                    style={{minHeight: '25vh', paddingTop: '10vh'}}>
                    <div className='wrapper col-12 col-sm-8 col-md-8 col-xl-6'>
                      <div className='row' style={{color: '#393939'}}>
                        <div className='col-sm-6 col-12'>
                          <select>
                            <option value='Location'>Location</option>
                            <option value='Bali'>Bali</option>
                            <option value='Yogyakarta'>Yogyakarta</option>
                            <option value='Jakarta'>Jakarta</option>
                            <option value='Kalimantan'>Kalimantan</option>
                            <option value='Malang'>Malang</option>
                          </select>
                        </div>
                        <div className='col-sm-6 col-12'>
                          <select>
                            <option value='Type'>Type</option>
                            <option value='Car'>Car</option>
                            <option value='Bike'>Bike</option>
                            <option value='Motorcycle'>Motorcycle</option>
                            <option value='Sports Car'>Sports Car</option>
                          </select>
                        </div>
                        <div className='col-sm-6 col-12'>
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
                        </div>
                      </div>
                      <div className='col-sm-4 col-8'>
                        <a href='#explore' className='btn btn-md btn-yellow'>
                          Explore
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <div className='row'>
                <div
                  className='row content'
                  style={{
                    backgroundImage: `url(./assets/icons/circle.svg)`,
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

export default Home;
