import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    // return expenses; somente verificando se chegou certinho

    // se não houver nenhuma despesa salva, retorna o valor zero
    if (expenses.length === 0) {
      return 0;
    }

    // caso contrario, realiza um map no expenses, um array de objetos que contem todas as despesas adicionadas. A chave exchangeRates de cada despesa contem a lista de todas as taxas de cambios na chave ask. Utiliza-se o cambio específico da moeda salva em currency para multiplicar pelo valor salvo e obter um array dos valores finais de cada despesa.
    const arrayOfValues = expenses
      .map(({ currency, value, exchangeRates }) => {
        const cambio = exchangeRates[currency].ask;
        return (Number(value) * Number(cambio));
      });
    // por fim, faz-se um reduce para calcular a soma desse array de valores.
    return arrayOfValues
      .reduce((acc, curr) => Number(acc) + Number(curr))
      .toFixed(2);
  };

  render() {
    const { email } = this.props;
    // console.log(this.totalExpenses());
    return (
      <header>
        <p data-testid="email-field">{email}</p>

        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{this.totalExpenses()}</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
