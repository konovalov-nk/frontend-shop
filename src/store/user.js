/* eslint-disable no-param-reassign */

import store from '../store';

const hostname = process.env.VUE_APP_API_HOSTNAME;
const protocol = process.env.VUE_APP_API_SSL === 'true' ? 'https' : 'http';

const handleErrors = async (response) => {
  if (!response.ok) {
    const json = await response.json();
    let errorMessage = '';
    let field;
    let message;

    console.log(json);
    if (json.errors) {
      [field, message] = Object.entries(json.errors).shift();
      field = `${field[0].toUpperCase()}${field.slice(1)}`;
      errorMessage = `${field} ${message}`;
    } else if (json.error) {
      errorMessage = json.error;
    }

    errorMessage = errorMessage || response.statusText;

    store.dispatch('modal/open', {
      message: errorMessage,
      type: 'error',
    });

    throw Error(response.statusText);
  }

  // if (response.status === 401) {
  //   console.log('unauthorized!');
  //   throw Error(response.body.error);
  // }

  return response;
};

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
    currentJWT: '',
    user: {},
    loggedIn: false,
  },

  getters: {
    jwt: state => state.currentJWT,
    jwtData: (state, getters) => (state.currentJWT ? JSON.parse(atob(getters.jwt.split('.')[1])) : null),
    jwtSubject: (state, getters) => (getters.jwtData ? getters.jwtData.sub : null),
    jwtIssuer: (state, getters) => (getters.jwtData ? getters.jwtData.iss : null),
    userData: state => state.user,
    loggedIn: state => state.loggedIn,
  },

  mutations: {
    setJWT(state, jwt) {
      state.currentJWT = jwt;
    },
    setUser(state, userData) {
      state.user = userData;
    },
    setloggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
  },

  actions: {
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
          console.log('response is okay');
          console.log(response);

          let jwt = '';
          response.headers.forEach((v, k) => {
            if (k === 'authorization') {
              jwt = v.replace(/Bearer /g, '');
            }
          });

          commit('setJWT', jwt);
          commit('setloggedIn', jwt.length > 0);

          dispatch('fetchData');

          return response;
        })
        .catch((reason) => {
          console.log('reason');
          console.log(reason);
        });
    },

    async fetchJWT({ commit, dispatch }, user) {
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
          console.log('response is okay');
          console.log(response);

          let jwt = '';
          response.headers.forEach((v, k) => {
            if (k === 'authorization') {
              jwt = v.replace(/Bearer /g, '');
            }
          });

          commit('setJWT', jwt);
          commit('setloggedIn', jwt.length > 0);

          dispatch('fetchData');

          return response;
        })
        .catch((reason) => {
          console.log('reason');
          console.log(reason);
        });
    },

    async fetchData({ commit, state, getters }) {
      const userId = getters.jwtData.sub;
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
          console.log('response is okay');
          console.log(response);

          const content = await response.json();
          commit('setUser', content);

          return response;
        })
        .catch((reason) => {
          console.log('reason');
          console.log(reason);
        });
    },
  },
};

export { storeUser, hostname };
