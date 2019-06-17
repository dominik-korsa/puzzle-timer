<template>
  <v-app>
    <v-content>
    <v-toolbar color="primary white--text">
      <v-toolbar-title>
        Puzzle timer
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <account-button></account-button>
      </v-toolbar-items>
    </v-toolbar>
    </v-content>
  </v-app>
</template>

<script>
import AccountButton from '../components/AccountButton.vue';

export default {
  name: 'home',
  components: {
    AccountButton,
  },
};
</script>
