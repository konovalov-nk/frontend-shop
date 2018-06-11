/* eslint-disable no-param-reassign */

const BASE_MULTIPLIER = 1.0
const BASE_VALUE_PER_GAME = 10
const MULT_DUO_EXTRA = 0.4
const MULT_SQUAD_EXTRA = 0.8
const BONUS_9_KILLS = 5
const BONUS_STREAM = 2
const BONUS_OLD_BOOSTER = 0

const getPrice = (item, discount) => {
  let multiplier = BASE_MULTIPLIER

  if (item.specials.includes('playbooster')) {
    switch (item.mode) {
      case 'duo':
        multiplier += MULT_DUO_EXTRA
        break
      case 'squad':
        multiplier += MULT_SQUAD_EXTRA
        break
      default:
        break
    }
  }

  let valuePerGame = BASE_VALUE_PER_GAME
  valuePerGame += (item.specials.includes('end9') ? BONUS_9_KILLS : 0)
  valuePerGame += (item.specials.includes('stream') ? BONUS_STREAM : 0)
  valuePerGame += (item.specials.includes('oldbooster') ? BONUS_OLD_BOOSTER : 0)

  let total = item.quantity * valuePerGame
  if (item.quantity >= 5) {
    if (item.quantity < 10) {
      total -= 5
    } else {
      total -= ((item.quantity - (item.quantity % 5)) / 5) * valuePerGame
    }
  }

  return total * multiplier * (1.0 - discount)
}

const getDescription = (item) => {
  const descriptions = []
  descriptions.push(`Mode: ${item.mode.toUpperCase()}`)
  descriptions.push(`Platform: ${item.platform.toUpperCase()}`)

  const specials = []

  if (item.specials.includes('end9')) specials.push('End game with 9 or more kills')
  if (item.specials.includes('stream')) specials.push('Stream my boost')
  if (item.specials.includes('oldbooster')) specials.push('I want my old booster')
  if (item.specials.includes('playbooster')) specials.push('I want to play with booster')
  if (specials.length > 0) {
    descriptions.push(`Specials: ${specials.join(', ')}`)
  }

  return descriptions.join(', ')
}

const getGame = (item) => {
  const boosting = 'Boosting'
  const games = {
    1: `Fortnite ${boosting}`,
    2: `League of Legends ${boosting}`,
    3: `Overwatch ${boosting}`,
  }
  return typeof games[item.product_id] === 'undefined' ? 'Unknown Game' : games[item.product_id].trim()
}

const getSpecials = (item) => {
  if (typeof item.specials === 'string') {
    return item.specials
  }

  if (typeof item.specials === 'object') {
    return item.specials.join(',')
  }

  return ''
}

const communications = {
  email: 'E-Mail',
  discord: 'Discord',
  skype: 'Skype',
}

