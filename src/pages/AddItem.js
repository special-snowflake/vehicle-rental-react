import React from 'react';
// import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';
import {getCategory} from '../utils/https/category';
import {getCity} from '../utils/https/city';

import {numberToRupiah} from '../helpers/collection';

import {addVehicle} from '../utils/https/vehicles';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {toast} from 'react-toastify';

import backSvg from '../assets/icons/back.svg';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.inputFileRef1 = React.createRef();
    this.inputFileRef2 = React.createRef();
    this.inputFileRef3 = React.createRef();
    this.onFileChange1 = this.handleFileChange1.bind(this);
    this.onFileChange2 = this.handleFileChange2.bind(this);
    this.onFileChange3 = this.handleFileChange3.bind(this);
    this.onBtnClick1 = this.inputImage1.bind(this);
    this.onBtnClick2 = this.inputImage2.bind(this);
    this.onBtnClick3 = this.inputImage3.bind(this);
  }

  state = {
    counter: 1,
    image1: require('../assets/images/default-add-item.jpg'),
    image2: require('../assets/images/default-add-item.jpg'),
    image3: require('../assets/images/default-add-item.jpg'),
    selectedFiles1: null,
    selectedFiles2: null,
    selectedFiles3: null,
    priceValue: '',
    realPrice: '',
    category: null,
    city: null,
    navigate: null,
  };

  onClickAdd = () => {
    const newCounter = this.state.counter + 1;
    return this.setState({
      counter: newCounter,
    });
  };

  onClickSub = () => {
    const {counter} = this.state;
    const newCounter = counter > 1 ? counter - 1 : counter;
    return this.setState({
      counter: newCounter,
    });
  };

  handleFileChange1(e) {
    this.getBase64(e, 'image1');
    this.setState({
      selectedFiles1: e.target.files[0],
    });
  }
  inputImage1 = (e) => {
    this.inputFileRef1.current.click();
  };
  handleFileChange2(e) {
    this.getBase64(e, 'image2');
    this.setState({
      selectedFiles2: e.target.files[0],
    });
  }
  inputImage2 = (e) => {
    this.inputFileRef2.current.click();
  };
  handleFileChange3(e) {
    this.getBase64(e, 'image3');
    this.setState({
      selectedFiles3: e.target.files[0],
    });
  }
  inputImage3 = (e) => {
    this.inputFileRef3.current.click();
  };
  getBase64(e, stateImage) {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        [stateImage]: reader.result,
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  handleSubmit = (e) => {
    const {selectedFiles1, selectedFiles2, selectedFiles3} = this.state;
    e.preventDefault();
    const token = localStorage['vehicle-rental-token'];
    const body = new FormData();
    if (selectedFiles1 !== null) {
      body.append(
        'images',
        this.state.selectedFiles1,
        this.state.selectedFiles1.name,
      );
    }
    if (selectedFiles2 !== null) {
      body.append(
        'images',
        this.state.selectedFiles2,
        this.state.selectedFiles2.name,
      );
    }
    if (selectedFiles3 !== null) {
      body.append(
        'images',
        this.state.selectedFiles3,
        this.state.selectedFiles3.name,
      );
    }
    body.append('city_id', e.target.location.value);
    body.append('category_id', e.target.category.value);
    body.append('name', e.target.productName.value);
    body.append('description', e.target.description.value);
    body.append('price', this.state.realPrice);
    body.append('status', e.target.status.value);
    body.append('stock', this.state.counter);
    addVehicle(body, token)
      .then((response) => {
        console.log('response', response);
        const newNavigate = '/vehicle/' + response.data.data.id;
        console.log('new navigate:', newNavigate);
        this.setState({
          navigate: newNavigate,
        });
      })
      .catch((err) => {
        if (err.response.data.err_code) {
          if (
            err.response.data.err_code === 'TOKEN_EXPIRED' ||
            err.response.data.err_code === 'INVALID_TOKEN'
          ) {
            // this.props.dispatch(logoutAction());
            const {usenavigate} = this.props;
            usenavigate('/logout');
            toast.warning('Token Expired');
          }
        } else {
          console.log(err);
          const errMsg = err.response.data.errMsg;
          toast.error(errMsg);
        }
      });
  };

  priceHandler(e) {
    const priceFormat = numberToRupiah(e.target.value);
    this.setState({
      priceValue: priceFormat,
      realPrice: e.target.value,
    });
    e.target.type = 'text';
    e.target.value = priceFormat;
    console.log('type priceformat:', typeof priceFormat);
  }
  onFocusPrice(e) {
    e.target.type = 'number';
    e.target.value = this.state.realPrice;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    getCategory()
      .then((response) => {
        this.setState({
          category: response.data.data,
        });
      })
      .catch((err) => {
        toast.error('Error get category');
      });
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
  render() {
    const {
      counter,
      image1,
      image2,
      image3,
      category,
      city,
      navigate,
      // priceValue,
    } = this.state;
    const {usenavigate} = this.props;
    return (
      <>
        <Header />
        {navigate !== null && <Navigate to={navigate} />}
        <div>
          <main>
            <div className='row text-left'>
              <div className='.d-none .d-sm-block col-sm-1'></div>
              <div className='col-12 col-sm-10'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className='row content content-center'>
                    <div className='back-detail'>
                      <div className='col-12'>
                        <div onClick={() => usenavigate(-1)}>
                          <img
                            src={backSvg}
                            alt=''
                            width='23px'
                            height='23px'
                          />
                          <span style={{paddingLeft: '10px'}}>
                            Add New Item
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-sm-6 vehicle-noslide-detail'>
                      <div className='add-item-images d-flex'>
                        <div className='row'>
                          <div className='col-12 add-img-big-wrapper mb-2'>
                            <img
                              src={image1}
                              alt=''
                              className='add-img-big'
                              onClick={this.inputImage1}
                            />
                          </div>
                          <div className='col-6 add-img-small-wrapper'>
                            <img
                              src={image2}
                              alt=''
                              className='add-img-small'
                              onClick={this.inputImage2}
                            />
                          </div>
                          <div className='col-6 add-img-small-wrapper'>
                            <img
                              src={image3}
                              alt=''
                              className='add-img-small'
                              onClick={this.inputImage3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-sm-6 vehicle-input-details'>
                      <input
                        type='file'
                        name='image1'
                        id='image1'
                        ref={this.inputFileRef1}
                        multiple={false}
                        onChange={this.onFileChange1}
                        hidden
                      />
                      <input
                        type='file'
                        name='image2'
                        id='image2'
                        ref={this.inputFileRef2}
                        multiple={false}
                        onChange={this.onFileChange2}
                        hidden
                      />
                      <input
                        type='file'
                        name='image3'
                        id='image3'
                        ref={this.inputFileRef3}
                        multiple={false}
                        onChange={this.onFileChange3}
                        hidden
                      />
                      <input
                        type='text'
                        name='productName'
                        id='productName'
                        maxLength={50}
                        placeholder='Name (Max up to 50 words)'
                      />
                      <select
                        name='location'
                        id='location'
                        className='special-select'>
                        <option>Location</option>
                        {city !== null &&
                          city.map((city, idx) => (
                            <option value={city.id} key={city.id}>
                              {city.city}
                            </option>
                          ))}
                      </select>
                      <input
                        type='text'
                        name='description'
                        maxLength={150}
                        placeholder='Description (max up to 150 words)'
                      />
                      <section className='add-item-box'>
                        <h3 className='box-header'>Price : </h3>
                        <input
                          type='text'
                          name='price'
                          onBlur={(e) => {
                            this.priceHandler(e);
                          }}
                          onFocus={(e) => {
                            this.onFocusPrice(e);
                          }}
                          placeholder='Type the price'
                          min={0}
                        />
                        <h3 className='box-header'>Status : </h3>
                        <select
                          name='status'
                          id='status'
                          placeholder='Select Status'>
                          <option value='Available'>Available</option>
                          <option value='Unavailable'>Unavailable</option>
                        </select>
                      </section>
                      <div className='col-12 d-flex'>
                        <div className='col-6 col-sm-4 h-100 align-middle'>
                          <h3 className='box-header'>Stock: </h3>
                        </div>
                        <div className='col-6 col-sm-8 d-flex justify-content-between fw-bold'>
                          <div className='minus' onClick={this.onClickSub}>
                            -
                          </div>
                          <div className='number'>{counter}</div>
                          <div className='plus' onClick={this.onClickAdd}>
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-sm-4 mt-2'>
                      <select
                        name='category'
                        id='category'
                        className='btn select-black'>
                        {category !== null &&
                          category.map((category, idx) => (
                            <option value={category.id} key={category.id}>
                              {category.category}
                            </option>
                          ))}
                      </select>
                      {/* <button className='btn btn-black'>Add Item To</button> */}
                    </div>
                    <div className='col-12 col-sm-8 mt-2'>
                      <button
                        to='/reservation-payment'
                        type='submit'
                        className='btn btn-yellow'>
                        Save Item
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className='.d-none .d-sm-block col-sm-1'></div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

function WrapperAddItem(props) {
  const usenavigate = useNavigate();

  return <AddItem {...props} usenavigate={usenavigate} />;
}

export default WrapperAddItem;
