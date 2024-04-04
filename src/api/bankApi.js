import { useQuery } from 'react-query';
import axiosClient from './axiosClient';

export const bankApi = {
  getAll(params) {
    return axiosClient.get('/banks', { params });
  },
};

export const useBanks = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['banks', params],
    queryFn: () => bankApi.getAll(params),
    select: (response) => response?.items ?? [],
    ...options,
  });
};
