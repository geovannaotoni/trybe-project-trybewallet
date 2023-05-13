import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((elem) => (
            <tr key={ elem.id }>
              <td>{ elem.description }</td>
              <td>{ elem.tag }</td>
              <td>{ elem.method }</td>
              <td>{ Number(elem.value).toFixed(2) }</td>
              <td>{ elem.exchangeRates[elem.currency].name }</td>
              <td>{ Number(elem.exchangeRates[elem.currency].ask).toFixed(2) }</td>
              <td>
                {
                  (Number(elem.value)
                  * Number(elem.exchangeRates[elem.currency].ask)).toFixed(2)
                }
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
