import { useQuery, useMutation } from 'react-query';
import axiosClient from './axiosClient';

export const bankSettingApi = {
  getAll(params) {
    return axiosClient.get('/bank-settings', { params });
  },
  create(data) {
    return axiosClient.post('/bank-settings', data);
  },
  update({ id, ...data }) {
    return axiosClient.put(`/bank-settings/${id}`, data);
  },
  delete(id) {
    return axiosClient.delete(`/bank-settings/${id}`);
  },
};

export const useBankSettings = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['bank-settings', params],
    queryFn: () => bankSettingApi.getAll(params),
    select: (response) => response?.items ?? [],
    ...options,
  });
};

export const useCreateBankSetting = () => {
  return useMutation(bankSettingApi.create);
};

export const useUpdateBankSetting = () => {
  return useMutation(bankSettingApi.update);
};

export const useDeleteBankSetting = () => {
  return useMutation(bankSettingApi.delete);
};
