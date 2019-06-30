<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary white--text">
                <v-toolbar-title>Sign in</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-layout column>
                  <v-flex align-self-center>
                    <img alt="Vue logo" src="../assets/logo.png">
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <google-sign-in-button
                  @click="googleSignIn"
                  :loading="googleLoading > 0">
                </google-sign-in-button>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        text
        @click="snackbar.active = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import GoogleSignInButton from '../components/GoogleSignInButton.vue';

export default {
  components: {
    GoogleSignInButton,
  },
  data() {
    return {
      googleLoading: 0,
      snackbar: {
        active: false,
        color: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar',
      },
    };
  },
  methods: {
    generateGoogleErrorMessage(error) {
      if (error.code === 'auth/popup-closed-by-user') return 'The sign in popup has been closed';
      if (error.code === 'auth/cancelled-popup-request') return 'Popup already opened';
      return error.message;
    },
    async googleSignIn() {
      this.googleLoading += 1;
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      try {
        const currentUser = (await firebase.auth().signInWithPopup(provider)).user;
        firebase.firestore().collection('users').doc(currentUser.uid).set({});
      } catch (error) {
        console.warn(error);
        this.snackbar.text = this.generateGoogleErrorMessage(error);
        this.snackbar.color = 'error';
        this.snackbar.timeout = 6000;
        this.snackbar.active = true;
      }

      this.googleLoading -= 1;
    },
  },
};
</script>
