<template>
  <v-menu v-if="user" bottom left>
    <template #activator="{ on: menu }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            flat
            v-on="{ ...tooltip, ...menu }"
            class="avatar-button">
            <v-avatar color="secondary" :size="$vuetify.breakpoint.smAndDown ? 40 : 48">
              <img
                v-if="user.photoURL"
                :src="user.photoURL">
              <span
                v-else
                class="headline white--text"
                v-text="user.displayName.charAt(0).toUpperCase()"
              ></span>
            </v-avatar>
          </v-btn>
          </template>
        <span v-text="user.displayName"></span>
      </v-tooltip>
    </template>
    <v-card>
      <v-list>
        <v-list-tile :avatar="!!user.photoURL">
          <v-list-tile-avatar v-if="user.photoURL">
            <img :src="user.photoURL" alt="">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="user.displayName"></v-list-tile-title>
            <v-list-tile-sub-title v-text="user.email"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          outline
          color="secondary"
          @click="signOut"
          block>
          Sign out
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
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

<style lang="scss" scoped>
  .avatar-button {
    padding: 0 8px;
    min-width: 0;
  }
</style>
