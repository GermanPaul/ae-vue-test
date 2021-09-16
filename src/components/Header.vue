<template>
  <b-navbar class="is-info">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <span class="icon mr-1">
          <i class="fas fa-home"></i>
        </span>
        <span>Home</span>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            class="button is-info"
            @click="updateLogin()"
          >
            <strong>{{ loginLabel }}</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState([
      'logged',
    ]),
    loginLabel() {
      return this.logged ? 'Logout' : 'Login';
    },
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'login',
    ]),
    updateLogin() {
      this.login();
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
