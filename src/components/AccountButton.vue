<template>
  <v-menu v-if="user" bottom left>
    <template #activator="{ on: menu }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            icon
            v-on="{ ...tooltip, ...menu }"
            class="avatar-button">
            <v-avatar color="secondary" :size="$vuetify.breakpoint.smAndDown ? 40 : 44">
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
        <v-list-item>
          <v-list-item-avatar v-if="user.photoURL">
            <img :src="user.photoURL" alt="">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.displayName"></v-list-item-title>
            <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          outlined
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
    height: fit-content !important;
    width: fit-content !important;
    margin-left: 8px !important;
    margin-right: -4px !important;
    padding: 4px !important;
  }
</style>
