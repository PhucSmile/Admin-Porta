import axiosClient from './axiosClient';

export const authApi = {
  login(data) {
    return axiosClient.post('/auth/login', data);
  },
  verifyToken(data) {
    return axiosClient.post('/auth/verify-token/', data);
  },
};

export default authApi;
