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
                    @payment-completed="paypalComplete"
                    :items="paypal_items"
                    env="sandbox">
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
          sandbox: 'AcxHfWkfclw4WMUj35YyOrXgjUAajk6qTuNa0QbV7AQIQc34mKwmbEQBpkaFerzHznezNLaH_THXsL1m',
        },
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
    paypal_items() {
      return this.$store.getters['cart/itemsFormattedPayPal'];
    },
  },
  methods: {
    paypalComplete() {
      this.$router.push('finish');
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
