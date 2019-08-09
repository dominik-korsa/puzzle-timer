<template>
  <v-form
    v-if="renaming"
    @submit.prevent="renameSubmit"
  >
    <v-list-item
      color="secondary"
      class="rename"
      :value="value"
      :ripple="false"
      @keydown.stop
      @keyup.stop
    >
      <v-list-item-action>
        <v-icon>mdi-rename-box</v-icon>
      </v-list-item-action>

      <v-list-item-title class="black--text">
        <input
          ref="input"
          v-model="newName"
          class="rename__input"
          placeholder="New label"
        >
      </v-list-item-title>

      <v-list-item-action
        v-if="newName.length > 0"
        class="rename__button-action"
      >
        <v-btn
          type="submit"
          text
          color="secondary"
          @click.stop
        >
          Rename
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-form>
  <v-list-item
    v-else
    v-slot:default="{ active, toggle }"
    :value="value"
  >
    <template>
      <v-list-item-action>
        <v-icon v-if="active">
          mdi-label
        </v-icon>
        <v-icon v-else>
          mdi-label-outline
        </v-icon>
      </v-list-item-action>
    </template>

    <v-list-item-title>
      <slot />
    </v-list-item-title>
  </v-list-item>
</template>

<script>
  import { setTimeout } from 'timers';

  export default {
    props: {
      renaming: {
        default: false,
        type: Boolean,
      },
      value: {
        type: String,
        default: null,
      },
    },
    data: () => ({
      newName: '',
    }),
    watch: {
      renaming: {
        immediate: true,
        handler(value) {
          if (value) {
            this.newName = this.$slots.default[0].text.trim();
            setTimeout(() => {
              this.$refs.input.select();
            }, 0);
          }
        },
      },
    },
    methods: {
      renameSubmit() {
        if (!this.newName) return;
        this.$emit('rename', this.newName);
        this.newName = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .rename {
    cursor: pointer;
  }

  .rename__button-action {
    min-width: auto;
    margin: 0px;
    margin-left: 16px;
  }

  .rename__input {
    outline: none;

    &:focus::placeholder {
      color: transparent;
    }
  }
</style>
