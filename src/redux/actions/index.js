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
