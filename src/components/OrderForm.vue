<template>
    <div id="order-form">
        <fieldset id="mode-field">
            <legend>Competitive Mode</legend>
            <div class="form-radio">
                <label for="mode-solo">
                    <input type="radio" @change="updateTotal" v-model="mode" value="solo" id="mode-solo" checked>
                    <label for="mode-solo" class="custom-checkbox"></label>Solo
                </label>
            </div>

            <div class="form-radio">
                <label for="mode-duo">
                    <input type="radio" @change="updateTotal" v-model="mode" value="duo" id="mode-duo">
                    <label for="mode-duo" class="custom-checkbox"></label>Duo
                </label>
            </div>

            <div class="form-radio">
                <label for="mode-squad">
                    <input type="radio" @change="updateTotal" v-model="mode" value="squad" id="mode-squad">
                    <label for="mode-squad" class="custom-checkbox"></label>Squad
                </label>
            </div>
        </fieldset>

        <fieldset id="platform-field">
            <legend>Platform</legend>
            <div class="form-radio">
                <label for="platform-pc">
                    <input type="radio" @change="updateTotal" v-model="platform" value="pc" id="platform-pc" checked>
                    <label for="platform-pc" class="custom-checkbox"></label>PC
                </label>
            </div>

            <div class="form-radio">
                <label for="platform-ps4">
                    <input type="radio" @change="updateTotal" v-model="platform" value="ps4" id="platform-ps4">
                    <label for="platform-ps4" class="custom-checkbox"></label>PS4
                </label>
            </div>

            <div class="form-radio">
                <label for="platform-xbox">
                    <input type="radio" @change="updateTotal" v-model="platform" value="xbox" id="platform-xbox">
                    <label for="platform-xbox" class="custom-checkbox"></label>Xbox
                </label>
            </div>
        </fieldset>

        <fieldset id="amount-field">
            <legend>Wins</legend>
            <el-slider @change="updateTotal" :min="1" v-model="amount"/>
            <div id="amount-value">{{ amount }} wins</div>
        </fieldset>

        <fieldset id="specials-field">
            <legend>Specials</legend>

            <label for="specials-end9">
                <input type="checkbox" @change="updateTotal" v-model="end9" id="specials-end9">
                <label for="specials-end9" class="custom-checkbox"></label>End game with 9 or more kills
            </label>

            <label for="specials-stream">
                <input type="checkbox" @change="updateTotal" v-model="stream" id="specials-stream">
                <label for="specials-stream" class="custom-checkbox"></label>Stream my boost
            </label>

            <label for="specials-oldbooster">
                <input type="checkbox" @change="updateTotal" v-model="oldbooster" id="specials-oldbooster">
                <label for="specials-oldbooster" class="custom-checkbox"></label>I want my old booster
            </label>
        </fieldset>

        <div id="checkout">
            <span id="total-amount">{{ currentTotal }}</span>
        </div>

        <Button style="float: right" @click="addToCart" type="primary">Add to Cart</Button>

        <fieldset id="coupon-field">
            <input type="text" placeholder="ENTER COUPON CODE HERE" />
            <p>Use "FORTNITE1" for 10% discount</p>
        </fieldset>

        <PayPal
                :amount="totalAmount"
                currency="USD"
                :client="paypal.credentials"
                :items="paypal_items"
                env="sandbox">
        </PayPal>

        <p id="get-started">
            Contact us on Skype using the button below.
        </p>

        <a href="skype:elojobbing?chat">
            <img src="@/assets/chatbutton_32px.png">
        </a>
    </div>
</template>

<script>
import PayPal from 'vue-paypal-checkout';
import { Button, Notification } from 'element-ui';
import { getPrice } from '@/store/cart';

export default {
  name: 'OrderForm',
  components: {
    Button, PayPal,
  },
  data: () => ({
    mode: 'solo',
    platform: 'pc',
    amount: 10,
    end9: false,
    stream: false,
    oldbooster: false,
    specials: [],
    discount: 0,
    total: 0,
    paypal: {
      credentials: {
        sandbox: 'AcxHfWkfclw4WMUj35YyOrXgjUAajk6qTuNa0QbV7AQIQc34mKwmbEQBpkaFerzHznezNLaH_THXsL1m',
      },
    },

  }),
  props: {},
  methods: {
    getItem() {
      const specials = ['end9', 'stream', 'oldbooster'].map(s => (this[s] ? s : null)).filter(n => n);

      return {
        game: 'fortnite',
        mode: this.mode,
        platform: this.platform,
        amount: this.amount,
        specials,
      };
    },

    updateTotal() {
      this.total = getPrice(this.getItem(), this.discount);
    },

    addToCart() {
      this.$store.dispatch('cart/add', this.getItem());

      Notification.info({
        title: 'Info',
        message: 'You have added an item to the cart',
      });
    },
  },
  computed: {
    currentTotal() {
      return `$${this.total.toFixed(2)}`;
    },
    totalAmount() {
      return this.$store.getters['cart/total'];
    },
    paypal_items() {
      return this.$store.getters['cart/itemsFormattedPayPal'];
    },
  },
  mounted() {
    this.updateTotal();
  },


};
</script>

<style scoped lang="less">
    #get-started {
        font-size: 1em;
        font-weight: 500;
        margin-top: 2em;
    }
</style>
