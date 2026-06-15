import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const getColleges = (params) => api.get('/colleges', { params });
export const getCollege = (id) => api.get(`/colleges/${id}`);
export const searchColleges = (params) => api.get('/colleges/search', { params });
export const compareColleges = (programIds) => api.post('/colleges/compare', { program_ids: programIds });
export const getRecommendations = (data) => api.post('/recommend', data);
export const getLocations = () => api.get('/locations');
export const getBranches = () => api.get('/branches');
export const registerStudent = (data) => api.post('/students', data);
export const getStudent = (id) => api.get(`/students/${id}`);
export const getFavorites = (studentId) => api.get(`/favorites/${studentId}`);
export const addFavorite = (studentId, programId) => api.post('/favorites', { student_id: studentId, program_id: programId });
export const removeFavorite = (studentId, programId) => api.delete('/favorites', { data: { student_id: studentId, program_id: programId } });
export const healthCheck = () => api.get('/health');

export default api;
