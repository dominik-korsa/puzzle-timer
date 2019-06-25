<template>
  <v-item :value="value">
    <div slot-scope="{ active, toggle }">
      <v-divider></v-divider>
      <v-list-tile
        :class="active ? 'secondary--text' : ''"
        @click="click(active, toggle)">
        <v-list-tile-action>
          <v-icon v-if="active" color="secondary">mdi-label</v-icon>
          <v-icon v-else>mdi-label-outline</v-icon>
        </v-list-tile-action>

        <v-list-tile-title>
          <slot></slot>
        </v-list-tile-title>

        <v-list-tile-action>

        </v-list-tile-action>
      </v-list-tile>
    </div>
  </v-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    click(active, toggle) {
      if (!active) toggle();
    },
  },
};
</script>
