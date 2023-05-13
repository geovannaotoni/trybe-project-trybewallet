import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';

describe('Testes para a página de Login', () => {
  it('Testa a validação dos campos de input de e-mail e senha quando corretos', () => {
    renderWithRouterAndRedux(<App />);
    const emailTesteTrue = 'teste@teste.com';
    const senhaTesteTrue = '123456';

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEnviar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, emailTesteTrue);
    userEvent.type(passwordInput, senhaTesteTrue);
    expect(btnEnviar).toBeEnabled();
  });

  it('Testa a validação dos campos de input de e-mail e senha quando corretos', () => {
    renderWithRouterAndRedux(<App />);
    const emailTesteFalse = 'teste';
    const senhaTesteFalse = '12345';

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEnviar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, emailTesteFalse);
    userEvent.type(passwordInput, senhaTesteFalse);
    expect(btnEnviar).toBeDisabled();
  });

  it('Verifica o comportamento do botão de Entrar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailTesteTrue = 'teste@teste.com';
    const senhaTesteTrue = '123456';

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEnviar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, emailTesteTrue);
    userEvent.type(passwordInput, senhaTesteTrue);
    expect(btnEnviar).toBeEnabled();

    userEvent.click(btnEnviar);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/teste@teste\.com/i)).toBeInTheDocument();
  });
});
