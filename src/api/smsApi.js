import { useQuery, useMutation } from 'react-query';
import axiosClient from './axiosClient';

export const smsApi = {
  getAllLogs(params) {
    return axiosClient.get('/sms/logs', { params });
  },
  send(data) {
    return axiosClient.post('/sms/send', data);
  },
};

export const useUsers = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['sms-logs', params],
    queryFn: () => smsApi.getAllLogs(params),
    ...options,
  });
};

export const useSendSMS = () => {
  return useMutation(smsApi.send);
};
