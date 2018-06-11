/* eslint-disable no-param-reassign */
import store from '../store'
import router from '../router'

const test = () => {
  console.log('test')
}

const handleErrors = async (response) => {
  if (!response.ok) {
    const json = await response.json()
    let errorMessage = ''
    let field
    let message

    console.log(json)
    if (json.errors) {
      [field, message] = Object.entries(json.errors).shift()
      field = `${field[0].toUpperCase()}${field.slice(1)}`
      errorMessage = `${field} ${message}`
    } else if (json.error) {
      errorMessage = json.error
    }

    errorMessage = errorMessage || response.statusText

    if (errorMessage === 'Signature has expired') {
      errorMessage = 'Your session has timed out. Please log in again.'
      store.dispatch('user/setLoggedOut')
      router.push('/')
    }

    store.dispatch('modal/open', {
      message: errorMessage,
      type: 'error',
    })

    throw Error(response.statusText)
  }

  return response
}

const hostname = process.env.VUE_APP_API_HOSTNAME
const protocol = process.env.VUE_APP_API_SSL === 'true' ? 'https' : 'http'

const storeOrder = {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item)
    },
    changeItems(state, items) {
      state.items = items
    },
  },
  actions: {
    reset({ commit }) {
      commit('changeItems', [])
    },

    setItems({ commit }, items) {
      commit('changeItems', [])
      items.forEach((item) => {
        commit('addItem', item)
      })
    },

    async fetchOrders() {
      return fetch(`${protocol}://${hostname}/orders/history`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.getters['user/jwt']}`,
        },
      })
        .then(handleErrors)
        .then(async (response) => {
          console.log('response is okay')
          console.log(response)

          const content = await response.json()
          store.dispatch('order/setItems', content)

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },
  },
  getters: {
    items(state) {
      return state.items
    },
  },
}

export { storeOrder, test }
