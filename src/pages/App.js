import React, {Component} from 'react';
import logo from '../logo.svg';
import '../assets/css/App.css';
import Text from '../components/Text';

class App extends Component {
  state = {
    counter: 0,
    content: 'This is a content.',
  };
  render() {
    console.log(this.state.counter);
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>WELCOME</h1>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'>
            Learn React
          </a>
          <Text content={this.state.content} />
          <div className='button-wrapper'>
            <button
              className='btn btn-sm btn-primary'
              onClick={() => {
                const number = this.state.counter;
                this.setState({
                  counter: number - 1,
                });
              }}>
              Prev
            </button>
            <button
              className='btn btn-sm btn-secondary'
              onClick={() => {
                const number = this.state.counter;
                this.setState({
                  counter: number + 1,
                });
              }}>
              Next
            </button>
          </div>
          <form
            className='content-change'
            onSubmit={(event) => {
              event.preventDefault();
              console.log(event.target.inputContent.value);
              const newContent = event.target.inputContent.value;
              this.setState({
                content: newContent,
              });
              console.log(this.state);
            }}>
            <input type='text' name='inputContent' id='inputContent' />
            <button type='submit'>Ubah</button>
          </form>
        </header>
      </main>
    );
  }
}

export default App;
