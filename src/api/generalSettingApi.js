import { useQuery, useMutation } from 'react-query';
import axiosClient from './axiosClient';

export const generalSettingApi = {
  getNote() {
    return axiosClient.get('/general-settings/note');
  },
  updateNote(data) {
    return axiosClient.put('/general-settings/note', data);
  },
};

export const useGeneralSettingNote = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['general-settings/note', params],
    queryFn: () => generalSettingApi.getNote(params),
    select: (response) => (response?.value ? JSON.parse(response?.value) : []),
    ...options,
  });
};

export const useUpdateGeneralSettingNote = () => {
  return useMutation(generalSettingApi.updateNote);
};
