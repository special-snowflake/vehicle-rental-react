import React from 'react';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import backSvg from '../assets/icons/back.svg';
import mbakmbak from '../assets/images/michael-dam-mEZ3PoFGs_k-unsplash-profile.webp';
import cameraSvg from '../assets/icons/camera.svg';

class ChatView extends React.Component {
  render() {
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
          <div className='row chat-list justify-content-center'>
            <div className='col-12 col-lg-10'>
              <div className='back-detail'>
                <div className='col-2'>
                  <Link to='/chat' className='d-inline-flex align-items-center'>
                    <img src={backSvg} alt='' width='23px' height='23px' />
                    <div className='inside-chat-user-picture'>
                      <img src={mbakmbak} alt='profile' />
                    </div>
                    <span className='inside-chat-name'> Johnson </span>
                  </Link>
                </div>
              </div>
              <section className='chat-field'>
                <div className='chat-msg d-flex'>
                  <div className='w-100'>
                    <div className='col-12 chat-product d-flex'>
                      <div className='chat-img-wrapper'>
                        <img
                          src={require('../assets/images/iqx-azmi-jn01MSrsUpE-unsplash-cmobile.webp')}
                          alt=''
                        />
                      </div>
                      <div className="chat-product-info">
                        <p className='vehicle-detail-header'>Fixie - Gray Only</p>
                        <p className='vehicle-detail-subheader mt-2'>Yogyakarta</p>
                        <p className='availabiliy mt-2'>Available</p>
                        <div className="col-12 text-end price">Rp 78.000/day</div>
                      </div>
                    </div>
                    <div className='col-12 text-end mt-3 d-flex justify-content-start'>
                      <div className='chat-msg-left'>
                        is this still available? is this still available?is this
                        still available?is this still available?is this still
                        available?is this still available?
                      </div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <p className='time-chat'>12:30 PM</p>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <div className='chat-msg-left'>
                        is this still available? is this still available?is this
                        still available?is this still available?is this still
                        available?is this still available?
                      </div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <p className='time-chat'>12:30 PM</p>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <div className='chat-msg-left'>
                        is this still available? is this still available?is this
                        still available?is this still available?is this still
                        available?is this still available?
                      </div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <p className='time-chat'>12:30 PM</p>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <div className='chat-msg-left'>
                        is this still available? is this still available?is this
                        still available?is this still available?is this still
                        available?is this still available?
                      </div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <p className='time-chat'>12:30 PM</p>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <div className='chat-msg-left'>
                        is this still available?
                      </div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <p className='time-chat'>12:30 PM</p>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <div className='chat-msg-left'>
                        is this still available?
                      </div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-start'>
                      <p className='time-chat'>12:31 PM</p>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-end'>
                      <div className='chat-msg-right'>yes it is</div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-end'>
                      <p className='time-chat'>READ 12:35 PM</p>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-end'>
                      <div className='chat-msg-right'>You may order it now</div>
                    </div>
                    <div className='col-12 text-end mt-1 d-flex justify-content-end'>
                      <p className='time-chat'>12:36 PM</p>
                    </div>
                  </div>
                </div>
                <div className='typing-area'>
                  <textarea
                    name='chat-msg'
                    rows='1'
                    placeholder='Type something here'></textarea>
                  <img src={cameraSvg} alt='insert file' />
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ChatView;
