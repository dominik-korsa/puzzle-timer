<template>
  <v-dialog
    v-model="dialogActive"
    width="800"
  >
    <v-card>
      <v-toolbar color="primary white--text">
        <v-toolbar-title>Puzzle type</v-toolbar-title>
      </v-toolbar>

      <v-item-group
        v-model="selectedType"
        mandatory
      >
        <v-container grid-list-md>
          <v-subheader>Cubes</v-subheader>
          <v-layout wrap>
            <puzzle-type-dialog-item value="222">
              2x2x2
            </puzzle-type-dialog-item>
            <puzzle-type-dialog-item value="333">
              3x3x3
            </puzzle-type-dialog-item>
            <puzzle-type-dialog-item value="444">
              4x4x4
            </puzzle-type-dialog-item>

            <puzzle-type-dialog-item value="555">
              5x5x5
            </puzzle-type-dialog-item>

            <puzzle-type-dialog-item value="666">
              6x6x6
            </puzzle-type-dialog-item>

            <puzzle-type-dialog-item value="777">
              7x7x7
            </puzzle-type-dialog-item>
          </v-layout>
          <v-subheader>Other</v-subheader>
          <v-layout wrap>
            <puzzle-type-dialog-item value="clock">
              Clock
            </puzzle-type-dialog-item>
            <puzzle-type-dialog-item value="minx">
              Megaminx
            </puzzle-type-dialog-item>
            <puzzle-type-dialog-item value="pyram">
              Pyraminx
            </puzzle-type-dialog-item>
            <puzzle-type-dialog-item value="skewb">
              Skewb
            </puzzle-type-dialog-item>
            <puzzle-type-dialog-item value="sq1">
              Square-1
            </puzzle-type-dialog-item>
          </v-layout>
        </v-container>
      </v-item-group>

      <v-divider />

      <v-card-actions>
        <v-spacer />
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
  import PuzzleTypeDialogItem from './PuzzleTypeDialogItem.vue';

  export default {
    components: {
      PuzzleTypeDialogItem,
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: null,
      },
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
  };
</script>
