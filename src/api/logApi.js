import { useQuery } from 'react-query';
import axiosClient from './axiosClient';

export const logApi = {
  getAll(params) {
    return axiosClient.get('/logs', { params });
  },
};

export const useLogs = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['logs', params],
    queryFn: () => logApi.getAll(params),
    ...options,
  });
};
