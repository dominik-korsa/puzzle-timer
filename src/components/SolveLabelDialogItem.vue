<template>
  <v-list-item
    :value="value"
    v-slot:default="{ active, toggle }">
    <template>
      <v-list-item-action>
        <v-icon v-if="active">mdi-label</v-icon>
        <v-icon v-else>mdi-label-outline</v-icon>
      </v-list-item-action>
    </template>

    <v-list-item-title>
      <slot></slot>
    </v-list-item-title>

    <v-list-item-action>

    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
};
</script>
