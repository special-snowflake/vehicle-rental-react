import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Invalid.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Unauthorize() {
  return (
    <>
      <Header />
      <main className='forbidden-main'>
        <div className='wrapper text-center col-12 col-sm-6'>
          <h1 className='four-0-three'>403</h1>
          <img src={require('../assets/images/you-shall-not-pass.jpg')} alt='Bike' />
          <p>You shall not pass!</p>
          <Link to='/home'>Back to home.</Link>
          <p></p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Unauthorize;
