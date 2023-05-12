import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        btnDisabled: !this.verifyFields(),
      });
    });
  };

  verifyFields = () => {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validationEmail = emailRegex.test(email);
    const minLength = 6;
    const validationPassword = password.length >= minLength;
    return validationEmail && validationPassword;
  };

  handleClick = () => {
    const { history: { push }, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    push('/carteira');
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <section>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          id="email"
          placeholder="Digite seu e-mail"
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          id="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
        />
        <button type="button" disabled={ btnDisabled } onClick={ this.handleClick }>
          Entrar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
