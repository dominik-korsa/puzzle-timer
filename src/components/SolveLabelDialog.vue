<template>
  <v-dialog
    v-model="dialogActive"
    width="400"
  >
    <v-card>
      <v-toolbar color="primary white--text">
        <v-toolbar-title>Solve label</v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-list-item-group
          :value="label || 'normal'"
          @change="selectedLabelChange"
          mandatory color="secondary">
          <solve-label-dialog-item value="normal">
            Normal
          </solve-label-dialog-item>
          <solve-label-dialog-item :value="label.id" v-for="label in labels" :key="label.id">
            {{ label.name }}
          </solve-label-dialog-item>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          text
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
    };
  },
  methods: {
    selectedLabelChange(value) {
      if (value === 'normal') {
        this.$emit('update:label', null);
      } else {
        this.$emit('update:label', value);
      }
    },
  },
  watch: {
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
    labels: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
