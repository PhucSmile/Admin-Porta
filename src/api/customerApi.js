import { useQuery, useMutation } from 'react-query';
import axiosClient from './axiosClient';

export const customerApi = {
  getAll(params) {
    return axiosClient.get('/customers', { params });
  },
  create(data) {
    return axiosClient.post('/customers', data);
  },
  createPublic(data) {
    return axiosClient.post('/customers/public', data);
  },
  getUser(phone) {
    return axiosClient.get(`/customers/phone/${phone}`);
  },
  update({ id, ...data }) {
    return axiosClient.put(`/customers/${id}`, data);
  },
  updatePublic({ id, ...data }) {
    return axiosClient.put(`/customers/public/${id}`, data);
  },
  import(data) {
    return axiosClient.post('/customers/import', data, {
      timeout: 0,
    });
  },
};

export const useCustomers = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getAll(params),
    ...options,
  });
};

export const useCreateCustomer = () => {
  return useMutation(customerApi.create);
};
export const useCreatePublicCustomer = () => {
  return useMutation(customerApi.createPublic);
};
export const useGetCustomers = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['phoneCustomers', params],
    queryFn: () => customerApi.getUser(params),
    ...options,
  });
};

export const useUpdateCustomer = () => {
  return useMutation(customerApi.update);
};
export const useUpdatePublicCustomer = () => {
  return useMutation(customerApi.updatePublic);
};

export const useImportCustomer = () => {
  return useMutation(customerApi.import);
};
