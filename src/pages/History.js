import React from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import searchSvg from '../assets/icons/search.svg';
import forwarSvg from '../assets/icons/forward.svg';
import downSvg from '../assets/icons/down.svg';
import {searchHistory, deleteHistory} from '../utils/https/history';
import {searchVehicle} from '../utils/https/vehicles';

import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../assets/css/Modals.css';
// import {numberToRupiah} from '../helpers/collection';

import {toast} from 'react-toastify';
import ShowHistory from '../components/ShowHistory';
const defaultImage = require('../assets/images/car-default.jpg');
class History extends React.Component {
  state = {
    isSuccess: false,
    dataNewArrival: null,
    arrivalIsSuccess: false,
    dataHistory: null,
    keyword: '',
    orderBy: 'date',
    meta: null,
    page: '1',
    historyIds: [],
  };
  getNewArrival = () => {
    searchVehicle('?sort=desc&limit=2')
      .then((response) => {
        console.log('new arrival :', response);
        this.setState({
          dataNewArrival: response.data.data,
          arrivalIsSuccess: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showPagination() {
    const {meta} = this.state;
    console.log('inside pagination');
    const {nextPage, page, previousPage} = meta;
    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          {previousPage !== null ? (
            <li className='page-item'>
              <Link
                to={`${previousPage}`}
                className='page-link'
                onClick={() => {
                  this.updateFilter(previousPage);
                }}>
                Previous
              </Link>
            </li>
          ) : (
            <li className='page-item disabled'>
              <button className='page-link' aria-disabled='true'>
                Previous
              </button>
            </li>
          )}
          <li className='page-item'>
            <button className='page-link'>{page}</button>
          </li>
          {nextPage !== null ? (
            <li className='page-item'>
              <Link
                to={`${nextPage}`}
                className='page-link'
                onClick={() => {
                  this.updateFilter(nextPage);
                }}>
                Next
              </Link>
            </li>
          ) : (
            <li className='page-item disabled'>
              <button className='page-link' aria-disabled='true'>
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
  searchHistoryReact = () => {
    const token = localStorage['vehicle-rental-token'];
    const {keyword, orderBy} = this.state;
    const useSearchParams = this.props.searchParams;
    const page = useSearchParams.get('page')
      ? useSearchParams.get('page')
      : this.state.page;
    const filter = `keyword=${keyword}&orderBy=${orderBy}&page=${page}`;
    searchHistory(filter, token)
      .then((response) => {
        this.setState({
          dataHistory: response.data.data,
          isSuccess: true,
          meta: response.data.meta,
          page: response.data.meta.page,
        });
      })
      .catch((err) => {
        if (err.response.data.err_code) {
          if (
            err.response.data.err_code === 'TOKEN_EXPIRED' ||
            err.response.data.err_code === 'INVALID_TOKEN'
          ) {
            const {usenavigate} = this.props;
            usenavigate('/logout');
            toast.warning('Token Expired');
          }
        } else {
          toast.error(err.response.data.errMsg);
        }
      });
  };

  showNewArrival = () => {
    const {dataNewArrival} = this.state;
    const elements = [];
    const host = process.env.REACT_APP_HOST;
    if (dataNewArrival.length === 0) {
      return <div>Data isn't available.</div>;
    }
    for (let i = 0; i < dataNewArrival.length; i++) {
      const {name, city, image, id} = dataNewArrival[i];
      const imageURL = image
        ? `${host}/vehicles${image}`
        : require('../assets/images/car-default.jpg');
      const element = (
        <div
          className='vehicle-content d-flex justify-content-center mb-3'
          key={`newArrival-${i}`}>
          <div className='vehicle-images'>
            <Link to={`/vehicle/${id}`}>
              <img
                src={imageURL}
                alt='vehicles'
                onError={({currentTarget}) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultImage;
                }}
              />
              <figcaption>
                <span className='fig-title'>{name}</span>
                <br />
                <span className='fig-subtitle'>{city}</span>
              </figcaption>
            </Link>
          </div>
        </div>
      );
      elements.push(element);
    }

    return elements;
  };

  componentDidUpdate(prevState) {
    const filter = this.props.location.search;
    if (prevState.location.search !== filter) {
      this.searchHistoryReact();
    }
  }

  componentDidMount() {
    this.getNewArrival();
    const {searchParams} = this.props;
    if (!searchParams.get('keyword')) {
      this.searchHistoryReact();
    } else {
      const keyword = searchParams.get('keyword');
      const orderBy = searchParams.get('orderBy')
        ? searchParams.get('orderBy')
        : 'date';
      this.setState({
        prevKeyword: this.state.keyword,
        prevOrderBy: this.state.orderBy,
        keyword,
        orderBy,
      });
    }
  }

  callbackHistoryId(ids) {
    this.setState({
      historyIds: ids,
    });
  }

  render() {
    const {isSuccess, dataHistory} = this.state;

    const onSubmitHandler = (e) => {
      e.preventDefault();
      const {setSearchParams} = this.props;
      const params = {
        keyword: e.target.keyword.value,
        orderBy: e.target.orderBy.value,
        page: '1',
      };
      setSearchParams(params);
      this.setState({
        page: '1',
        keyword: e.target.keyword.value,
        orderBy: e.target.orderBy.value,
      });
      this.searchHistoryReact();
    };
    const onclickDelete = () => {
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure you want to delete history?</h1>
              <div className='d-flex justify-content-evenly'>
                <button
                  className='btn btn-yes px-2 me-2'
                  onClick={() => {
                    onClose();
                    deleteSelectedHistory();
                  }}>
                  Yes
                </button>
                <button className='btn btn-no px-2 ms-2' onClick={onClose}>
                  No
                </button>
              </div>
            </div>
          );
        },
      });
    };

    const deleteSelectedHistory = () => {
      console.log('delete history,', this.state.historyIds);
      const token = localStorage['vehicle-rental-token'];
      console.log('token', token);
      const body = {
        historyIds: this.state.historyIds,
      };
      deleteHistory(body, token)
        .then((response) => {
          toast.success('History deleted.');
          this.searchHistoryReact();
        })
        .catch((err) => {
          if (err.response.data.err_code) {
            if (
              err.response.data.err_code === 'TOKEN_EXPIRED' ||
              err.response.data.err_code === 'INVALID_TOKEN'
            ) {
              const {usenavigate} = this.props;
              usenavigate('/logout');
              toast.warning('Token Expired');
            }
          } else {
            console.log(err.response);
            toast.error('Failed to delete history');
          }
        });
    };

    const {location, searchParams, setSearchParams} = this.props;
    const {arrivalIsSuccess} = this.state;
    console.log('is arrival ', arrivalIsSuccess);

    return (
      <>
        <Header />
        {isSuccess ? (
          <div
            className='row content d-flex flex-row align-items-center content-search mt-3'
            style={{
              backgroundPosition: 'center bottom',
              backgroundSize: '2vw 2vw',
              backgroundRepeat: 'no-repeat',
            }}>
            <div className='row'>
              <div className='col-12 col-md-8 p-0'>
                <form onSubmit={onSubmitHandler}>
                  <div className='row'>
                    <div className='col-12 col-sm-6'>
                      <div className='history-search-wrapper'>
                        <input
                          type='text'
                          name='keyword'
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
                    <div className='col-12 col-sm-5 ps-sm-2'>
                      <select
                        name='orderBy'
                        id='orderBy'
                        className='history-search-filter'>
                        <option value='date'>Date Added</option>
                        <option value='type'>Type</option>
                        <option value='name'>Name</option>
                      </select>
                    </div>
                    <div className='col-8 col-sm-4 mb-3'>
                      <button className='btn btn-yellow mt-0' type='submit'>
                        Search
                      </button>
                    </div>
                  </div>
                </form>

                <div className='info-history row'>
                  <div className='info-history-wrapper col-10 col-sm-11 mb-2'>
                    Please finish your payment for vespa for Vespa Rental Jogja
                    <img src={forwarSvg} alt='next' />
                  </div>
                  <div className='col-2 col-sm-1 '></div>
                  <div className='info-history-wrapper col-10 col-sm-11 mb-2'>
                    Your payment has been confirmed!
                    <img src={forwarSvg} alt='next' />
                  </div>
                  <div className='col-2 col-sm-1 m-auto'></div>
                </div>
                <div className='history-list p-0 text-start mt-4 mb-4 row'>
                  {this.state.meta.totalData !== 0 && (
                    <h5 className='list-header ps-0'>
                      {this.state.meta.totalData} history found.{' '}
                    </h5>
                  )}

                  <ShowHistory
                    dataHistory={dataHistory}
                    location={location}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    callbackHistoryId={this.callbackHistoryId.bind(this)}
                  />
                  <div className='col-12 col-sm-11 p-0 mb-3'>
                    <button
                      className='btn btn-yellow'
                      disabled={this.state.historyIds.length === 0}
                      onClick={() => {
                        if (this.state.historyIds.length !== 0) {
                          onclickDelete();
                        }
                      }}>
                      Delete Selected Item
                    </button>
                    {/* )} */}
                  </div>
                  {this.showPagination()}
                </div>
              </div>
              <div className='d-none d-md-block col-md-4 mb-3 py-0 px-2'>
                <section className='new-arrival-wrapper mx-auto text-center'>
                  <h3 className='m-3'>New Arrival</h3>
                  <div className='new-arrival-box'>
                    {arrivalIsSuccess ? this.showNewArrival() : ''}
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

export default function WrapperHistory(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const usenavigate = useNavigate();
  return (
    <History
      {...props}
      location={location}
      searchParams={searchParams}
      usenavigate={usenavigate}
      setSearchParams={setSearchParams}
    />
  );
}
