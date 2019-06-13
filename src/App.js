import React, {Component} from 'react';

import logo from './assets/logo-w.svg';
import './App.css';

import Number2Words from './libs/number2Words/number2Words.js';


class App extends Component {

  constructor(){
      super();
      this.state = {
        words: '',
        num_error: false,
        error_message: 'Please, insert a valid number.'
      };
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <img src={logo} />
          <p>
            <b>Convert your number in english words!</b>
          </p>
          <input className="App-input" type="text" onChange={this.handleChange()}/>
          {(!this.state.num_error) && <p>{this.state.words}</p>}
          {(this.state.num_error) && <p className="App-error">{this.state.error_message}</p>}
        </div>
      </div>
    );
  }

  handleChange = () => event => {
    try {
      let words = Number2Words.numberToEnglish(event.target.value);
      this.setState({
        words: words,
        num_error: false
      });
    }
    catch (error) {
      this.setState({
        words: '',
        num_error: true
      });
    }
  }

}


export default App;
