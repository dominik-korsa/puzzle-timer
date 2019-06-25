<template>
  <v-dialog
    v-model="dialogActive"
    width="400"
  >
    <v-card>
      <v-toolbar color="primary white--text">
        <v-toolbar-title>Solve label</v-toolbar-title>
      </v-toolbar>

      <v-item-group v-model="selectedLabel">
        <v-list class="mt-3 py-0" subheader>
          <v-divider></v-divider>
          <v-list-tile
            :class="selectedLabel ? '' : 'secondary--text'"
            @click="selectedLabel = null">
            <v-list-tile-action>
              <v-icon v-if="!selectedLabel" color="secondary">mdi-label</v-icon>
              <v-icon v-else>mdi-label-outline</v-icon>
            </v-list-tile-action>

            <v-list-tile-title>
              Normal
            </v-list-tile-title>
          </v-list-tile>
          <solve-label-dialog-item value="xYN31rkBBi0mbpfiqNnW">
            Blindfolded
          </solve-label-dialog-item>
          <solve-label-dialog-item value="xYN31rkBBi0mbpfiqNnW++">
            Blindfolded
          </solve-label-dialog-item>
        </v-list>
      </v-item-group>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          flat
          @click="dialogActive = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SolveLabelDialogItem from './SolveLabelDialogItem.vue';

export default {
  components: {
    SolveLabelDialogItem,
  },
  data() {
    return {
      dialogActive: this.value,
      selectedLabel: this.label,
    };
  },
  watch: {
    selectedLabel(value) {
      this.$emit('update:label', value);
    },
    label(value) {
      this.selectedLabel = value;
    },
    dialogActive(value) {
      this.$emit('input', value);
    },
    value(value) {
      this.dialogActive = value;
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
};
</script>
