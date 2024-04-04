import { useEffect, useRef } from 'react';

export const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();

  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);

  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};
