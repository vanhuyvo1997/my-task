import { Bounce, toast, ToastOptions } from "react-toastify";

const toastifyConfig: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
}

export function showNotification(type: "success" | 'info' | 'warning' | 'error', message: React.ReactNode) {
    switch (type) {
        case 'success': {
            toast.success(message, toastifyConfig); break;
        }
        case 'info': {
            toast.info(message, toastifyConfig); break;
        }
        case 'warning': {
            toast.warning(message, toastifyConfig); break;
        }
        case 'error': {
            toast.error(message, toastifyConfig); break;
        }
    }
}