import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, getCurrencies, saveEditExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0, // id inicial da despesa
    editor: false,
  };

  // logo que o componente é montado, realiza a requisição para a API para obter a lista de moedas com a getCurrencies()
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    if (nextProps.editor && nextProps.editor !== nextState.editor) {
      const expenseToEdit = nextProps.expenses[nextProps.idToEdit];
      console.log(expenseToEdit);
      const { id, value, description, currency, method, tag } = expenseToEdit;
      this.setState({
        id,
        value,
        description,
        currency,
        method,
        tag,
        editor: true,
      });
    }
    return true;
  }

  // função para resetar o state para os valores default
  resetState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  // função após o clique do botão. Cria um objeto chamado expense com as informações inseridas nos campos (salvas no state local). Em seguida, realiza um dispatch para a função addExpense, que atualiza a chave expenses do state global, que é um array de objetos
  handleClickAdd = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.exchangeRates(),
    };
    dispatch(addExpense(expense));

    this.resetState();
    // O id da despesa deve ser um número sequencial
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  // função que faz a requisição para a api
  exchangeRates = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // função após o clique de editar despesa. Ele cria um novo objeto com as informações da despesa, passando o mesmo id do estado global (idToEdit).
  handleClickEdit = async () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.exchangeRates(),
    };
    dispatch(saveEditExpense(expense));
    this.resetState();
    // Após disparar a ação de salvar a despesa editada, o id do estado local volta a ser o id sequencial da lista de despesas
    this.setState({
      id: expenses[expenses.length - 1].id + 1,
      editor: false,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    // console.log(currencies);
    return (
      <form>
        <label htmlFor="value" className="col">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            id="value"
            data-testid="value-input"
            className="form-control"
          />
        </label>
        <label htmlFor="description" className="col">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            id="description"
            data-testid="description-input"
            className="form-control"
          />
        </label>
        <label htmlFor="currency" className="col">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
            className="form-select"
          >
            {currencies.map((coin) => (
              <option value={ coin } key={ coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="col">
          Método de Pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            className="form-select"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="col">
          Categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
            className="form-select"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {
          editor ? (
            <button
              type="button"
              onClick={ this.handleClickEdit }
              className="btn btn-success col"
            >
              <i className="bi bi-pencil" />
              Editar despesa
            </button>)
            : (
              <button
                type="button"
                onClick={ this.handleClickAdd }
                className="btn btn-primary col"
              >
                <i className="bi bi-plus-lg" />
                Adicionar despesa
              </button>
            )
        }
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
