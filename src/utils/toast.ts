import toast from 'react-hot-toast';

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: 'rgba(10, 10, 10, 0.95)',
      color: '#A855F7',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
    },
    iconTheme: {
      primary: '#A855F7',
      secondary: '#000000',
    },
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: 'rgba(10, 10, 10, 0.95)',
      color: '#F0ABFC',
      border: '1px solid rgba(240, 171, 252, 0.3)',
      boxShadow: '0 4px 20px rgba(240, 171, 252, 0.4)',
    },
    iconTheme: {
      primary: '#F0ABFC',
      secondary: '#000000',
    },
  });
};

export const showWarning = (message: string) => {
  toast(message, {
    duration: 3500,
    position: 'top-right',
    icon: '⚠️',
    style: {
      background: 'rgba(10, 10, 10, 0.95)',
      color: '#E879F9',
      border: '1px solid rgba(232, 121, 249, 0.3)',
      boxShadow: '0 4px 20px rgba(232, 121, 249, 0.4)',
    },
  });
};

export const showInfo = (message: string) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: 'ℹ️',
    style: {
      background: 'rgba(10, 10, 10, 0.95)',
      color: '#C084FC',
      border: '1px solid rgba(192, 132, 252, 0.3)',
      boxShadow: '0 4px 20px rgba(192, 132, 252, 0.4)',
    },
  });
};

export const showLoading = (message: string) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: 'rgba(10, 10, 10, 0.95)',
      color: '#C084FC',
      border: '1px solid rgba(192, 132, 252, 0.3)',
    },
  });
};
