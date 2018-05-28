/* eslint-disable no-param-reassign */

const hostname = process.env.VUE_APP_API_HOSTNAME;
const protocol = process.env.VUE_APP_API_SSL === 'true' ? 'https' : 'http';

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
    async register({ dispatch, commit }, formData) {
      (async () => {
        const rawResponse = await fetch(`${protocol}://${hostname}/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: formData,
          }),
        });
        let jwt = '';
        rawResponse.headers.forEach((v, k) => {
          if (k === 'authorization') {
            jwt = v.replace(/Bearer /g, '');
          }
        });

        commit('setJWT', jwt);
        commit('setloggedIn', jwt.length > 0);
        await dispatch('fetchData');
      })();
    },

    async fetchJWT({ commit }, { email, password }) {
      (async () => {
        const rawResponse = await fetch(`${protocol}://${hostname}/users/sign_in`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: email, password, password_confirmation: password,
          }),
        });
        let jwt = '';
        rawResponse.headers.forEach((v, k) => {
          if (k === 'authorization') {
            jwt = v.replace(/Bearer /g, '');
          }
        });

        commit('setJWT', jwt);
        commit('setloggedIn', jwt.length > 0);
      })();
    },

    async fetchData({ commit, state, getters }) {
      (async () => {
        const userId = getters.jwtData.sub;
        const rawResponse = await fetch(`${protocol}://${hostname}/users/show/${userId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.currentJWT}`,
          },
        });
        const content = await rawResponse.json();

        commit('setUser', await content);
      })();
    },
  },
};

export { storeUser, hostname };
