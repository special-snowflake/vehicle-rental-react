import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoadingPage from './LoadingPage';
import VehicleCard from './VehicleCard';

export default class SearchVehicle extends Component {
  state = {
    isSuccess: false,
    keyword: null,
    filter: '',
    searchResult: null,
    meta: null,
  };
  // searchVehicle(keyword, filter) {
  searchVehicle(keyword, filter) {
    // console.log('filter:', filter);
    const host = process.env.REACT_APP_HOST;
    // const paramKeywords =
    //   keyword !== null && typeof keyword !== 'undefined'
    //     ? `?keyword=${keyword}`
    //     : '';
    // const url = `${host}/vehicles/search?keyword=${keyword}${filter}`;
    // const url = `${host}/vehicles/search${paramKeywords}${filter}`;
    const url = `${host}/vehicles/search${filter}`;
    console.log('url inside search:', url);
    axios
      .get(url)
      .then((response) => {
        console.log('result:', response.data);
        this.setState({
          isSuccess: true,
          searchResult: response.data.data,
          meta: response.data.meta,
          keyword: keyword,
          page: response.data.meta.page,
          filter: filter,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  updateFilter(newFilter) {
    // const keyword = this.state.keyword;
    console.log('updatefiler:', newFilter);
    this.searchVehicle(null, newFilter);
    // this.setState({filter: newFilter});
  }

  showPagination(meta) {
    console.log('inside pagination');
    const {nextPage, page, previousPage, totalData, totalPage} = meta;
    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          {previousPage !== null ? (
            <li className='page-item'>
              <Link
                to={`/vehicle-type${previousPage}`}
                className='page-link'
                onClick={() => {
                  this.updateFilter(previousPage);
                }}>
                Previous
              </Link>
            </li>
          ) : (
            <li className='page-item' disabled>
              <button className='page-link'>Previous</button>
            </li>
          )}
          {/* <li className='page-item disabled'> */}
          <li className='page-item'>
            <a className='page-link' href='/'>
              {page}
              {/* <span className='sr-only'>(current)</span> */}
            </a>
          </li>
          <li className='page-item'>
            {nextPage !== null ? (
              <Link
                to={`/vehicle-type${nextPage}`}
                className='page-link'
                onClick={() => {
                  this.updateFilter(nextPage);
                }}>
                Next
              </Link>
            ) : (
              <button className='page-link'>Next</button>
            )}
          </li>
        </ul>
      </nav>
    );
  }
  componentDidMount() {
    // const useLocation = this.props.useLocation;
    const filter = this.props.location.search;
    const keyword = this.props.searchParams.get('keyword');
    const page = parseInt(this.props.page);
    console.log('page : ', page);
    console.log('the keyword is:', keyword);
    this.searchVehicle(keyword, filter);
  }
  componentDidUpdate(a, b) {
    const filter = this.props.location.search;
    const keyword = this.props.searchParams.get('keyword');
    // const location = this.props.location;
    // console.log('location:', location);
    console.log('a and b', a, b);
    console.log(this.props.searchParams.get('keyword'));
    console.log(this.props.searchParams.get('sort'));
    // console.log('the keyword is:', keyword);
    if (a.location.search !== filter) {
      this.searchVehicle(keyword, filter);
    }
  }
  render() {
    const {isSuccess, searchResult, keyword, meta} = this.state;
    // const totalData = !meta.totalData ? "0" : meta.totalData;
    let totalData = 0;
    if (meta !== null) totalData = meta.totalData;
    return (
      <>
        {isSuccess ? (
          <div>
            <div
              className='row content d-flex flex-row align-items-center justify-content-start'
              style={{
                backgroundImage: `url("../assets/icons/circle.svg")`,
                backgroundPosition: 'center bottom',
                backgroundSize: '2vw 2vw',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='col-12 mt-3 mb-2'>
                Showing 1-12 results from {totalData} for "
                <span className='fw-bold'>{keyword ? keyword : ' '}</span>"
              </div>
              {searchResult.length !== 0 ? (
                <VehicleCard dataVehicle={searchResult} />
              ) : (
                <div className='col-12 text-center sub-popular-title'>
                  We can't find anything you're looking for.
                </div>
              )}
            </div>
            <div className='col-12 text-center mx-auto mb-5'>
              {this.showPagination(this.state.meta)}
              {/* <Link to={`?keyword=&sort=asc&page=2`}>
                Some Link
              </Link> */}
            </div>
          </div>
        ) : (
          <LoadingPage />
        )}
      </>
    );
  }
}
