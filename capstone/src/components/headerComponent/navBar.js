import React, { Component } from './node_modules/react';
import { Link } from './node_modules/react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <header>
        <ul id="headerButtons">
          <li className="navButton"><Link to="">Home</Link></li>
        </ul>
      </header>
    )
  }
}

export default NavBar;