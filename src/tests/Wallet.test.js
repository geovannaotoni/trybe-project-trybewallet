import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import App from '../App';

describe('Testes para a página Wallet', () => {
  const initialState = { user: { email: 'teste@teste.com' } };
  const initialEntries = ['/carteira'];

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
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    expect(screen.getByText(/teste@teste\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(btnAddExpense).toBeInTheDocument();
  });
});
