<template>
  <v-btn
    @click="$emit('click', $event)"
    class="google-sign-in-button"
    color="#4285f4"
    block>
    <div class="google-sign-in-button__icon">
      <img src="../assets/google-sign-in-icon.svg">
    </div>
    <v-spacer></v-spacer>
    <div class="google-sing-in-button__text">
      Sign in with Google
    </div>
    <v-spacer></v-spacer>
  </v-btn>
</template>

<style lang="scss" scoped>
  .google-sign-in-button {
    padding: 1px;

    .google-sign-in-button__icon {
      height: 18px;
      width: 18px;
      padding: 8px;
      box-sizing: content-box;
      background-color: #fff;
      border-radius: 1px;
    }

    .google-sing-in-button__text {
      margin-left: 12px;
      margin-right: 12px;
      color: #fff;
    }
  }
</style>
