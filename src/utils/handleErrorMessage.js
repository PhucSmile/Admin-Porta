const handleErrorMessage = (error) => {
  const { status } = error;
  const { errors = {}, message, message_code, code } = error?.data || error;
  let newCode = code || message_code;
  let newMessage = message;

  if (message && message.includes('Cannot read property')) {
    newCode = 'UNDEFINED';
  }

  if (message && message.includes('Network Error')) {
    newCode = 'NETWORK_ERROR';
  }

  if (newCode === 'ECONNABORTED') {
    newCode = 'ECONNABORTED';
    newMessage = 'Timeout error';
  }

  if (status === 404 && !newCode) {
    newCode = 'NOT_FOUND';
    newMessage = newMessage || 'Not Found';
  }

  if (status === 500) {
    newCode = 'INTERNAL_SERVER_ERROR';
    newMessage = 'Internal Server Error';
  }

  if (status === 422) {
    return {
      ...(error?.data ?? {}),
      status,
    };
  }

  return {
    errors,
    message: newMessage,
    code: newCode,
  };
};

export default handleErrorMessage;
