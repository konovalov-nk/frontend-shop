/* eslint-disable no-param-reassign */

const BASE_MULTIPLIER = 1.0;
const BASE_VALUE_PER_GAME = 10;
const MULT_DUO_EXTRA = 0.4;
const MULT_SQUAD_EXTRA = 0.0;
const BONUS_9_KILLS = 5;
const BONUS_STREAM = 2;
const BONUS_OLD_BOOSTER = 0;

const getPrice = (item, discount) => {
  let multiplier = BASE_MULTIPLIER;

  switch (item.mode) {
    case 'solo':
      break;
    case 'duo':
      multiplier += MULT_DUO_EXTRA;
      break;
    default:
      multiplier += MULT_SQUAD_EXTRA;
      break;
  }

  multiplier -= discount;

  let valuePerGame = BASE_VALUE_PER_GAME;
  valuePerGame += (item.specials.includes('end9') ? BONUS_9_KILLS : 0);
  valuePerGame += (item.specials.includes('stream') ? BONUS_STREAM : 0);
  valuePerGame += (item.specials.includes('oldbooster') ? BONUS_OLD_BOOSTER : 0);

  let total = item.amount * valuePerGame;
  if (item.amount >= 5) {
    if (item.amount < 10) {
      total -= 5;
    } else {
      total -= ((item.amount - (item.amount % 5)) / 5) * valuePerGame;
    }
  }

  total *= multiplier;
  return total;
};

const getDescription = (item) => {
  const descriptions = [];
  descriptions.push(`Mode: ${item.mode.toUpperCase()}`);
  descriptions.push(`Platform: ${item.platform.toUpperCase()}`);

  if (item.specials.includes('end9')) descriptions.push('End game with 9 or more kills');
  if (item.specials.includes('stream')) descriptions.push('Stream my boost');
  if (item.specials.includes('oldbooster')) descriptions.push('I want my old booster');
  return descriptions.join(', ');
};

const getGame = (item) => {
  const boosting = 'Boosting';
  const games = {
    fortnite: `Fortnite ${boosting}`,
    lol: `League of Legends ${boosting}`,
    overwatch: `Overwatch ${boosting}`,
  };
  return typeof games[item.game] === 'undefined' ? 'Unknown Game' : games[item.game].trim();
};

/**
 * game: 'fortnite', 'lol', 'overwatch', ...
 * mode: 'solo', 'duo', 'squad'
 * platform: 'pc', 'ps4', 'xbox'
 * amount: 10
 * specials: 'end9, stream, oldbooster'
 */
const storeCart = {
  namespaced: true,
  state: {
    items: [],
    discount: 0,
    coupon: '',
    total: 0,
    counter: 1,
  },
  mutations: {
    addItem(state, item) {
      item.id = state.counter;
      state.items.push(item);
      state.counter += 1;
    },
    removeItem(state, id) {
      state.items = state.items.filter(i => i.id !== id);
    },
    increaseItem(state, id) {
      state.items = state.items.map((i) => {
        if (i.id === id) {
          i.amount += 1;
        }

        i.amount = i.amount > 100 ? 100 : i.amount;

        return i;
      });
    },
    decreaseItem(state, id) {
      state.items = state.items.map((i) => {
        if (i.id === id) {
          i.amount -= 1;
        }

        i.amount = i.amount < 1 ? 1 : i.amount;

        return i;
      });
    },
    calculateTotal(state) {
      state.total = state.items.map(i => getPrice(i, state.discount)).reduce((r, i) => r + i, 0.0);
    },
    changeDiscount(state, discount) {
      state.discount = discount;
    },
    changeCoupon(state, coupon) {
      state.coupon = coupon;
    },
  },
  actions: {
    add({ commit }, item) {
      commit('addItem', item);
      commit('calculateTotal');
    },
    remove({ commit }, id) {
      commit('removeItem', id);
      commit('calculateTotal');
    },
    increase({ commit }, id) {
      commit('increaseItem', id);
      commit('calculateTotal');
    },
    decrease({ commit }, id) {
      commit('decreaseItem', id);
      commit('calculateTotal');
    },
    applyCoupon({ commit }, coupon) {
      let discount = 0;
      if (coupon === 'FORTNITE1') discount = 0.1;

      if (discount === 0) {
        coupon = '';
      }
      commit('changeCoupon', coupon);
      commit('changeDiscount', discount);
      commit('calculateTotal');
    },
  },
  getters: {
    totalFormatted(state) {
      const discountString = state.discount > 0 ? ` (-${state.discount * 100}%)` : '';

      return `$${state.total.toFixed(2)}${discountString}`;
    },
    currentCoupon: state => (state.coupon ? `Coupon applied: ${state.coupon}` : ''),
    total: state => state.total.toFixed(2),
    items: state => state.items,
    itemsFormatted(state) {
      return state.items.map(i => ({
        id: i.id,
        product_name: getGame(i),
        product_description: getDescription(i),
        quantity: i.amount,
        total: `$${getPrice(i, state.discount).toFixed(2)}`,
      }));
    },
    itemsFormattedPayPal(state) {
      return state.items.map(i => ({
        name: getGame(i),
        description: getDescription(i),
        quantity: 1,
        price: getPrice(i, state.discount).toFixed(2),
        currency: 'USD',
      }));
    },
  },
};

export { storeCart, getPrice, getDescription, getGame };
