<template>
    <ContentGridSimple :active="3">
        <template slot="content">
            <p>You have successfully created an order! Now you can pay using your preferred payment method.</p>
            <Cart cartType="simple" :locked="true"/>
        </template>
        <template slot="buttons">
            <router-link :to="{name: 'confirm_order'}">
                <Button class="back-confirm" type="primary">Back</Button>
            </router-link>

            <PayPal
                    :amount="totalAmount"
                    currency="USD"
                    :client="paypal.credentials"
                    :button-style="paypal.style"
                    @payment-authorized="paypalAuthorized"
                    @payment-canceled="paypalCancelled"
                    @payment-completed="paypalComplete"
                    :items="paypalItems"
                    :notify-url="notifyUrl"
                    :invoice-number="orderInvoice"
                    :env="paypal.environment">
            </PayPal>
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
  name: 'PaymentPage',
  components: {
    AccountDetails, Button, Cart, ContentGridSimple, PayPal,
  },
  data() {
    return {
      paypal: {
        credentials: {
          sandbox: process.env.VUE_APP_SANDBOX_CLIENT_ID,
          production: process.env.VUE_APP_PRODUCTION_CLIENT_ID,
        },
        environment: process.env.VUE_APP_PAYPAL_ENVIRONMENT,
        style: {
          label: 'checkout',
          size: 'medium',
          shape: 'rect',
          color: 'blue',
        },
      },
    };
  },
  computed: {
    totalAmount() {
      return this.$store.getters['cart/total'];
    },
    paypalItems() {
      return this.$store.getters['cart/itemsFormattedPayPal'];
    },
    notifyUrl() {
      return process.env.VUE_APP_WEBHOOK_URL_PAYPAL;
    },
    orderInvoice() {
      return this.$store.getters['cart/orderInvoice'];
    },
  },
  methods: {
    paypalComplete(response) {
      console.log('payment complete!');
      console.log(response);
      this.$store.dispatch('modal/open', {
        message: `Your payment for the order #${this.$store.getters['cart/orderInvoice']} was successful!`,
        type: 'success',
        confirm: {
          callback: () => {
            this.$router.push('finish');
            this.$store.dispatch('cart/reset');
          },
        },
      });
    },
    paypalAuthorized(response) {
      console.log('payment authorized!');
      console.log(response);
      this.$store.dispatch('user/finishOrder');
    },
    paypalCancelled(response) {
      console.log('payment canceled!');
      console.log(response);
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
