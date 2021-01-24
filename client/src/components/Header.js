import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

import './Header.css';
class Header extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google"> Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" className="credits">
            {' '}
            Credits: ${this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">LogOut</a>
          </li>,
        ];
    }
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper  blue-grey darken-1">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="emaily left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
