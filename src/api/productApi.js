import { useQuery, useMutation } from 'react-query';
import axiosClient from './axiosClient';

export const productApi = {
  getAll(params) {
    return axiosClient.get('/products', { params });
  },
  getById(id) {
    return axiosClient.get(`/products/${id}`);
  },
  create(data) {
    return axiosClient.post('/products', data);
  },
  update({ id, ...data }) {
    return axiosClient.put(`/products/${id}`, data);
  },
  delete(id) {
    return axiosClient.delete(`/products/${id}`);
  },
};

export const useProducts = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getAll(params),
    ...options,
  });
};

export const useCreateProduct = () => {
  return useMutation(productApi.create);
};

export const useUpdateProduct = () => {
  return useMutation(productApi.update);
};

export const useDeleteProduct = () => {
  return useMutation(productApi.delete);
};
