const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Store token in localStorage
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// Auth
export const register = async (username, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  setToken(data.token);
  return data.user;
};

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  setToken(data.token);
  return data.user;
};

// Board
export const getBoard = async () => {
  const token = getToken();
  const res = await fetch(`${API_URL}/board`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

// Cards
export const createCard = async (section_id, title, content) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ section_id, title, content })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const updateCard = async (id, title, content, section_id) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/cards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, content, section_id })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const deleteCard = async (id) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/cards/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const moveCard = async (id, section_id) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/cards/${id}/move`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ section_id })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
