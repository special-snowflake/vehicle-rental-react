import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/Invalid.css';
import {Link} from 'react-router-dom';
import AnimatedBike from '../assets/images/ezgif-6-4498e838f4.gif';
import BrokenBike from '../assets/images/360_F_446827698_DGRgLDEMSQbISru8zlZN72M9U72SMEW82.jpg';

function InvalidRoute() {
  const messeges = [
    'It seems like you lost your way.',
    `Oops! You weren't supposed to see this.`,
    'Are you lost? Grab your bike now and get moving.',
    `Something's wrong here, I can feel it.`,
    `Oops! You blew up the Internet.`,
    `Sorry we can't find the page! Don't worry though, everything is still awesome.`,
    `This is not the web page you are looking for.`,
    `You've gone off script.`,
    `OMG. What have you done? Just kidding, everything is fine. I think.`
  ];
  const images = [
    AnimatedBike,
    BrokenBike
  ]
  const messege = messeges[Math.floor(Math.random() * messeges.length)];
  const image = images[Math.floor(Math.random() * images.length)];
  return (
    <>
      <Header />
      <main className='invalid-main'>
        <div className='wrapper text-center col-12 col-sm-6'>
          <h1>404</h1>
          <img src={image} alt='Bike' />
          <p>{messege}</p>
          <Link to='/home'>Back to home.</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default InvalidRoute;
