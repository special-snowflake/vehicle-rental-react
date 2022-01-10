import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import searchSvg from '../assets/icons/search.svg';

import mbakmbak from '../assets/images/michael-dam-mEZ3PoFGs_k-unsplash-profile.webp';
import {Link} from 'react-router-dom';

function Chat() {
  return (
    <>
      <Header />
      <div
        className='row content d-flex flex-row align-items-center content-search'
        style={{
          backgroundImage: `url("../assets/icons/circle.svg")`,
          backgroundPosition: 'center bottom',
          backgroundSize: '2vw 2vw',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className='row justify-content-center'>
          <div className='col-7 col-lg-8'>
            <div className='col-12 search-input-wrapper'>
              <form>
                <input
                  type='text'
                  name='searchVehicle'
                  id='search-vehicle'
                  className='input-search'
                  placeholder='Search chat'
                />
                <button type='submit' className='search-icon'>
                  <img
                    src={searchSvg}
                    alt='search button'
                    width={30}
                    height={30}
                  />
                </button>
              </form>
            </div>
          </div>
          <div className='col-5 col-lg-2'>
            <div className='col-12 search-input-wrapper'>
              <select name='sortby' className='input-filter'>
                <option value='read'>Read Date</option>
                <option value='read'>Date Added</option>
                <option value='read'>Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div
        className='row content d-flex flex-row align-items-center content-search'
        style={{
          backgroundImage: `url("../assets/icons/circle.svg")`,
          backgroundPosition: 'center bottom',
          backgroundSize: '2vw 2vw',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className='row chat-list justify-content-center'>
          <div className='col-12 col-lg-10 chats'>
            <Link to='/chat/view'>
              <div className='chat-user-picture'>
                <img src={mbakmbak} alt='profile' />
              </div>
              <p className='chats-user-name'>Johnson</p>
              <p className='chats-preview-chat chats-new'>
                Hey is the vespa still available?
              </p>
              <p className='chats-time-send'>Today</p>
              <p className='chats-count'>1</p>
            </Link>
          </div>
          <div className='col-12 col-lg-10 chats'>
            <Link to='/chat/view'>
              <div className='chat-user-picture'>
                <img src={mbakmbak} alt='profile' />
              </div>
              <p className='chats-user-name'>Lancelot</p>
              <p className='chats-preview-chat chats-new'>Odete oh odete.</p>
              <p className='chats-time-send'>Today</p>
              <p className='chats-count'>1</p>
            </Link>
          </div>
          <div className='col-12 col-lg-10 chats'>
            <Link to='/chat/view'>
              <div className='chat-user-picture'>
                <img src={mbakmbak} alt='profile' />
              </div>
              <p className='chats-user-name'>Minotaur</p>
              <p className='chats-preview-chat'>What was i saying again?</p>
              <p className='chats-time-send'>Today</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Chat;
