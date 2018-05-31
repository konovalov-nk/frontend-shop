<template>
    <div id="account_details">
        <template v-if="!loggedIn || locked">
            <h4 class="component-header">
                Account Details
                <template v-if="false">
                    <a @click="toggleDetails" v-if="!loggedIn">
                        (click to {{ pageType('register') ? 'sign-in' : 'sign-up' }})
                    </a>
                </template>
            </h4>
            <template v-if="pageType('register')">
                <Form ref="form"
                      :model="form"
                      :label-position="form_label_position"
                      :rules="rules"
                      :disabled="locked"
                      status-icon
                      labwidth="120px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <FormItem prop="first_name" label="First Name">
                                <el-input v-model="form.first_name" />
                            </FormItem>

                            <FormItem prop="email" label="E-Mail">
                                <el-input v-model="form.email" />
                            </FormItem>

                            <FormItem prop="post_code" label="Post Code">
                                <el-input v-model="form.post_code" />
                            </FormItem>
                        </el-col>

                        <el-col :span="12">
                            <FormItem prop="last_name" label="Last Name">
                                <el-input v-model="form.last_name" />
                            </FormItem>

                            <FormItem prop="city" label="City">
                                <el-input v-model="form.city" />
                            </FormItem>

                            <FormItem prop="country" label="Country">
                                <Select filterable v-model="form.country" placeholder="Please select your country">
                                    <Option :label="country.name"
                                            :value="country.ioc"
                                            :key="country.ioc"
                                            v-for="country in countries">
                                    </Option>
                                </Select>
                            </FormItem>
                        </el-col>
                    </el-row>

                    <template v-if="!locked">
                        <hr />

                        <el-row :gutter="20">
                            <el-col :span="12">
                                <FormItem auto-complete="off" prop="password" label="Password">
                                    <el-input type="password" v-model="form.password" />
                                </FormItem>
                            </el-col>

                            <el-col :span="12">
                                <FormItem auto-complete="off" prop="password_confirmation" label="Password Confirm">
                                    <el-input type="password" v-model="form.password_confirmation" />
                                </FormItem>
                            </el-col>
                        </el-row>

                        <FormItem>
                            <Button type="primary" @click="submitForm('form')">Create</Button>
                            <Button @click="resetForm('form')">Reset</Button>
                        </FormItem>
                    </template>
                </Form>
            </template>

            <template v-if="false">
                <Form ref="formLogin"
                      class="form-login"
                      :inline="true"
                      :model="formLogin"
                      :rules="rulesLogin"
                      status-icon
                      labwidth="120px">
                    <FormItem prop="email" class="form-login-email">
                        <el-input v-model="formLogin.email" placeholder="E-Mail" />
                    </FormItem>

                    <FormItem auto-complete="off" prop="password" class="form-login-password">
                        <el-input type="password" v-model="formLogin.password" placeholder="Password" />
                    </FormItem>

                    <FormItem class="form-login-signin">
                        <Button type="primary" @click="submitForm('formLogin')">Sign In</Button>
                    </FormItem>
                </Form>
            </template>
        </template>
    </div>
</template>

<script>
import { Button, Form, FormItem, Col, Input, Table, TableColumn, Row, Select, Option } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import countryData from 'country-data';

locale.use(lang);

export default {
  name: 'AccountDetails',
  props: {
    locked: false,
  },
  components: {
    'el-col': Col,
    'el-input': Input,
    'el-row': Row,
    Button,
    Form,
    FormItem,
    Table,
    TableColumn,
    Row,
    Select,
    Option,
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      console.log('validatePassword');
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };

    const validatePasswordConfirmation = (rule, value, callback) => {
      console.log('validateConfirm');
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };

    const isLocked = this.locked;

    return {
      loading: null,
      loadingLogin: null,
      page_type: 'register',
      form_label_position: 'top',
      form: {
        first_name: '',
        last_name: '',
        email: '',
        city: '',
        post_code: '',
        country: 'USA',
        password: '',
        password_confirmation: '',
      },
      formLogin: {
        email: '',
        password: '',
      },
      rules: {
        first_name: [
          {
            type: 'string', whitespace: true, required: !isLocked, message: 'First Name is required', trigger: 'blur',
          },
        ],
        last_name: [
          {
            type: 'string', whitespace: true, required: !isLocked, message: 'Last Name is required', trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email', required: !isLocked, message: 'E-Mail is required', trigger: 'blur',
          },
        ],
        city: [
          {
            type: 'string', whitespace: true, required: !isLocked, message: 'City is required', trigger: 'blur',
          },
        ],
        post_code: [
          {
            type: 'string', whitespace: true, required: !isLocked, message: 'Post Code is required', trigger: 'blur',
          },
        ],
        country: [
          {
            type: 'string', whitespace: true, required: !isLocked, message: 'Country is required', trigger: 'blur',
          },
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
          { min: 6, trigger: 'blur', message: 'Password must be at least 6 characters' },
        ],
        password_confirmation: [
          { validator: validatePasswordConfirmation, trigger: 'blur' },
          { min: 6, trigger: 'blur', message: 'Password must be at least 6 characters' },
        ],
      },
      rulesLogin: {
        email: [
          {
            type: 'email', required: true, message: 'E-Mail is required', trigger: 'blur',
          },
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
      countries: [],
    };
  },
  computed: {
    userData() {
      return this.$store.getters['user/data'];
    },
    loggedIn() {
      return this.$store.getters['user/loggedIn'];
    },
  },
  methods: {
    pageType(type) {
      return this.page_type === type;
    },
    toggleDetails() {
      this.page_type = this.page_type === 'register' ? 'login' : 'register';
    },
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
    register() {
      this.showLoading('form');
      this.$store.dispatch('user/register', this.form).then(() => {
        this.closeLoading('form');
      }).catch((e) => {
        console.log('error');
        console.log(e);
      });
    },
    login() {
      this.showLoading('formLogin');
      const user = {
        email: this.formLogin.email,
        password: this.formLogin.password,
        password_confirmation: this.formLogin.password,
      };

      this.$store.dispatch('user/login', user).then((v) => {
        console.log(v);
        this.closeLoading('formLogin');
      }).catch((e) => {
        console.log('error');
        console.log(e);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showLoading(formName) {
      const loading = formName === 'form' ? 'loading' : 'loadingLogin';
      const signType = formName === 'form' ? 'up' : 'in';

      this[loading] = this.$loading({
        target: this.$refs[formName].$el,
        text: `Trying to sign-${signType}...`,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)',
      });
    },
    closeLoading(formName) {
      const loading = formName === 'form' ? 'loading' : 'loadingLogin';
      this[loading].close();
    },

  },
  mounted() {
    const countriesUnique = Object.values(countryData.countries.all.reduce((acc, cur) => Object.assign(acc, { [cur.ioc]: cur }), {}));
    this.countries = countriesUnique
      .map((c, i) => ({
        id: i,
        name: c.name,
        ioc: c.ioc,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (this.userData) {
      this.form = this.userData;
    }
  },
};
</script>

<style lang="less">
    .form-login {
        padding-top: 25px;
        padding-left: 20px;

        .el-form-item.form-login-email.el-form-item--feedback {
            width: 45%;
        }

        .el-form-item.form-login-password.el-form-item--feedback {
            width: 35%;
        }

        .el-form-item__content {
            width: 100%;
        }
    }
</style>
