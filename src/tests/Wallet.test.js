import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import App from '../App';

const valueInputTestId = 'value-input';
const totalFieldTestId = 'total-field';

describe('Testes para a página Wallet', () => {
  const initialEntries = ['/carteira'];
  const expenseExample1 = {
    id: 0,
    value: '10',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Transporte',
    description: 'Dez dólares',
    exchangeRates: mockData,
  };
  const expenseExample2 = {
    id: 1,
    value: '1',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
    description: 'Um dólar',
    exchangeRates: mockData,
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verifica os elementos presentes na página', () => {
    const initialState = { user: { email: 'teste@teste.com' } };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    expect(screen.getByText(/teste@teste\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    expect(screen.getByTestId(valueInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(btnAddExpense).toBeInTheDocument();
  });

  it('Verifica se o Header calcula de forma correta o valor total das despesas', () => {
    const initialState = {
      wallet: {
        expenses: [expenseExample1, expenseExample2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    expect(screen.getByTestId(totalFieldTestId)).toHaveTextContent('52.28');
  });

  it('Verifica o botão de editar despesa', async () => {
    const initialState = {
      wallet: {
        expenses: [expenseExample1, expenseExample2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const btnEditar = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(btnEditar[0]);

    const valueInput = screen.getByTestId(valueInputTestId);
    userEvent.type(valueInput, '100');
    // expect(valueInput).toHaveValue(100);
    const btnEnviarEdicao = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(btnEnviarEdicao);
    await waitForElementToBeRemoved(() => screen.getByText('52.28'));
    expect(screen.getByTestId(totalFieldTestId)).toHaveTextContent('480.06');
  });

  it('Verifica o botão de deletar despesa', () => {
    const initialState = {
      wallet: {
        expenses: [expenseExample1, expenseExample2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const btnExcluir = screen.getAllByRole('button', {
      name: /excluir/i,
    });
    console.log(btnExcluir);
    userEvent.click(btnExcluir[0]);
    expect(screen.getByTestId(totalFieldTestId)).toHaveTextContent('4.75');
  });

  it('Verifica se ao adicionar uma despesa, os inputs são limpos', () => {
    // renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    // const valueInput = screen.getByTestId(valueInputTestId);
    // const descriptionInput = screen.getByTestId('description-input');
    // const currencyInput = screen.getByTestId('currency-input');
    // const methodInput = screen.getByTestId('method-input');
    // const tagInput = screen.getByTestId('tag-input');
    // const btnAddExpense = screen.getByRole('button', {
    //   name: /adicionar despesa/i,
    // });
  });
});
