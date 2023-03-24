import { toast } from 'react-toastify';

class Utils {
  showSuccessToast(message) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }

  showWarningToast(message) {
    toast.warning(message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }

  showErrorToast(message) {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }

  refreshPage() {
    window.location.reload(false);
  }
}

export default new Utils();