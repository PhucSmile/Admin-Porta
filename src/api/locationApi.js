import { useQuery } from 'react-query';
import axiosClient from './axiosClient';

export const locationApi = {
  getProvinces(params) {
    return axiosClient.get('/location/provinces', { params });
  },
  getDistricts(params) {
    return axiosClient.get('/location/districts', { params });
  },
  getDistrictsByProvinceId(provinceId, params) {
    return axiosClient.get(`/location/provinces/${provinceId}/districts`, {
      params,
    });
  },
};

export const useProvinces = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['location', 'provinces', params],
    queryFn: () => locationApi.getProvinces(params),
    select: (response) => response?.items || [],
    ...options,
  });
};

export const useDistricts = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['location', 'districts', params],
    queryFn: () => locationApi.getDistricts(params),
    ...options,
  });
};

export const useDistrictsByProvinceId = ({
  provinceId,
  params,
  options,
} = {}) => {
  return useQuery({
    queryKey: ['location', 'districts', provinceId, params],
    queryFn: () => locationApi.getDistrictsByProvinceId(provinceId, params),
    enabled: !!provinceId,
    select: (response) => response?.items || [],
    ...options,
  });
};
