// apiService.js

import axios from 'axios';

const API_BASE_URL = '/api';

// Metodo generico per effettuare una chiamata GET all'API
export const get = async (endpoint) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
  return response.data;
};

// Metodo generico per effettuare una chiamata POST all'API
export const post = async (endpoint, data) => {
  const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
  return response.data;
};

// Metodo generico per effettuare una chiamata PUT all'API
export const put = async (endpoint, data) => {
  const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
  return response.data;
};

// Metodo generico per effettuare una chiamata DELETE all'API
export const remove = async (endpoint) => {
  const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
  return response.data;
};
