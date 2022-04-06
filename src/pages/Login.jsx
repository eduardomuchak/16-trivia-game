import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import GameSettings from '../components/GameSettings';
import Header from '../components/Header';
import emailAction from '../Redux/Actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isButtonDisabled: true,
      settings: false,
    };
  }

  validateButton = () => {
    const { email, name } = this.state;
    const minPasswordLength = 0;
    // Regex encontrado no link: https://www.w3resource.com/javascript/form/email-validation.php
    const emailFormatRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (name.length > minPasswordLength && email.match(emailFormatRegex)) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  settingsPage = () => {
    const { settings } = this.state;
    this.setState({
      settings: !settings,
    });
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.validateButton);
  }

  render() {
    const { isButtonDisabled, email, name, settings } = this.state;
    const { login } = this.props;
    login(email);
    if (settings) {
      return (
        <GameSettings loginPage={ this.settingsPage } />
      );
    }
    return (
      <>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header> */}

        <label htmlFor="nameInput">
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="nameInput"
            value={ name }
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="gravatarEmailInput">
          <input
            type="email"
            name="email"
            id="gravatarEmailInput"
            data-testid="input-gravatar-email"
            onChange={ this.onInputChange }
            value={ email }
          />
        </label>

        <button
          disabled={ isButtonDisabled }
          type="button"
          data-testid="btn-play"
        >
          Play
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsPage }
        >
          Settings
        </button>
        <Header />
      </>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(emailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
