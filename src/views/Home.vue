<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{ (user ? user.displayName : false) || '' }}
    <v-btn @click="signOut">Sign out</v-btn>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'home',
  methods: {
    async signOut() {
      await firebase.auth().signOut();
    },
  },
  data: () => ({
    user: null,
  }),
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>
