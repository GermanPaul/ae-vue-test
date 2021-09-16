import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import Auther from '../helpers/auth';
import Api from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    images: {
      pictures: [],
      page: 1,
      pageCount: 0,
      hasMore: false,
    },
    selectedImage: {
      id: '',
      author: '',
      camera: '',
      tags: '',
      cropped_picture: '',
      full_picture: '',
    },
  },
  mutations: {
    setLogged(state, payload) {
      state.logged = payload;
    },
    setImages(state, payload) {
      state.images = payload;
    },
    setSelectedImage(state, payload) {
      state.selectedImage = payload;
    },
  },
  actions: {
    async login({ state, commit }) {
      if (state.logged) {
        Auther.removeToken();
        router.push({ path: '/login' });
        commit('setLogged', false);
      } else {
        try {
          const response = await Api.auth();
          const res = await response.json();
          Auther.setToken(res.token);
          commit('setLogged', true);
          router.push({ path: '/' });
        } catch (e) {
          console.error(e);
          Auther.removeToken();
        }
      }
    },
    checkLogin({ commit }) {
      commit('setLogged', Auther.isAuth());
    },
    async updateImages({ commit }, page = 1) {
      try {
        const token = Auther.getToken();
        const response = await Api.images(token, page);
        const res = await response.json();
        commit('setImages', res);
      } catch (e) {
        console.error(e);
        Auther.removeToken();
        router.push({ path: '/login' });
      }
    },
    async updateSelectedImage({ commit }, id) {
      try {
        const token = Auther.getToken();
        const response = await Api.image(token, id);
        const res = await response.json();
        commit('setSelectedImage', res);
      } catch (e) {
        console.error(e);
        Auther.removeToken();
        router.push({ path: '/login' });
      }
    },
    resetSelectedImage({ commit }) {
      commit('setSelectedImage', {
        id: '',
        author: '',
        camera: '',
        tags: '',
        cropped_picture: '',
        full_picture: '',
      });
    },
  },
});
