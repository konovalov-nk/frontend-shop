<template>
    <div>
        <h4>Payment</h4>

        <p>
            Please select the preferred payment method to use on this order.
        </p>

        <el-row :gutter="20">
            <el-col>
                <Radio v-model="payment" label="1" border>PayPal</Radio>
                <Tooltip content="We are not supporting credit cards at the moment, but will be soon">
                    <Radio v-model="payment" label="2" border disabled>Credit Card</Radio>
                </Tooltip>
            </el-col>
        </el-row>

        <Form ref="account_details"
              :model="account_details"
              label-position="left"
              :rules="rules"
              status-icon
              labwidth="120px">
            <template v-if="needsAccountDetails">
                <h4>Account</h4>

                <p>
                    Please provide Epic Games E-Mail, password and your in-game character name for your booster.
                </p>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <FormItem label="E-Mail" auto-complete="off" prop="account_name">
                            <el-input v-model="account_details.account_name"
                                      @input="set_account_name" placeholder="Account Name"/>
                        </FormItem>

                        <FormItem label="Character Name" auto-complete="off" prop="character_name">
                            <el-input v-model="account_details.character_name"
                                      @input="set_character_name" placeholder="Your Character Name"/>
                        </FormItem>
                    </el-col>

                    <el-col :span="12">
                        <FormItem label="Password" auto-complete="off" prop="account_password">
                            <el-input type="password" v-model="account_details.account_password"
                                      @input="set_account_password" placeholder="Password"/>
                        </FormItem>
                    </el-col>
                </el-row>
            </template>

            <h4>Contacts</h4>

            <p>
                Once you pay how would you like to be contacted by our company to assign the booster?
            </p>
            <el-row :gutter="20">
                <el-col>
                    <FormItem>
                        <el-checkbox-group v-model="preferred_communication" size="small">
                            <el-checkbox size="small" label="Discord" border/>
                            <el-checkbox size="small" label="E-Mail" border/>
                            <el-checkbox size="small" label="Skype" border/>
                        </el-checkbox-group>
                    </FormItem>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <FormItem v-if="includes('Discord')" label="Discord">
                        <el-input v-model="discord" size="small" placeholder="Discord account name" />
                    </FormItem>
                    <FormItem v-if="includes('E-Mail')" label="E-Mail">
                        <el-input v-model="contact_email" size="small" :placeholder="contactEmail" />
                    </FormItem>
                    <FormItem v-if="includes('Skype')" label="Skype">
                        <el-input v-model="skype" size="small" placeholder="Skype account name" />
                    </FormItem>
                </el-col>
            </el-row>
        </Form>
    </div>
</template>

<script>
import { Radio, Row, Col, Checkbox, CheckboxGroup, Form, FormItem, Input, Tooltip } from 'element-ui'

export default {
  name: 'Payment',
  components: {
    'el-col': Col,
    'el-row': Row,
    'el-checkbox': Checkbox,
    'el-checkbox-group': CheckboxGroup,
    'el-input': Input,
    Form,
    FormItem,
    Radio,
    Tooltip,
  },
  data() {
    return {
      payment: '1',
      account_details: {
        account_name: '',
        account_password: '',
        character_name: '',
      },
      rules: {
        account_name: [
          {
            type: 'email', whitespace: true, required: true, message: 'Epic Games Email is required', trigger: 'blur',
          },
        ],
        account_password: [
          {
            type: 'string', whitespace: true, required: true, message: 'Password is required', trigger: 'blur',
          },
        ],
        character_name: [
          {
            type: 'string', whitespace: true, required: true, message: 'In-game character name is required', trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    preferred_communication: {
      get() {
        return this.$store.getters['cart/preferred_communication']
      },

      set(items) {
        return this.$store.dispatch('cart/set_preferred_communication', items)
      },
    },
    discord: {
      get() {
        return this.$store.getters['cart/discord']
      },

      set(items) {
        return this.$store.dispatch('cart/set_discord', items)
      },
    },
    skype: {
      get() {
        return this.$store.getters['cart/skype']
      },

      set(items) {
        return this.$store.dispatch('cart/set_skype', items)
      },
    },
    contact_email: {
      get() {
        return this.$store.getters['cart/contact_email']
      },

      set(items) {
        return this.$store.dispatch('cart/set_contact_email', items)
      },
    },
    account_name: {
      get() {
        return this.$store.getters['cart/account_name']
      },

      set(items) {
        return this.$store.dispatch('cart/set_account_name', items)
      },
    },
    account_password: {
      get() {
        return this.$store.getters['cart/account_password']
      },

      set(items) {
        return this.$store.dispatch('cart/set_account_password', items)
      },
    },
    contactEmail() {
      return `E-Mail: ${this.$store.getters['user/data'].email}`
    },
    needsAccountDetails() {
      return this.$store.getters['cart/needsAccountDetails']
    },
  },
  methods: {
    set_account_name(name) {
      this.$store.dispatch('cart/set_account_name', name)
    },
    set_account_password(password) {
      this.$store.dispatch('cart/set_account_password', password)
    },
    set_character_name(character_name) {
      this.$store.dispatch('cart/set_character_name', character_name)
    },
    includes(type) {
      return this.preferred_communication.includes(type)
    },
  },
  mounted() {
    this.account_details.account_name = this.$store.getters['cart/account_name']
    this.account_details.account_password = this.$store.getters['cart/account_name']
    this.account_details.character_name = this.$store.getters['cart/character_name']
  },
}
</script>

<style lang="less">
    hr {
        border-top: 1pt solid #d8dbe2;
        border-bottom: none;
        border-left: none;
        border-right: none;
    }
</style>
