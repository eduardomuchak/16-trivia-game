import PropTypes from 'prop-types';
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import logo from '../trivia.png';
import '../App.css';
import { fetchToken } from '../Redux/Actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isButtonDisabled: true,
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

onInputChange = ({ target }) => {
  this.setState({ [target.name]: target.value }, this.validateButton);
}

handleClick = () => {
  const { getFetchToken, history } = this.props;
  history.push('/game');
  getFetchToken();
}

render() {
  const { isButtonDisabled, email, name } = this.state;
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
        onClick={ this.handleClick }
      >
        Play
      </button>
    </>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  getFetchToken: () => dispatch(fetchToken()),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  getFetchToken: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
