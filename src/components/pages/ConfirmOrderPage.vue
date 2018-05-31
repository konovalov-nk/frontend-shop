<template>
    <ContentGridSimple :active="2">
        <template slot="content">
            <AccountDetails :locked="true" />
            <Cart cartType="simple" :locked="true"/>
        </template>
        <template slot="buttons">
            <router-link :to="{name: 'checkout'}">
                <Button class="back-confirm" type="primary">Back</Button>
            </router-link>
            <Button @click="payment" :disabled="paymentDisabled()" type="primary">
                Payout
            </Button>
        </template>
    </ContentGridSimple>
</template>

<script>
import ContentGridSimple from '@/components/layouts/ContentGridSimple.vue';
import AccountDetails from '@/components/AccountDetails.vue';
import Cart from '@/components/Cart.vue';
import { Button } from 'element-ui';
import PayPal from 'vue-paypal-checkout';

export default {
  name: 'ConfirmOrderPage',
  components: {
    AccountDetails, Button, Cart, ContentGridSimple, PayPal,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    payment() {
      if (this.$store.getters['cart/items'].length !== 0) {
        const type = this.$store.getters['cart/orderId'] === 0 ? 'Creating' : 'Updating';
        this.loading = this.$loading({
          text: `${type} an order for you...`,
          spinner: 'el-icon-loading',
          fullscreen: true,
          background: 'rgba(0, 0, 0, 0.6)',
        });

        const dispatchType = type === 'Creating' ? 'create' : 'update';
        this.$store.dispatch(`user/${dispatchType}Order`).then(() => {
          this.loading.close();
          this.$router.push('payment');
        }).catch(() => {
          this.loading.close();
        });
      }
    },
    paymentDisabled() {
      if (this.$store.getters['cart/items'].length === 0) return false;

      return !this.$store.getters['user/loggedIn'];
    },
  },
};
</script>

<style lang="less">
    .back-confirm {
        zoom: 0.89;
        margin-right: 5pt;
    }
    .paypal-button {
        float: right;
    }
</style>
