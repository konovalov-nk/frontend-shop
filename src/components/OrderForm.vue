<template>
    <div id="order-form">
        <fieldset id="compmode-field">
            <legend>Competitive Mode</legend>
            <div class="form-radio">
                <label for="compmode-solo">
                    <input type="radio" @change="updateTotal" v-model="compmode" value="solo" id="compmode-solo" checked>
                    <label for="compmode-solo" class="custom-checkbox"></label>Solo
                </label>
            </div>

            <div class="form-radio">
                <label for="compmode-duo">
                    <input type="radio" @change="updateTotal" v-model="compmode" value="duo" id="compmode-duo">
                    <label for="compmode-duo" class="custom-checkbox"></label>Duo
                </label>
            </div>

            <div class="form-radio">
                <label for="compmode-squad">
                    <input type="radio" @change="updateTotal" v-model="compmode" value="squad" id="compmode-squad">
                    <label for="compmode-squad" class="custom-checkbox"></label>Squad
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

        <fieldset id="wins-field">
            <legend>Wins</legend>

            <div class="form-radio">
                <label for="wins-solo">
                    <input type="radio" @change="updateTotal" v-model="winmode" value="solo" id="wins-solo" checked>
                    <label for="wins-solo" class="custom-checkbox"></label>Solo
                </label>
            </div>

            <div class="form-radio">
                <label for="wins-duo">
                    <input type="radio" @change="updateTotal" v-model="winmode" value="duo" id="wins-duo">
                    <label for="wins-duo" class="custom-checkbox"></label>Duo
                </label>
            </div>

            <div class="form-radio">
                <label for="wins-squad">
                    <input type="radio" @change="updateTotal" v-model="winmode" value="squad" id="wins-squad">
                    <label for="wins-squad" class="custom-checkbox"></label>Squad
                </label>
            </div>

            <br>
            <div class="form-radio"></div>
            <div class="form-radio extra">40% extra</div>
            <div class="form-radio extra">80% extra</div>
            <el-slider @change="updateTotal" :min="1" v-model="wins"/>
            <div id="wins-value">{{ wins }} wins</div>
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
            <span id="total-amount">{{ totalFormatted }}</span>
        </div>

        <PayPal
            :amount="totalAmount"
            currency="USD"
            :client="paypal.credentials"
            env="sandbox">
        </PayPal>

        <fieldset id="coupon-field">
            <input type="text" placeholder="ENTER COUPON CODE HERE" />
            <p>Use "FORTNITE1" for 10% discount</p>
        </fieldset>

        <p id="get-started">
            Contact us on Skype using the button below.
        </p>

        <a href="skype:elojobbing?chat">
            <img src="https://secure.skypeassets.com/apollo/2.0.1735/images/components/contactme-button/chatbutton_32px.png"></a>
    </div>
</template>

<script>
import PayPal from 'vue-paypal-checkout';

const BASE_MULTIPLIER = 1.0;
const BASE_VALUE_PER_GAME = 10;
const MULT_DUO_EXTRA = 0.4;
const MULT_SQUAD_EXTRA = 0.0;
const BONUS_9_KILLS = 5;
const BONUS_STREAM = 2;
const BONUS_OLD_BOOSTER = 0;

export default {
  name: 'OrderForm',
  components: {
    PayPal,
  },
  data: () => ({
    compmode: 'solo',
    platform: 'pc',
    winmode: 'solo',
    wins: 10,
    end9: false,
    stream: false,
    oldbooster: false,
    discount: 0,
    total: 0,
    paypal: {
      credentials: {
        sandbox: 'AcxHfWkfclw4WMUj35YyOrXgjUAajk6qTuNa0QbV7AQIQc34mKwmbEQBpkaFerzHznezNLaH_THXsL1m',
      },
      items: [
        {
          name: 'hat',
          description: 'Brown hat.',
          quantity: '1',
          price: '5',
          currency: 'USD',
        },
        {
          name: 'handbag',
          description: 'Black handbag.',
          quantity: '1',
          price: '5',
          currency: 'USD',
        },
      ],
    },

  }),
  props: {},
  methods: {
    updateTotal() {
      let multiplier = BASE_MULTIPLIER;

      switch (this.compmode) {
        case 'solo':
          break;
        case 'duo':
          multiplier += MULT_DUO_EXTRA;
          break;
        default:
          multiplier += MULT_SQUAD_EXTRA;
          break;
      }

      multiplier -= this.discount;

      let valuePerGame = BASE_VALUE_PER_GAME;
      valuePerGame += (this.end9 ? BONUS_9_KILLS : 0);
      valuePerGame += (this.stream ? BONUS_STREAM : 0);
      valuePerGame += (this.oldbooster ? BONUS_OLD_BOOSTER : 0);

      this.total = this.wins * valuePerGame;
      if (this.wins >= 5) {
        if (this.wins < 10) {
          this.total -= 5;
        } else {
          this.total -= ((this.wins - (this.wins % 5)) / 5) * valuePerGame;
        }
      }

      this.total *= multiplier;
      this.$store.commit('changeTotal', this.total);
    },
  },
  computed: {
    totalFormatted() {
      return this.$store.getters.totalFormatted;
    },
    totalAmount() {
      return this.$store.getters.total;
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
