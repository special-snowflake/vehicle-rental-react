import React from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import VehicleCard from '../components/VehicleCard';

class ViewMore extends React.Component {
  state = {
    isSuccess: false,
    dataVehicle: '',
  };
  componentDidMount() {
    this.getPopular();
  }
  getPopular = () => {
    const popular = 'http://localhost:8000/vehicles/popular';
    axios
      .get(popular)
      .then((response) => {
        console.log('response', response.data);
        this.setState({
          dataVehicle: response.data.data,
          isSuccess: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const {isSuccess} = this.state;
    return (
      <>
        <Header />
        {isSuccess ? (
          <div
            className=' row content d-flex flex-row align-items-center justify-content-start'
            style={{
              backgroundImage: `url("../assets/icons/circle.svg")`,
              backgroundPosition: 'center bottom',
              backgroundSize: '2vw 2vw',
              backgroundRepeat: 'no-repeat',
            }}>
            <div className='col-8 col-sm-9 row-header'>Popular in Town</div>
            <div className='col-12 text-center sub-popular-title'>
              Click item to see details and reservation.
            </div>
            <div className='row'>
              <VehicleCard dataVehicle={this.state.dataVehicle} length={100} />
              <div className='col-12 text-center sub-popular-title'>
                There is no vehicle left
              </div>
            </div>
          </div>
        ) : (
          <LoadingPage />
        )}
        <Footer />
      </>
    );
  }
}

export default ViewMore;
