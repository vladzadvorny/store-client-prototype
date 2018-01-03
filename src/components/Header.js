import React from 'react';

export default () => (
  <header className="header">
    <div className="container">
      <ul className="menu">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
        <li>
          <a href="#">Apps</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li className="dropdown">
          <span>Protocol</span>
          <div id="myDropdown" className="dropdown-content">
            <ul className="two">
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
              <li>
                <a href="#">Link</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul className="menu">
        <li className="dropdown">
          <span>Vlad</span>
          <div id="myDropdown2" className="dropdown-content">
            <ul>
              <li>
                <a href="#">Link</a>
              </li>
              <hr />
              <li>
                <a href="#">Link</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </header>
);
