import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    // return expenses; somente verificando se chegou certinho

    // se não houver nenhuma despesa salva, retorna o valor zero
    if (expenses.length === 0) {
      return '0.00';
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
        <h1 style={ { color: '#0d6efd' } }>
          {/* <i className="bi bi-piggy-bank-fill" /> */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Piggy_Bank_or_Savings_Flat_Icon_Vector.svg/2048px-Piggy_Bank_or_Savings_Flat_Icon_Vector.svg.png" alt="" />
          TrybeWallet
        </h1>
        <div>
          <h4>
            <i className="bi bi-envelope-fill" style={ { color: '#0d6efd' } } />
            <span data-testid="email-field">
              {email}
            </span>
          </h4>
          <h4>
            <i className="bi bi-currency-dollar" style={ { color: '#0d6efd' } } />
            <span data-testid="header-currency-field">BRL</span>
            <span data-testid="total-field">{this.totalExpenses()}</span>
          </h4>
        </div>
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
