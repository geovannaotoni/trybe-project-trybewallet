// Coloque aqui suas actions
// ACTION TYPE para o user
export const ADD_EMAIL = 'ADD_EMAIL';
// ACTION TYPE para a requisição da API
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';

// ACTION CREATOR para o user
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

// ACTION CREATOR para a requisição da API
export const requestSuccessful = (data) => ({
  type: REQUEST_SUCCESSFUL,
  payload: data,
});

// thunk action creator: deve retornar uma função
export function getCurrencies() {
  return async (dispatch) => {
    try {
      // realiza o fetch para a API
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      // o data é o objeto de objetos
      const data = await response.json();
      // necessário transformar o data em um array de strings, por isso, utiliza-se o Object.keys para selecionar somente as chaves de cada objeto (que são as moedas) e em seguida usar o filter para remover a moeda USDT
      const arrayOfData = Object.keys(data).filter((currency) => currency !== 'USDT');
      dispatch(requestSuccessful(arrayOfData));
    } catch (error) {
      console.error(error);
    }
  };
}
