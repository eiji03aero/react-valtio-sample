import { Toast, ToastMessage } from "primereact/toast";

export class ToastService {
  private toastApi: Toast;

  constructor(params: { toastApi: Toast }) {
    this.toastApi = params.toastApi;
  }

  show(msg: ToastMessage) {
    this.toastApi.show(msg);
  }
}
