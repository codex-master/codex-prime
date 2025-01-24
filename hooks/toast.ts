import { Toast } from 'primereact/toast';

let toastInstance: Toast | null = null;

export const setToastInstance = (toast: Toast | null) => {
  toastInstance = toast;
};

export const showToast = (severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string, life: number = 1000) => {
  if (toastInstance) {
    toastInstance.show({ severity, summary, detail, life });
  }
};
