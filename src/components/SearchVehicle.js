import axios from 'axios';
import React, {Component} from 'react';
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
  searchVehicle(keyword, filter) {
    console.log('filter:', filter);
    const host = process.env.REACT_APP_HOST;
    const url = `${host}/vehicles/search?keyword=${keyword}${filter}`;
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
          filter: filter,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    const keyword = this.props.keyword;
    const filter = this.props.filter;
    console.log('the keyword is:', keyword);
    this.searchVehicle(keyword, filter);
  }
  componentDidUpdate() {
    const keyword = this.props.keyword;
    const filter = this.props.filter;
    console.log('the keyword is:', keyword);
    if (keyword !== this.state.keyword || filter !== this.state.filter) {
      this.searchVehicle(keyword, filter);
    }
  }
  render() {
    const {isSuccess, searchResult, keyword} = this.state;
    // const keywordProps = this.props.keyword;
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
              <div className='col-12 row-header'>Result : "{keyword}"</div>
              {searchResult.length !== 0 ? (
                <VehicleCard dataVehicle={searchResult} />
              ) : (
                <div className='col-12 text-center sub-popular-title'>
                  We can't find anything you're looking for.
                </div>
              )}
            </div>
          </div>
        ) : (
          <LoadingPage />
        )}
      </>
    );
  }
}
