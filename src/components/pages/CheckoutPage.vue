<template>
    <ContentGridSimple :active="1">
        <template slot="content">
            <el-row :gutter="20">
                <el-col :span="16">
                    <AccountDetails />
                    <Cart cartType="simple"/>
                </el-col>
                <el-col :span="8">
                    <Payment />
                </el-col>
            </el-row>
        </template>
        <template slot="buttons">
            <router-link :to="{name: 'index'}">
                <Button type="warning">Back</Button>
            </router-link>
            <Button @click="confirmOrder" :disabled="confirmDisabled" type="primary">
                Confirm Order
            </Button>
        </template>
    </ContentGridSimple>
</template>

<script>
import ContentGridSimple from '@/components/layouts/ContentGridSimple.vue';
import AccountDetails from '@/components/AccountDetails.vue';
import Cart from '@/components/Cart.vue';
import Payment from '@/components/Payment.vue';
import { Button, Col, Row } from 'element-ui';

export default {
  name: 'CheckoutPage',
  components: {
    'el-row': Row,
    'el-col': Col,
    AccountDetails,
    Button,
    Cart,
    ContentGridSimple,
    Payment,
  },
  methods: {
    confirmOrder() {
      if (this.$store.getters['cart/items'].length !== 0) {
        this.$router.push('confirm');
      }
    },
  },
  computed: {
    confirmDisabled() {
      if (this.$store.getters['cart/items'].length === 0) return false;

      return !this.$store.getters['user/loggedIn'];
    },
  },
};
</script>
