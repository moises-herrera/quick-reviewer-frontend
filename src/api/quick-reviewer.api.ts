import axios from 'axios';
import { VITE_API_URL } from '../constants/app-constants';

export const quickReviewerApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
