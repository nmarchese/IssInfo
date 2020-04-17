import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Current from './components/Current';
import Pass from './components/Pass';
import Individuals from './components/Individuals';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/current' component={Current} />
            <Route path='/pass' component={Pass} />
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
// Ideas for Improvement: pass format time function to multiple components that use it

export default App;
