import React from 'react';
import {Link, useSearchParams} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import searchSvg from '../assets/icons/search.svg';
import forwarSvg from '../assets/icons/forward.svg';
import downSvg from '../assets/icons/down.svg';
import {searchHistory} from '../utils/https/history';
import {numberToRupiah} from '../helpers/collection';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowHistory from '../components/ShowHistory';

class History extends React.Component {
  state = {
    isSuccess: false,
    dataHistory: null,
    keyword: '',
    orderBy: 'date',
  };
  searchHistoryReact = () => {
    const token = localStorage['vehicle-rental-token'];
    const {keyword, orderBy} = this.state;
    const filter = `keyword=${keyword}&orderBy=${orderBy}`;
    searchHistory(filter, token)
      .then((response) => {
        // console.log(response);
        // console.log('datahistory:', response.data.data);
        this.setState({
          dataHistory: response.data.data,
          isSuccess: true,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.errMsg, {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  };
  // showHistory = () => {

  // };
  componentDidMount() {
    this.searchHistoryReact();
  }
  render() {
    const {isSuccess, dataHistory} = this.state;
    return (
      <>
        <Header />
        <ToastContainer />
        {isSuccess ? (
          <div
            className='row content d-flex flex-row align-items-center content-search'
            style={{
              backgroundImage: `url("../assets/icons/circle.svg")`,
              backgroundPosition: 'center bottom',
              backgroundSize: '2vw 2vw',
              backgroundRepeat: 'no-repeat',
            }}>
            <div className='row'>
              <div className='col-12 col-md-8 p-0'>
                <div className='col-11'>
                  <div className='history-search-wrapper'>
                    <input
                      type='text'
                      placeholder='Search history'
                      className='history-search'
                    />
                    <button type='submit' className='search-icon'>
                      <img
                        src={searchSvg}
                        alt='search button'
                        className='history-search-button'
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
                <div className='col-6 col-md-5 col-lg-4'>
                  <select
                    name='orderBy'
                    id='orderBy'
                    className='history-search-filter'>
                    <option value='type'>Type</option>
                    <option value='date'>Date Added</option>
                    <option value='name'>Name</option>
                    <option value='favourite'>Favourite Product</option>
                  </select>
                </div>
                <div className='info-history row'>
                  <div className='info-history-wrapper col-10 col-sm-11 mb-2'>
                    Please finish your payment for vespa for Vespa Rental Jogja
                    <img src={forwarSvg} alt='next' />
                  </div>
                  <div className='col-2 col-sm-1 '>
                    {/* <input
                      type='checkbox'
                      className='checkbox-history m-auto'
                      name='deleteCheck'
                    /> */}
                  </div>
                  <div className='info-history-wrapper col-10 col-sm-11 mb-2'>
                    Your payment has been confirmed!
                    <img src={forwarSvg} alt='next' />
                  </div>
                  <div className='col-2 col-sm-1 m-auto'>
                    {/* <input
                      type='checkbox'
                      className='checkbox-history m-auto'
                    /> */}
                  </div>
                </div>
                <div className='history-list p-0 text-start mt-4 row'>
                  <h5 className='list-header'>A week ago</h5>
                  <ShowHistory dataHistory={dataHistory} />
                  <div className='col-12 col-sm-11 p-0'>
                    <button className='btn btn-yellow'>Delete Selected Item</button>
                  </div>
                </div>
              </div>
              <div className='d-none d-md-block col-md-4 mb-3 p-0'>
                <section className='new-arrival-wrapper mx-auto text-center'>
                  <h3 className='m-3'>New Arrival</h3>
                  <div className='new-arrival-box'>
                    <div className='vehicle-content d-flex justify-content-center mb-3'>
                      <div className='vehicle-images'>
                        <Link to={`/vehicle/1`}>
                          <img
                            src={require('../assets/images/car-default.jpg')}
                            alt='vehicles'
                          />
                          <figcaption>
                            <span className='fig-title'>Lamborghini</span>
                            <br />
                            <span className='fig-subtitle'>South Jakarta</span>
                          </figcaption>
                        </Link>
                      </div>
                    </div>
                    <div className='vehicle-content d-flex justify-content-center mb-3'>
                      <div className='vehicle-images'>
                        <Link to={`/vehicle/1`}>
                          <img
                            src={require('../assets/images/car-default.jpg')}
                            alt='vehicles'
                          />
                          <figcaption>
                            <span className='fig-title'>Lamborghini</span>
                            <br />
                            <span className='fig-subtitle'>South Jakarta</span>
                          </figcaption>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 view-more mt-4 mb-4'>
                    View More <br />
                    <img src={downSvg} alt='view more' />
                  </div>
                </section>
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

// export default History;
export default function WrapperHistory(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <History
      {...props}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}
