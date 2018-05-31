<template>
    <div id="login-bar">
        <template v-if="loggedIn">
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
        </template>

        <template v-else>
            <Button type="primary" @click="forgot" size="small">Forgot</Button>
            <Button type="primary" @click="login" size="small">Sign-in</Button>
            <el-input class="login-bar--input" v-model="email" size="small" placeholder="E-Mail" />
            <el-input class="login-bar--input" type="password" v-model="password" size="small" placeholder="Password"/>
        </template>
    </div>
</template>

<script>
import { Button, ButtonGroup, Input, Row, Col, Tooltip } from 'element-ui';

export default {
  name: 'LoginBar',
  props: {
    locked: false,
  },
  data: () => ({
    email: '',
    password: '',
    loading: false,
  }),
  components: {
    'el-row': Row,
    'el-col': Col,
    'el-input': Input,
    Button,
    ButtonGroup,
    Input,
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

    login() {
      this.loading = this.$loading({
        text: 'Trying to sign-in...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)',
        fullscreen: true,
      });
      const user = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password,
      };

      this.$store.dispatch('user/login', user).then((v) => {
        console.log(v);
        this.loading.close();
        this.loading = false;
      }).catch((e) => {
        console.log('error');
        console.log(e);
        this.loading.close();
        this.loading = false;
      });
    },

    forgot() {
      this.$store.dispatch('modal/open', {
        message: 'Sorry, but we haven\'t implemented Forgot Password yet',
        type: 'info',
      });
    },

  },
};
</script>
