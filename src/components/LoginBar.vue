<template>
    <div id="login-bar" v-if="loggedIn">
        <span class="login-bar--name">{{ userName }}</span>
        <ButtonGroup>
            <Tooltip content="Settings" :open-delay="200">
                <Button type="primary" @click="settings" size="mini" icon="el-icon-edit"></Button>
            </Tooltip>
            <Tooltip content="Order History" :open-delay="200">
                <Button type="warning" @click="history" size="mini" icon="el-icon-tickets"></Button>
            </Tooltip>
            <Tooltip content="Sign out" :open-delay="200">
                <Button type="danger" @click="logoutConfirm" size="mini" icon="el-icon-close"></Button>
            </Tooltip>
        </ButtonGroup>
    </div>
</template>

<script>
import { Button, ButtonGroup, Tooltip } from 'element-ui';

export default {
  name: 'LoginBar',
  props: {
    locked: false,
  },
  components: {
    Button,
    ButtonGroup,
    Tooltip,
  },
  computed: {
    userName() {
      const userData = this.$store.getters['user/data'];
      return `${userData.first_name} ${userData.last_name}`;
    },
    loggedIn() {
      return this.$store.getters['user/loggedIn'];
    },
  },
  methods: {
    submitForm(formName) {
      const method = formName === 'form' ? 'register' : 'login';
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }

        this[method]();

        return true;
      });
    },
    logoutConfirm() {
      this.$store.dispatch('modal/open', {
        message: 'Are you sure you want to sign out?',
        type: 'warning',
        showCancel: true,
        confirm: {
          callback: this.logout,
        },
      });
    },
    settings() {
      this.$store.dispatch('modal/open', {
        message: 'Sorry, but we haven\'t implemented Settings yet',
        type: 'info',
      });
    },
    history() {
      this.$store.dispatch('modal/open', {
        message: 'Sorry, but we haven\'t implemented Order History yet',
        type: 'info',
      });
    },
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>
