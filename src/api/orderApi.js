import { useQuery, useMutation } from 'react-query';
import axiosClient from './axiosClient';

export const orderApi = {
  getAll(params) {
    return axiosClient.get('/orders', { params });
  },
  getById(id) {
    return axiosClient.get(`/orders/${id}`);
  },
  create(data) {
    return axiosClient.post('/orders', data);
  },
  updateStatus(id, data) {
    return axiosClient.patch(`/orders/${id}/status`, data);
  },
  updatePaymentStatus(data) {
    return axiosClient.patch(`/orders/${data.order_id}/payment_status`, data);
  },
  // updatePhone(id, data) {
  //   return axiosClient.patch(`/orders/${id}/phone`, data);
  // },
  updateOrderAddress(id, data) {
    return axiosClient.patch(`/orders/address/${id}`, data);
  },
  updateOrderItem(id, data) {
    return axiosClient.put(`/orders/${id}`, data);
  },

  import(data) {
    return axiosClient.post('/orders/import', data, {
      timeout: 0,
    });
  },
  downloadCsvTemplate() {
    return axiosClient.get('/orders/csv-template', {
      responseType: 'blob',
    });
  },
  getDetail(params) {
    return axiosClient.get('/orders/detail', { params });
  },
  exportExcel(params) {
    return axiosClient.get('/orders/excel-export', {
      params,
      responseType: 'blob',
    });
  },
  updateNoteAdmin(data) {
    return axiosClient.patch(`/orders/${data.order_id}/note_admin`, data);
  },
};

export const useOrders = ({ params, options } = {}) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderApi.getAll(params),
    ...options,
  });
};

export const useOrder = ({ id, options } = {}) => {
  return useQuery({
    queryKey: ['orders', 'detail', id],
    queryFn: () => orderApi.getById(id),
    ...options,
  });
};

export const useCreateOrder = () => {
  return useMutation(orderApi.create);
};

export const useImportOrder = () => {
  return useMutation(orderApi.import);
};

export const useDownloadCsvTemplate = () => {
  return useMutation(orderApi.downloadCsvTemplate);
};

export const useGetOrderDetail = ({ params, options }) => {
  return useQuery({
    queryKey: ['orders', 'detailByCode', params],
    queryFn: () => orderApi.getDetail(params),
    ...options,
  });
};

export const useExportExcel = ({ page, limit, ...restParams }) => {
  return useMutation(() => orderApi.exportExcel(restParams));
};

export const useUpdateOrder = (id) => {
  return useMutation((data) => {
    // TODO: Check call API
    return Promise.all([
      orderApi.updateStatus(id, { status: data.status }),
      // orderApi.updatePhone(id, { phone: data.phone }),
      orderApi.updateOrderAddress(id, data),
      orderApi.updateOrderItem(id, data.items),
    ]);
  });
};

export const useUpdateOrderPayment = () => {
  // return useMutation((data) => {
  //   return Promise.all([
  //     orderApi.updatePaymentStatus(data.order_id, { status: data.status }),
  //   ]);
  // });

  return useMutation(orderApi.updatePaymentStatus);
};

export const useUpdateNoteAdmin = () => {
  return useMutation(orderApi.updateNoteAdmin);
};
