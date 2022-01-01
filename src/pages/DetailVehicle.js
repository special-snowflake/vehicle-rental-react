import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Counter from '../components/Counter';
import backSvg from '../assets/icons/back.svg';
import forwardSvg from '../assets/icons/forward.svg';
import '../assets/css/DetailVehicle.css';

class DetailVehicle extends Component {
  state = {
    counter: 0,
  };
  onClickAdd = () => {
    if (this.state.counter < 5) {
      const number = this.state.counter;
      this.setState({
        counter: number + 1,
      });
    }
  };
  onClickSubstract = () => {
    if (this.state.counter > 0) {
      const number = this.state.counter;
      this.setState({
        counter: number - 1,
      });
    }
  };
  render() {
    return (
      <>
        <Header />
        <main>
          <div class='row text-left'>
            <div class='.d-none .d-sm-block col-sm-1'></div>
            <div class='col-12 col-sm-10'>
              <div class='row content content-center'>
                <div class='back-detail'>
                  <div class='col-12'>
                    <Link to='/home'>
                      <img src={backSvg} alt='' width='23px' height='23px' />
                      <span style={{paddingLeft: '10px'}}> Detail </span>
                    </Link>
                  </div>
                </div>
                <div class='col-12 col-sm-6 vehicle-images-detail'>
                  <img
                    src={require('../assets/images/robert-bye-tG36rvCeqng-unsplash-c.webp')}
                    alt='Product'
                    width='100%'
                  />
                  <div class='row preview-images'>
                    <div class='col-2 align-items-center'>
                      <a href='#prev' aria-label='Previous Image'>
                        <img src={backSvg} width='18' height='18' alt='' />
                      </a>
                    </div>
                    <div class='col-8'>
                      <dev class='row'>
                        <div class='col-6'>
                          <img
                            src={require('../assets/images/robert-bye-tG36rvCeqng-unsplash-c.webp')}
                            width='100%'
                            alt=''
                          />
                        </div>
                        <div class='col-6'>
                          <img
                            src={require('../assets/images/robert-bye-tG36rvCeqng-unsplash-c.webp')}
                            width='100%'
                            alt=''
                          />
                        </div>
                      </dev>
                    </div>
                    <div class='col-2 align-items-center'>
                      <a href='#next' aria-label='Next Image'>
                        <img src={forwardSvg} width='18' height='18' alt='' />
                      </a>
                    </div>
                  </div>
                </div>
                <div class='col-12 col-sm-6 vehicle-info-details'>
                  <span class='vehicle-detail-header'>Fixie - Gray Only</span>
                  <br />
                  <span class='vehicle-detail-subheader'>Yogyakarta</span>
                  <br />
                  <br />
                  <span class='availabiliy'>Available</span> <br />
                  <span class='prepayment-status' style={{color: '#9b0a0a'}}>
                    No Prepayment
                  </span>
                  <p>
                    Capacity : 1 person <br />
                    Type : Bike <br />
                    Reservation before 2 PM
                  </p>
                  <div class='col-12'>
                    <div class='row'>
                      <div class='col-1 col-sm-6'></div>
                      <div class='col-11 col-sm-6 price'>
                        <span
                          style={{
                            fontFamily: `'Playfair Display', serif`,
                            fontSize: '20px',
                            fontWeight: 800,
                          }}>
                          Rp.78.000/day
                        </span>
                      </div>
                    </div>
                    <div class='row text-center total-items'>
                      <div class='col-3'>
                        <button onClick={this.onClickSubstract}>
                          <div class='wrapper-sub-item'>
                            <span
                              style={{
                                fontWeight: 800,
                                color: 'black',
                                fontSize: '25px',
                              }}>
                              -
                            </span>
                          </div>
                        </button>
                      </div>
                      <div
                        class='col-6'
                        style={{
                          fontWeight: 800,
                          fontSize: '25px',
                          padding: '5px',
                        }}>
                        <Counter
                          onClickAddCounter={this.onClickAdd}
                          onClickSubstractCounter={this.onClickSubstract}
                          counterNumber={this.state.counter}
                        />
                      </div>
                      <div class='col-3'>
                        <button onClick={this.onClickAdd}>
                          <div class='wrapper-add-item'>
                            <span
                              style={{
                                fontWeight: 800,
                                color: 'black',
                                fontSize: '25px',
                              }}>
                              +
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col 12'>
                  <div class='row justify-content-between'>
                    <div class='col-12 col-sm-4'>
                      <a href='#chat' class='btn btn-black'>
                        Chat Admin
                      </a>
                    </div>
                    <div class='col-12 col-sm-4'>
                      <a href='#reservation' class='btn btn-gold'>
                        Reservation
                      </a>
                    </div>
                    <div class='col-12 col-sm-3 like-item'>
                      <a href='#Like' class='btn btn-black'>
                        <i
                          class='bi bi-heart-fill'
                          style={{fontSize: '13px'}}></i>{' '}
                        Like
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='.d-none .d-sm-block col-sm-1'></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default DetailVehicle;
