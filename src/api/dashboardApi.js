import { useQuery } from 'react-query';
import axiosClient from './axiosClient';

export const dashboardApi = {
  getBestSeller(params) {
    return axiosClient.get('/dashboard/best-seller', { params });
  },
  getRevenue(params) {
    return axiosClient.get('/dashboard/revenue', { params });
  },
};

export const useBestSeller = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['dashboard', 'best-seller', params],
    queryFn: () => dashboardApi.getBestSeller(params),
    ...options,
  });
};

export const useRevenue = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['dashboard', 'revenue', params],
    queryFn: () => dashboardApi.getRevenue(params),
    ...options,
  });
};
