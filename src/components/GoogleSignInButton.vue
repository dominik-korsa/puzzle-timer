<template>
  <v-btn
    class="google-sign-in-button white--text"
    color="#4285f4"
    block
    @click="click"
  >
    <div class="google-sign-in-button__icon">
      <img src="../assets/google-sign-in-icon.svg">
    </div>
    <v-spacer />
    <v-progress-circular
      v-if="loading"
      :size="23"
      :width="2"
      indeterminate
    />
    <div
      v-else
      class="google-sing-in-button__text"
    >
      Sign in with Google
    </div>
    <v-spacer />
  </v-btn>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      click() {
        if (!this.loading) {
          this.$emit('click');
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .google-sign-in-button {
    padding: 1px !important;
    justify-content: start;

    .google-sign-in-button__icon {
      height: 18px;
      width: 18px;
      padding: 8px;
      box-sizing: content-box;
      background-color: #fff;
      border-radius: 3px;
    }

    .google-sing-in-button__text {
      margin-left: 12px;
      margin-right: 12px;
    }
  }
</style>
