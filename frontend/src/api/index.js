import api from './axios';

// Auth Services
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);

// Note Services
export const fetchNotes = () => api.get('/notes');
export const createNote = (data) => api.post('/notes', data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);