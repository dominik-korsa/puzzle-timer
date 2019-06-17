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
                <google-sign-in-button @click="googleSignIn"></google-sign-in-button>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import GoogleSignInButton from '../components/GoogleSignInButton.vue';

export default {
  components: {
    GoogleSignInButton,
  },
  methods: {
    async googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      try {
        await firebase.auth().signInWithPopup(provider);
      } catch (error) {
        console.warn(error);
        alert(error.message);
      }
    },
  },
};
</script>
