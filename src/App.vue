<template>
    <div id="app">
        <div id="nav" style="display: none;">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="less">
    @import 'assets/main.css';
    @import 'assets/elementui.css';
</style>

<script>
const windowAlert = window.alert;
if (typeof paypal === 'undefined') {
  windowAlert('PayPal Checkout is missing!');
}

// eslint-disable-next-line no-undef
paypal.Button.render({
  env: 'sandbox', // Or 'production',

  client: {
    sandbox: 'AeQSSnIFZBu8lPWFLG51pK8i9I_Cc7EIafLHbRFSFLw3IjRm7nC-G-XWD0I_4q0mov7NC16q4faP38cE',
    production: 'ASwbho1loyUYSlmEnyZ59hsR3zw7s73sjDMpAsQaKrwXqWFL4OleEb8e9wwnOq-T89P7yCMSa2tTZB9v',
  },

  commit: true, // Show a 'Pay Now' button

  style: {
    color: 'gold',
    shape: 'rect',
    size: 'medium',
    label: 'checkout',
    // label: 'pay',
    tagline: false,
  },

  payment(data, actions) {
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: { total: this.$store.getters.total, currency: 'USD' },
          },
        ],
      },
    });
  },

  onAuthorize(data, actions) {
    return actions.payment.execute().then(() => {
      windowAlert('Payment Complete! Directing you to a representative.');
      window.location = 'skype:elojobbing?chat';
    });
  },

  onError() {
    windowAlert('An error occurred!');
  },
}, '#paypal-button');
</script>
