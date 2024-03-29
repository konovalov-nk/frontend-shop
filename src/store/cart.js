/* eslint-disable no-param-reassign */

const BASE_MULTIPLIER = 1.0;
const BASE_VALUE_PER_GAME = 10;
const MULT_DUO_EXTRA = 0.4;
const MULT_SQUAD_EXTRA = 0.8;
const MULT_PLAY_BOOSTER = 0.4;
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

  if (item.specials.includes('playbooster')) {
    multiplier += MULT_PLAY_BOOSTER;
  }

  multiplier -= discount;

  let valuePerGame = BASE_VALUE_PER_GAME;
  valuePerGame += (item.specials.includes('end9') ? BONUS_9_KILLS : 0);
  valuePerGame += (item.specials.includes('stream') ? BONUS_STREAM : 0);
  valuePerGame += (item.specials.includes('oldbooster') ? BONUS_OLD_BOOSTER : 0);

  let total = item.quantity * valuePerGame;
  if (item.quantity >= 5) {
    if (item.quantity < 10) {
      total -= 5;
    } else {
      total -= ((item.quantity - (item.quantity % 5)) / 5) * valuePerGame;
    }
  }

  total *= multiplier;
  return total;
};

const getDescription = (item) => {
  const descriptions = [];
  descriptions.push(`Mode: ${item.mode.toUpperCase()}`);
  descriptions.push(`Platform: ${item.platform.toUpperCase()}`);
  descriptions.push(`Account: ${item.account_name}`);

  const specials = [];

  if (item.specials.includes('end9')) specials.push('End game with 9 or more kills');
  if (item.specials.includes('stream')) specials.push('Stream my boost');
  if (item.specials.includes('oldbooster')) specials.push('I want my old booster');
  if (item.specials.includes('playbooster')) specials.push('I want to play with booster');
  if (specials.length > 0) {
    descriptions.push(`Specials: ${specials.join(', ')}`);
  }

  return descriptions.join(', ');
};

const getGame = (item) => {
  const boosting = 'Boosting';
  const games = {
    1: `Fortnite ${boosting}`,
    2: `League of Legends ${boosting}`,
    3: `Overwatch ${boosting}`,
  };
  return typeof games[item.product_id] === 'undefined' ? 'Unknown Game' : games[item.product_id].trim();
};

const getSpecials = (item) => {
  if (typeof item.specials === 'string') {
    return item.specials;
  }

  if (typeof item.specials === 'object') {
    return item.specials.join(',');
  }

  return '';
};

/**
 * product_id: 1
 * mode: 'solo', 'duo', 'squad'
 * platform: 'pc', 'ps4', 'xbox'
 * quantity: 10
 * specials: 'end9,stream,oldbooster,playbooster'
 */
const storeCart = {
  namespaced: true,
  state: {
    items: [],
    discount: 0,
    coupon: '',
    total: 0,
    counter: 1,
    details: '',
    invoice: '',
    new: true,
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
          i.quantity += 1;
        }

        i.quantity = i.quantity > 100 ? 100 : i.quantity;

        return i;
      });
    },
    decreaseItem(state, id) {
      state.items = state.items.map((i) => {
        if (i.id === id) {
          i.quantity -= 1;
        }

        i.quantity = i.quantity < 1 ? 1 : i.quantity;

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
    changeDetails(state, details) {
      state.details = details;
    },
    changeInvoice(state, invoice) {
      state.invoice = invoice;
    },
    changeItems(state, items) {
      state.items = items;
    },
    changeNew(state, isNew) {
      state.new = isNew;
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
      if (coupon.toLowerCase() === 'fortnite1') discount = 0.1;

      if (discount === 0) {
        coupon = '';
      }
      commit('changeCoupon', coupon);
      commit('changeDiscount', discount);
      commit('calculateTotal');
    },
    changeOrderDetails({ commit }, details) {
      commit('changeDetails', details);
    },
    changeCoupon({ commit }, coupon) {
      commit('changeCoupon', coupon);
    },
    reset({ commit }) {
      commit('changeInvoice', '');
      commit('changeCoupon', '');
      commit('changeDiscount', 0);
      commit('changeDetails', '');
      commit('changeItems', []);
      commit('changeNew', true);
      commit('calculateTotal');
    },
    setInvoice({ commit }, invoice) {
      commit('changeInvoice', invoice);
    },
    setNew({ commit }, isNew) {
      commit('changeNew', isNew);
    },
    setItems({ commit }, items) {
      commit('changeItems', []);
      items.forEach((item) => {
        commit('addItem', item);
      });
    },
  },
  getters: {
    totalFormatted(state) {
      const discountString = state.discount > 0 ? ` (-${state.discount * 100}%)` : '';

      return `$${state.total.toFixed(2)}${discountString}`;
    },
    coupon: state => (state.coupon ? state.coupon : ''),
    currentCoupon: state => (state.coupon ? `Coupon applied: ${state.coupon}` : ''),
    total: state => state.total.toFixed(2),
    items: state => state.items,
    orderDetails: state => state.details,
    orderNew: state => state.new,
    orderInvoice: state => state.invoice,
    orderInvoiceFormatted: state => (state.new === false ? ` (Order #${state.invoice})` : ''),
    itemsFormatted(state) {
      return state.items.map(i => ({
        id: i.id,
        product_name: getGame(i),
        product_description: getDescription(i),
        quantity: i.quantity,
        total: `$${getPrice(i, state.discount).toFixed(2)}`,
      }));
    },
    itemsFormattedBackend(state) {
      return state.items.map(i => ({
        product_id: i.product_id,
        mode: i.mode,
        platform: i.platform,
        quantity: i.quantity,
        price: getPrice(i, state.discount).toFixed(2),
        specials: getSpecials(i),
        account_name: i.account_name,
        password: i.password,
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
