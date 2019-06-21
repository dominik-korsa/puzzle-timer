<template>
  <v-flex
    xs12
    md4
    lg3>
    <v-item :value="value">
      <v-card
        slot-scope="{ active, toggle }"
        :color="active ? 'secondary' : ''"
        class="d-flex align-center"
        dark
        height="85"
        @click="toggle">
        <div class="display-1 text-xs-center">
          <slot></slot>
        </div>
      </v-card>
    </v-item>
  </v-flex>
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
