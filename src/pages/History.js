import React from 'react';
import {Link, useLocation, useSearchParams} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import searchSvg from '../assets/icons/search.svg';
import forwarSvg from '../assets/icons/forward.svg';
import downSvg from '../assets/icons/down.svg';
import {searchHistory} from '../utils/https/history';
import {searchVehicle} from '../utils/https/vehicles';
// import {numberToRupiah} from '../helpers/collection';

import {toast} from 'react-toastify';
import ShowHistory from '../components/ShowHistory';

class History extends React.Component {
  state = {
    isSuccess: false,
    dataNewArrival: null,
    dataHistory: null,
    keyword: '',
    orderBy: 'date',
    meta: null,
    page: '1',
  };
  getNewArrival = () => {
    searchVehicle('?sort=desc&limit=2')
      .then((response) => {
        console.log('new arrival :', response);
        this.setState({
          dataNewArrival: response.data.data,
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
          {/* <li className='page-item disabled'> */}
          <li className='page-item'>
            <button className='page-link'>
              {page}
              {/* <span className='sr-only'>(current)</span> */}
            </button>
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
              <img src={imageURL} alt='vehicles' />
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
        // prevKeyword: this.state.keyword,
        // prevOrderBy: this.state.orderBy,
        page: '1',
        keyword: e.target.keyword.value,
        orderBy: e.target.orderBy.value,
      });
      this.searchHistoryReact();
    };
    const {location, searchParams, setSearchParams} = this.props;
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
                        {/* <option value='favourite'>Favourite Product</option> */}
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
                  />
                  {this.showPagination()}
                  <div className='col-12 col-sm-11 p-0'>
                    <button className='btn btn-yellow'>
                      Delete Selected Item
                    </button>
                  </div>
                </div>
              </div>
              <div className='d-none d-md-block col-md-4 mb-3 py-0 px-2'>
                <section className='new-arrival-wrapper mx-auto text-center'>
                  <h3 className='m-3'>New Arrival</h3>
                  <div className='new-arrival-box'>{this.showNewArrival()}</div>
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
  const location = useLocation();
  return (
    <History
      {...props}
      location={location}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}
