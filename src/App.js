import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './containers/login'
import Home from './containers/home'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Button } from 'antd';


class App extends Component {
  render() {
    return (
        <Router style={{height: '100%'}}>
          <div style={{height: '100%'}}>
              <Route  exact path="/" component={Login} />
              {/* <Route path="/" component={Home} /> */}
          </div>
        </Router>
    );
  }
}

export default App;
