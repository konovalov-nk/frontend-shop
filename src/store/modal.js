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
        showCancelButton: false,
        center: true,
        type: options.type || 'warning',
      }).then(() => {
        // Modals.message({
        //   type: 'success',
        //   message: 'Delete completed',
        // });
      }).catch(() => {
        // Modals.message({
        //   type: 'info',
        //   message: 'Delete canceled',
        // });
      });
    },
  },
};

export default storeModal;
