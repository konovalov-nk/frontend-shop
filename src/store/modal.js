/* eslint-disable no-param-reassign,no-unused-vars */
import { Message, MessageBox } from 'element-ui';

const Modals = {
  msgbox: MessageBox,
  alert: MessageBox.alert,
  confirm: MessageBox.confirm,
  prompt: MessageBox.prompt,
  message: Message,
};

const storeModal = {
  namespaced: true,

  actions: {
    open({ commit }, options) {
      Modals.confirm(options.message || 'No message', {
        confirmButtonText: 'OK',
        showCancelButton: options.showCancel || false,
        center: true,
        type: options.type || 'warning',
      }).then(() => {
        if (options.confirm) {
          const { confirm } = options;
          const { callback = () => {}, message, type = 'success' } = confirm;
          callback();
          if (message) {
            Modals.message({ type, message });
          }
        }
      }).catch(() => {
        if (options.cancel) {
          const { cancel } = options;
          const { callback = () => {}, message, type = 'info' } = cancel;
          callback();
          if (message) {
            Modals.message({ type, message });
          }
        }
      });
    },
  },
};

export default storeModal;
