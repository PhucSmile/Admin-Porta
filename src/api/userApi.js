import { useQuery, useMutation } from 'react-query';
import axiosClient from './axiosClient';

export const userApi = {
  getAll(params) {
    return axiosClient.get('/users', { params });
  },
  getById(id) {
    return axiosClient.get(`/users/${id}`);
  },
  create(data) {
    return axiosClient.post('/users', data);
  },
  delete(id) {
    return axiosClient.delete(`/users/${id}`);
  },
  updatePassword(data) {
    return axiosClient.patch('/users/password', data);
  },
  updateRole(data) {
    return axiosClient.patch('/users/role', data);
  },
};

export const useUsers = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getAll(params),
    ...options,
  });
};

export const useCreateUser = () => {
  return useMutation(userApi.create);
};

export const useDeleteUser = () => {
  return useMutation(userApi.delete);
};

export const useUpdatePassword = () => {
  return useMutation(userApi.updatePassword);
};

export const useUpdateRole = () => {
  return useMutation(userApi.updateRole);
};

export const useUpdateUser = () => {
  return useMutation(({ password, userId }) =>
    userApi.updatePassword({ password, userId }),
  );
};
