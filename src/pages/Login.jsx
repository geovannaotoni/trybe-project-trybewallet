import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import '../styles/login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  // Função para adicionar o value do input no state local. Foi necessário verificar os campos passando uma função como segundo parâmetro do state para garantir que a validação é feita no momento certo.
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        btnDisabled: !this.verifyFields(),
      });
    });
  };

  // Função para verificar se os campos estão no formato correto, se sim ele retorna true e se não retorna falso
  verifyFields = () => {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validationEmail = emailRegex.test(email);
    const minLength = 6;
    const validationPassword = password.length >= minLength;
    return validationEmail && validationPassword;
  };

  // função para realizar o dispatch da action addEmail passando como parametro o email salvo no state local. Em seguida, a pagina é redirecionada para a rota /carteira
  handleClick = () => {
    const { history: { push }, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    push('/carteira');
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <section className="login mb-3 border border-primary border-opacity-50 rounded">
        <img src="https://static.vecteezy.com/system/resources/previews/001/312/507/original/piggy-bank-with-gold-coin-free-vector.jpg" alt="" />
        <h1 style={ { color: '#0d6efd' } }>TrybeWallet</h1>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          id="email"
          placeholder="Digite seu e-mail"
          data-testid="email-input"
          className="form-control"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          id="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          className="form-control"
        />
        <button
          type="button"
          disabled={ btnDisabled }
          onClick={ this.handleClick }
          className="btn btn-primary"
        >
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