const permit = [
  'account_name',
  'account_password',
  'contact_email',
  'coupon',
  'details',
  'discord',
  'skype',
  'preferred_communication',
]

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
    order: {
      account_name: '',
      account_password: '',
      contact_email: '',
      coupon: '',
      details: '',
      discord: '',
      skype: '',
      preferred_communication: '',
    },
    items: [],
    invoice: '',
    is_new: true,
    discount: 0,
    total: 0,
    counter: 1,
  },
  mutations: {
    addItem(state, item) {
      item.id = state.counter
      state.items.push(item)
      state.counter += 1
    },
    removeItem(state, id) {
      state.items = state.items.filter(i => i.id !== id)
    },
    increaseItem(state, id) {
      state.items = state.items.map((i) => {
        if (i.id === id) {
          i.quantity += 1
        }

        i.quantity = i.quantity > 100 ? 100 : i.quantity

        return i
      })
    },
    decreaseItem(state, id) {
      state.items = state.items.map((i) => {
        if (i.id === id) {
          i.quantity -= 1
        }

        i.quantity = i.quantity < 1 ? 1 : i.quantity

        return i
      })
    },
    calculateTotal(state) {
      state.total = state.items.map(i => getPrice(i, state.discount)).reduce((r, i) => r + i, 0.0)
    },
    changeDiscount(state, discount) {
      state.discount = discount
    },
    changeCoupon(state, coupon) {
      state.order.coupon = coupon
    },
    changeDetails(state, details) {
      state.order.details = details
    },
    changeInvoice(state, invoice) {
      state.invoice = invoice
    },
    changeItems(state, items) {
      state.items = items
    },
    changeNew(state, is_new) {
      state.is_new = is_new
    },
    change_order(state, order) {
      Object.entries(order).forEach(([key, value]) => {
        if (permit.includes(key)) state.order[key] = value
      })
    },
    change_preferred_communication(state, items) {
      const values = []
      Object
        .entries(communications)
        .forEach(([key, value]) => {
          if (items.includes(value)) values.push(key)
        })

      state.order.preferred_communication = values.join(',')
    },
    change_discord(state, discord) {
      state.order.discord = discord
    },
    change_skype(state, skype) {
      state.order.skype = skype
    },
    change_contact_email(state, email) {
      state.order.contact_email = email
    },
    change_account_name(state, name) {
      state.order.account_name = name
    },
    change_account_password(state, password) {
      state.order.account_password = password
    },
    change_character_name(state, character_name) {
      state.order.account_password = character_name
    },
  },
  actions: {
    add({ commit }, item) {
      commit('addItem', item)
      commit('calculateTotal')
    },
    remove({ commit }, id) {
      commit('removeItem', id)
      commit('calculateTotal')
    },
    increase({ commit }, id) {
      commit('increaseItem', id)
      commit('calculateTotal')
    },
    decrease({ commit }, id) {
      commit('decreaseItem', id)
      commit('calculateTotal')
    },
    applyCoupon({ commit }, coupon) {
      let discount = 0
      if (coupon.toLowerCase() === 'fortnite1') discount = 0.1

      if (discount === 0) {
        coupon = ''
      }
      commit('changeCoupon', coupon)
      commit('changeDiscount', discount)
      commit('calculateTotal')
    },
    changeOrderDetails({ commit }, details) {
      commit('changeDetails', details)
    },
    changeCoupon({ commit }, coupon) {
      commit('changeCoupon', coupon)
    },
    reset({ commit }) {
      commit('changeInvoice', '')
      commit('changeCoupon', '')
      commit('changeDiscount', 0)
      commit('changeDetails', '')
      commit('changeItems', [])
      commit('changeNew', true)
      commit('calculateTotal')
    },
    setInvoice({ commit }, invoice) {
      commit('changeInvoice', invoice)
    },
    setNew({ commit }, isNew) {
      commit('changeNew', isNew)
    },
    setItems({ commit }, items) {
      commit('changeItems', [])
      items.forEach((item) => {
        commit('addItem', item)
      })
    },
    set_order({ commit }, order) {
      commit('change_order', order)
      // commit('change_order', {
      //   account_name: 'wtf',
      // })
    },
    set_preferred_communication({ commit }, items) {
      commit('change_preferred_communication', items)
    },
    set_discord({ commit }, discord) { commit('change_discord', discord) },
    set_skype({ commit }, skype) { commit('change_skype', skype) },
    set_contact_email({ commit }, email) { commit('change_contact_email', email) },
    set_account_name({ commit }, name) { commit('change_account_name', name) },
    set_account_password({ commit }, password) { commit('change_account_password', password) },
    set_character_name({ commit }, name) { commit('change_character_name', name) },
  },
  getters: {
    totalFormatted(state) {
      const discountString = state.discount > 0 ? ` (-${state.discount * 100}%)` : ''

      return `$${state.total.toFixed(2)}${discountString}`
    },

    coupon: state => (state.order.coupon ? state.order.coupon : ''),

    currentCoupon: state => (state.order.coupon ? `Coupon applied: ${state.order.coupon}` : ''),

    total: state => state.total.toFixed(2),

    items: state => state.items,

    orderDetails: state => state.order.details,

    orderNew: state => state.new,

    orderInvoice: state => state.invoice,

    orderInvoiceFormatted: state => (state.new === false ? ` (Order #${state.invoice})` : ''),

    needsAccountDetails(state) {
      return state.items.reduce((r, i) => r || !i.specials.includes('playbooster'), false)
    },

    order: state => state.order,

    preferred_communication: state => state.order
      .preferred_communication.split(',')
      .map(c => communications[c]),

    discord: state => state.order.discord,
    skype: state => state.order.skype,
    contact_email: state => state.order.contact_email,
    account_name: state => state.order.account_name,
    account_password: state => state.order.account_password,

    order_valid(state, getters) {
      if (state.order.preferred_communication.length === 0) return false
      if (state.order.preferred_communication
        .split(',')
        .reduce((r, c) => r || state.order[c].length > 0, false) === false) return false
      if (getters.needsAccountDetails) {
        if (state.order.account_name.length === 0 || state.order.account_password.length === 0) return false
      }

      return state.items.length !== 0
    },

    itemsFormatted(state) {
      return state.items.map(i => ({
        id: i.id,
        product_name: getGame(i),
        product_description: getDescription(i),
        quantity: i.quantity,
        total: `$${getPrice(i, state.discount).toFixed(2)}`,
      }))
    },

    itemsFormattedBackend(state) {
      return state.items.map(i => ({
        product_id: i.product_id,
        mode: i.mode,
        platform: i.platform,
        quantity: i.quantity,
        price: getPrice(i, state.discount).toFixed(2),
        specials: getSpecials(i),
      }))
    },

    itemsFormattedPayPal(state) {
      return state.items.map(i => ({
        name: getGame(i),
        description: getDescription(i),
        quantity: 1,
        price: getPrice(i, state.discount).toFixed(2),
        currency: 'USD',
      }))
    },
  },
}

export { storeCart, getPrice, getDescription, getGame }
