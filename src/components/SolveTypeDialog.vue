<template>
  <v-dialog
    v-model="dialogActive"
    width="800"
  >
    <v-card>
      <v-toolbar color="primary white--text">
        <v-toolbar-title>Solve type</v-toolbar-title>
      </v-toolbar>

      <v-item-group v-model="selectedType">
        <v-container grid-list-md>
          <v-subheader>2x2x2</v-subheader>
          <v-layout wrap>
            <solve-type-dialog-item value="222">
              2x2x2
            </solve-type-dialog-item>
          </v-layout>
          <v-subheader>3x3x3</v-subheader>
          <v-layout wrap>
            <solve-type-dialog-item value="333">
              3x3x3
            </solve-type-dialog-item>
            <solve-type-dialog-item value="333bf">
              3x3x3
              <div class="font-weight-thin headline">Blindfolded</div>
            </solve-type-dialog-item>
            <solve-type-dialog-item value="333oh">
              3x3x3
              <div class="font-weight-thin headline">One-Handed</div>
            </solve-type-dialog-item>
            <solve-type-dialog-item value="333ft">
              3x3x3
              <div class="font-weight-thin headline">With Feet</div>
            </solve-type-dialog-item>
          </v-layout>
          <v-subheader>4x4x4</v-subheader>
          <v-layout wrap>
            <solve-type-dialog-item value="444">
              4x4x4
            </solve-type-dialog-item>
            <solve-type-dialog-item value="444bf">
              4x4x4
              <div class="font-weight-thin headline">Blindfolded</div>
            </solve-type-dialog-item>
          </v-layout>
          <v-subheader>5x5x5</v-subheader>
          <v-layout wrap>
            <solve-type-dialog-item value="555">
              5x5x5
            </solve-type-dialog-item>
            <solve-type-dialog-item value="555bf">
              5x5x5
              <div class="font-weight-thin headline">Blindfolded</div>
            </solve-type-dialog-item>
          </v-layout>
          <v-subheader>6x6x6</v-subheader>
          <v-layout wrap>
            <solve-type-dialog-item value="666">
              6x6x6
            </solve-type-dialog-item>
          </v-layout>
          <v-subheader>7x7x7</v-subheader>
          <v-layout wrap>
            <solve-type-dialog-item value="777">
              7x7x7
            </solve-type-dialog-item>
          </v-layout>
          <v-subheader>Other</v-subheader>
          <v-layout wrap>
            <solve-type-dialog-item value="clock">
              Clock
            </solve-type-dialog-item>
            <solve-type-dialog-item value="minx">
              Megaminx
            </solve-type-dialog-item>
            <solve-type-dialog-item value="pyram">
              Pyraminx
            </solve-type-dialog-item>
            <solve-type-dialog-item value="skewb">
              Skewb
            </solve-type-dialog-item>
            <solve-type-dialog-item value="sq1">
              Square-1
            </solve-type-dialog-item>
          </v-layout>
        </v-container>
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
import SolveTypeDialogItem from './SolveTypeDialogItem.vue';

export default {
  components: {
    SolveTypeDialogItem,
  },
  data() {
    return {
      dialogActive: this.value,
      selectedType: this.type,
    };
  },
  watch: {
    selectedType(value) {
      this.$emit('update:type', value);
    },
    type(value) {
      this.selectedType = value;
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
    type: {
      type: String,
    },
  },
};
</script>
