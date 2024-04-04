import { useQuery } from 'react-query';
import axiosClient from './axiosClient';

export const reportApi = {
  getSaleRank(params) {
    return axiosClient.get('/report/sale-rank', { params });
  },
};

export const useSaleRank = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['report', 'sale-rank', params],
    queryFn: () => reportApi.getSaleRank(params),
    ...options,
  });
};
