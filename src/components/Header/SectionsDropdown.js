import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { Link } from 'react-router-dom';

class SectionsDropdown extends Component {
  state = {
    show: false
  };

  handleClickOutside() {
    this.setState({ show: false });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    const { items, two } = this.props;

    return (
      <li className={`dropdown ${show ? 'active' : null}`}>
        <span onClick={() => this.toggle()} role="presentation">
          All sections
        </span>
        {show && (
          <div className="dropdown-content">
            <ul className={two ? 'two' : null}>
              {items.map((item, i) => {
                if (item.hr) {
                  return <hr key={i} />;
                }
                return (
                  <li key={i}>
                    <Link to={item.to}>{item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    );
  }
}

export default enhanceWithClickOutside(SectionsDropdown);
