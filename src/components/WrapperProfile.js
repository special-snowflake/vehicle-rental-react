import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import LoadingPage from './LoadingPage';

import '../assets/css/Profile.css';

import pencilSvg from '../assets/icons/pencil.svg';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';

export class WrapperProfile extends Component {
  constructor(props) {
    super(props);
    this.inputFileRef = React.createRef();
    this.onFileChange = this.handleFileChange.bind(this);
    this.onBtnClick = this.inputImage.bind(this);
  }
  state = {
    isSuccess: false,
    dataUser: '',
    selectedFile: null,
    selectedSex: '',
    photoProfile: require('../assets/images/default3.jpg'),
    reRender: false,
  };
  getDataUser = () => {
    const userId = this.props.id;
    const urlUser = `http://localhost:8000/user/detail/${userId}`;
    console.log(urlUser);
    axios
      .get(urlUser)
      .then((response) => {
        const photo = response.data.data.photo;
        if (photo !== null && typeof photo !== 'undefined') {
          this.setState({
            photoProfile: `http://localhost:8000/user${photo}`,
          });
        }
        this.setState({
          dataUser: response.data.data,
          isSuccess: true,
          selectedSex: response.data.data.sex,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getBase64(e) {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        photoProfile: reader.result,
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  handleFileChange(e) {
    // const selectedFile = e.target.files[0];
    // console.log('inside change, selected: ', selectedFile);
    // const reader = new FileReader();

    // // const url = reader.readAsDataURL(selectedFile);
    // console.log('this is selected', url);
    // // reader.onloadend = function (e) {
    // //   // this.setState({
    // //   //     imgSrc: [reader.result];
    // //   // })
    // // }.bind(this);
    // // console.log('this is selected files', e.target.files[0]);
    this.getBase64(e);
    this.setState({
      selectedFile: e.target.files[0],
      // photoProfile: url,
    });
  }

  cancel() {
    this.setState({
      selectedSex: this.state.dataUser.sex,
    });
  }

  inputImage = (e) => {
    this.inputFileRef.current.click();
  };

  onValueChange(event) {
    this.setState({
      selectedSex: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = new FormData();
    const url = 'http://localhost:8000/user';
    if (this.state.selectedFile !== null) {
      body.append(
        'profilePicture',
        this.state.selectedFile,
        this.state.selectedFile.name,
      );
    }
    body.append('firstName', e.target.firstName.value);
    body.append('email', e.target.email.value);
    body.append('sex', this.state.selectedSex);
    body.append('address', e.target.address.value);
    body.append('phone', e.target.phone.value);
    body.append('dob', e.target.dob.value);
    const token = JSON.parse(localStorage.getItem('vehicle-rental-token'));
    const config = {
      headers: {
        'x-authorized-token': token,
      },
    };
    axios
      .patch(url, body, config)
      .then((response) => {
        console.log('response', response);
        this.getDataUser();
      })
      .catch((error) => {
        console.log('error', error.response);
      });
  }
  componentDidMount() {
    this.getDataUser();
  }

  render() {
    console.log('state is:', this.state);
    const {isSuccess, dataUser, photoProfile} = this.state;
    const {id, full_name, dob, sex, email, phone, address, join_at, photo} =
      dataUser;
    // let userImageURL = require('../assets/images/default3.jpg');
    // const image = photo;
    // console.log(typeof image);
    // if (image !== null) {
    //   userImageURL = `http://localhost:8000/user${dataUser.photo}`;
    // }
    let isMale = false;
    if (sex === 'M') isMale = true;
    console.log('ismale: ', isMale, sex);
    return (
      <>
        <Header />
        {isSuccess ? (
          <main className='row'>
            <div className='.d-none .d-sm-block col-sm-1'></div>
            <div className='col-12 col-sm-10'>
              <div className='col-12 col-sm-10 col-md-10'></div>
              <div className='row content'>
                <div
                  className='col-12 row-header'
                  style={{
                    fontFamily: `'Nunito', sans-serif`,
                    fontWeight: '900',
                  }}>
                  Profile
                </div>
                <div className='col-12 profile-info'>
                  <div className='row'>
                    <div className='.d-none .d-sm-block col-sm-3'></div>
                    <div className='col-12 col-sm-6 text-center'>
                      <div className='profile-image-wrapper'>
                        <img
                          src={photoProfile}
                          alt='User Profile'
                          className='profile-image'
                          onClick={this.inputImage}
                        />
                        <figcaption>
                          <button type='button' onClick={this.inputImage}>
                            <img
                              src={pencilSvg}
                              width='17px'
                              height='17px'
                              alt='Edit'
                            />
                          </button>
                        </figcaption>
                      </div>
                      <h3>{full_name}</h3>
                      <div className='user-info'>
                        <p>
                          {email} <br />
                          {phone}
                          <br />
                          Has been active since {join_at.slice(0, 4)}
                        </p>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='gender'
                          id='sex'
                          defaultValue='M'
                          defaultChecked={isMale}
                          onChange={this.onValueChange.bind(this)}
                        />
                        <label className='form-check-label' htmlFor='male'>
                          Male
                        </label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='gender'
                          id='sex'
                          defaultValue='F'
                          defaultChecked={!isMale}
                          onChange={this.onValueChange.bind(this)}
                        />
                        <label className='form-check-label' htmlFor='female'>
                          Female
                        </label>
                      </div>
                    </div>
                    <form
                      onSubmit={this.handleSubmit.bind(this)}
                      onReset={this.cancel.bind(this)}>
                      <div className='col-12 text-left profile-contacts'>
                        <div className='contact-header col-12 text-left'>
                          Contacts
                        </div>
                        <input
                          type='file'
                          name='image'
                          id='image'
                          ref={this.inputFileRef}
                          multiple={false}
                          onChange={this.onFileChange}
                          hidden
                        />
                        <input
                          type='text'
                          name='id'
                          id='id'
                          defaultValue={id}
                          hidden
                        />
                        <div className='col-12'>
                          <label htmlFor='email'>Email Address:</label>
                          <input
                            type='email'
                            className='input-proile'
                            name='email'
                            id='email'
                            defaultValue={email}
                          />
                        </div>
                        <div className='col-12'>
                          <label htmlFor='address'>Address:</label>
                          <input
                            type='text'
                            className='input-proile'
                            name='address'
                            id='address'
                            defaultValue={address}
                          />
                        </div>
                        <div className='col-12'>
                          <label htmlFor='phone'>Mobile Number:</label>
                          <input
                            type='text'
                            className='input-proile'
                            name='phone'
                            id='phone'
                            defaultValue={phone}
                          />
                        </div>
                        <div className='contact-header col-12 text-left'>
                          Identity
                        </div>
                        <div className='col-12'>
                          <div className='row'>
                            <div className='col-12 col-sm-6'>
                              <label htmlFor='display-name'>
                                Display Name:
                              </label>
                              <input
                                type='text'
                                className='input-proile'
                                name='firstName'
                                id='firstName'
                                defaultValue={full_name}
                              />
                            </div>
                            <div className='col-12 col-sm-6'>
                              <label htmlFor='dob'>DD/MM/YYYY:</label>
                              <input
                                type='date'
                                className='input-proile'
                                name='dob'
                                id='dob'
                                defaultValue={dob}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col 12'>
                          <div className='row gx-4'>
                            <div className='col-12 col-sm-4'>
                              <button type='submit' className='btn btn-yellow'>
                                Save Change
                              </button>
                            </div>
                            <div className='col-12 col-sm-4'>
                              <Link to='/' className='btn btn-black'>
                                Edit Password
                              </Link>
                            </div>
                            <div className='col-12 col-sm-4'>
                              <button className='btn btn-grey' type='reset'>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className='.d-none .d-sm-block col-sm-1'></div>
          </main>
        ) : (
          <LoadingPage />
        )}
        <Footer />
      </>
    );
  }
}

export default WrapperProfile;
