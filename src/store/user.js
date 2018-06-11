/* eslint-disable no-param-reassign */

import { Notification } from 'element-ui'
import store from '../store'
import router from '../router'

const hostname = process.env.VUE_APP_API_HOSTNAME
const protocol = process.env.VUE_APP_API_SSL === 'true' ? 'https' : 'http'

const setTawkUser = (content) => {
  window.Tawk_API.setAttributes({
    name: `${content.first_name} ${content.last_name}`,
    email: content.email,
    hash: content.tawk_to_hash,
  }, (error) => {
    console.log('Tawk API error')
    console.log(error)
  })
}

const tawkOnLoad = (callback) => {
  if (typeof window.Tawk_API.setAttributes === 'undefined') {
    window.Tawk_API.onLoad(() => {
      callback()
    })
  } else {
    callback()
  }
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

  // if (response.status === 401) {
  //   console.log('unauthorized!');
  //   throw Error(response.body.error);
  // }

  return response
}

// const fetchResponse = (async (callback, data, jwt) => {
//   const rawResponse = await fetch(`${protocol}://${hostname}/users/sign_in`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   const content = await rawResponse.json();
//   console.log(content);
//
//   // Calls the mutation defined to update the state's JWT.
//   commit('setJWT', await content.text());
// })();
const storeUser = {
  namespaced: true,

  state: {
    firstLoad: true,
    currentJWT: '',
    user: {},
    loggedIn: false,
  },

  getters: {
    jwt: state => state.currentJWT,
    jwtData: (state, getters) => (state.currentJWT ? JSON.parse(atob(getters.jwt.split('.')[1])) : null),
    jwtSubject: (state, getters) => (getters.jwtData ? getters.jwtData.sub : null),
    jwtIssuer: (state, getters) => (getters.jwtData ? getters.jwtData.iss : null),
    data: state => state.user,
    loggedIn: state => state.loggedIn,
    firstLoad: state => state.firstLoad,
    order_data: state => ({
      account_name: state.account_name,
      account_password: state.account_password,
      contact_email: state.contact_email,
      coupon: state.coupon,
      details: state.details,
      discord: state.discord,
      skype: state.skype,
      preferred_communication: state.preferred_communication,
    }),
  },

  mutations: {
    markFirstLoad(state) {
      state.firstLoad = false
    },
    setJWT(state, jwt) {
      state.currentJWT = jwt
    },
    setUser(state, data) {
      state.user = data
    },
    setloggedIn(state, loggedIn) {
      state.loggedIn = loggedIn
    },
  },

  actions: {
    setLoggedOut({ commit }) {
      commit('setloggedIn', '')
      commit('setloggedIn', false)
      commit('setUser', {})
    },
    async register({ commit, dispatch }, formData) {
      return fetch(`${protocol}://${hostname}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: formData,
        }),
      })
        .then(handleErrors)
        .then((response) => {
          console.log('response is okay')
          console.log(response)

          let jwt = ''
          response.headers.forEach((v, k) => {
            if (k === 'authorization') {
              jwt = v.replace(/Bearer /g, '')
            }
          })

          commit('setJWT', jwt)
          commit('setloggedIn', jwt.length > 0)
          localStorage.setItem('APP_KEY_JWT', jwt)

          Notification.success({
            title: 'Sign-up',
            message: 'You have successfully signed up. Please, check your email.',
          })

          dispatch('fetchData')

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },

    async login({ commit, dispatch }, user) {
      return fetch(`${protocol}://${hostname}/users/sign_in`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      })
        .then(handleErrors)
        .then((response) => {
          console.log('response is okay')
          console.log(response)

          let jwt = ''
          response.headers.forEach((v, k) => {
            if (k === 'authorization') {
              jwt = v.replace(/Bearer /g, '')
            }
          })

          commit('setJWT', jwt)
          commit('setloggedIn', jwt.length > 0)
          localStorage.setItem('APP_KEY_JWT', jwt)

          Notification.success({
            title: 'Sign-in',
            message: 'You have successfully logged in.',
          })

          dispatch('fetchData')

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },

    async setJWTFetch({ getters, commit, dispatch }, jwt) {
      if (getters.firstLoad === false) return

      if (typeof jwt === 'string' && jwt.length > 0) {
        const base64Url = jwt.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        const token = JSON.parse(atob(base64))
        const currentTime = Date.now() / 1000
        if (currentTime < token.exp) {
          commit('setJWT', jwt)
          dispatch('fetchData')
          commit('markFirstLoad')
        }
      }
    },

    async fetchData({
      commit, dispatch, state, getters,
    }) {
      const userId = getters.jwtData.sub
      return fetch(`${protocol}://${hostname}/users/show/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.currentJWT}`,
        },
      })
        .then(handleErrors)
        .then(async (response) => {
          console.log('response is okay')
          console.log(response)

          const content = await response.json()
          commit('setUser', content)
          commit('setloggedIn', content.id > 0)
          dispatch('fetchOrder')

          tawkOnLoad(() => {
            setTawkUser(content)
          })

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },

    async fetchOrder({ state, getters }) {
      return fetch(`${protocol}://${hostname}/cart`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.currentJWT}`,
        },
      })
        .then(handleErrors)
        .then(async (response) => {
          console.log('response is okay')
          console.log(response)

          const { order, items } = await response.json()
          store.dispatch('cart/setInvoice', order.invoice, { root: true })
          if (order.new === false) {
            store.dispatch('cart/setNew', false, { root: true })
            store.dispatch('cart/set_order', order, { root: true })
            store.dispatch('cart/setItems', items, { root: true })
            store.dispatch('cart/applyCoupon', order.coupon, { root: true })
          } else {
            store.dispatch('cart/setNew', true, { root: true })
            store.dispatch('cart/set_order', getters['user/order_data'], { root: true })
          }

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },

    async logout({ commit, state }) {
      return fetch(`${protocol}://${hostname}/users/sign_out`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.currentJWT}`,
        },
      })
        .then(handleErrors)
        .then((response) => {
          console.log('response is okay')
          console.log(response)

          localStorage.setItem('APP_KEY_JWT', '')
          commit('setJWT', '')
          commit('setloggedIn', false)
          store.dispatch('cart/setNew', true, { root: true })

          if (!['index'].includes(router.currentRoute.name)) {
            router.push('/')
          }

          Notification.success({
            title: 'Sign-out',
            message: 'You have successfully logged out.',
          })

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },

    async createOrder({ state }) {
      return fetch(`${protocol}://${hostname}/cart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.currentJWT}`,
        },
        body: JSON.stringify({
          order: store.getters['cart/order'],
          order_items: store.getters['cart/itemsFormattedBackend'],
        }),
      })
        .then(handleErrors)
        .then(async (response) => {
          console.log('response is okay')
          console.log(response)

          const content = await response.json()
          store.dispatch('cart/setInvoice', content.order.invoice, { root: true })
          store.dispatch('cart/setNew', false, { root: true })

          Notification.success({
            title: 'Order created',
            message: `You have successfully created the order #${content.order.invoice}.`,
          })

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },
    async updateOrder({ state }) {
      return fetch(`${protocol}://${hostname}/cart`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.currentJWT}`,
        },
        body: JSON.stringify({
          order: store.getters['cart/order'],
          order_items: store.getters['cart/itemsFormattedBackend'],
        }),
      })
        .then(handleErrors)
        .then(async (response) => {
          console.log('response is okay')
          console.log(response)

          const content = await response.json()

          Notification.success({
            title: 'Order updated',
            message: `You have successfully updated order #${content.order.invoice}.`,
          })

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },

    async finishOrder({ state }) {
      return fetch(`${protocol}://${hostname}/cart/complete`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.currentJWT}`,
        },
        body: JSON.stringify({
          order: {
            invoice: store.getters['cart/orderInvoice'],
          },
        }),
      })
        .then(handleErrors)
        .then(async (response) => {
          console.log('response is okay')
          console.log(response)

          const content = await response.json()

          Notification.success({
            title: 'Order paid',
            message: `You have successfully sent payment for the order #${content.order.invoice}.`,
          })

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },

    async testMail({ state, getters }) {
      return fetch(`${protocol}://${hostname}/users/test?id=${getters.jwtData.sub}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.currentJWT}`,
        },
      })
        .then(handleErrors)
        .then(async (response) => {
          console.log('response is okay')
          console.log(response)

          return response
        })
        .catch((reason) => {
          console.log('reason')
          console.log(reason)

          return reason
        })
    },
  },
}

export { storeUser, hostname }
