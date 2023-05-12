import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: 0,
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
    id: 0, // id inicial da despesa
  };

  // logo que o componente é montado, realiza a requisição para a API para obter a lista de moedas com a getCurrencies()
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  // função após o clique do botão. Cria um objeto chamado expense com as informações inseridas nos campos (salvas no state local). Em seguida, realiza um dispatch para a função addExpense, que atualiza a chave expenses do state global, que é um array de objetos
  handleClick = () => {
    const { dispatch } = this.props;
    const { valueInput, description, currency, method, tag, id } = this.state;
    const expense = {
      id,
      value: valueInput,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    dispatch(addExpense(expense));

    // O id da despesa deve ser um número sequencial
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  render() {
    const { valueInput, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    // console.log(currencies);
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            name="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
            id="valueInput"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            id="description"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((coin) => (
              <option value={ coin } key={ coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
