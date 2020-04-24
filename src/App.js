import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Current from './components/Current';
import Pass from './components/Pass';
import Individuals from './components/Individuals';

class App extends Component {
  formatTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/current' render={() => <Current formatTime={this.formatTime} />} />
              <Route path='/pass' render={() => <Pass formatTime={this.formatTime} />} />
              <Route path='/individuals' component={Individuals} />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
