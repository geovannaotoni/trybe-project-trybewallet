import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleClickDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  handleClickEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section className="table-container">
        <table className="table table-hover">
          <thead>
            <tr className="table-primary">
              <th scope="row">Descrição</th>
              <th scope="row">Tag</th>
              <th scope="row">Método de pagamento</th>
              <th scope="row">Valor</th>
              <th scope="row">Moeda</th>
              <th scope="row">Câmbio utilizado</th>
              <th scope="row">Valor convertido</th>
              <th scope="row">Moeda de conversão</th>
              <th scope="row">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((elem) => (
              <tr key={ elem.id }>
                <td className="text-center align-middle">{ elem.description }</td>
                <td className="text-center align-middle">{ elem.tag }</td>
                <td className="text-center align-middle">{ elem.method }</td>
                <td className="text-center align-middle">
                  { Number(elem.value).toFixed(2) }
                </td>
                <td className="text-center align-middle">
                  { elem.exchangeRates[elem.currency].name }
                </td>
                <td className="text-center align-middle">
                  { Number(elem.exchangeRates[elem.currency].ask).toFixed(2) }
                </td>
                <td className="text-center align-middle">
                  {
                    (Number(elem.value)
                    * Number(elem.exchangeRates[elem.currency].ask)).toFixed(2)
                  }
                </td>
                <td className="text-center align-middle">Real</td>
                <td className="text-center align-middle">
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(elem.id) }
                    className="btn btn-warning"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickDelete(elem.id) }
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
