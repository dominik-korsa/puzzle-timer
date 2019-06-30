<template>
  <v-dialog
    v-model="dialogActive"
    width="400"
  >
    <v-card>
      <v-toolbar color="primary white--text">
        <v-toolbar-title>Solve label</v-toolbar-title>
      </v-toolbar>

      <v-list class="pb-0">
        <v-list-item-group
          :value="label || 'normal'"
          @change="selectedLabelChange"
          mandatory color="primary">
          <solve-label-dialog-item value="normal">
            Normal
          </solve-label-dialog-item>
          <solve-label-dialog-item :value="label.id" v-for="label in labels" :key="label.id">
            {{ label.name }}
          </solve-label-dialog-item>
        </v-list-item-group>

        <v-divider></v-divider>

        <v-form @submit.prevent="addLabelSubmit">
          <v-list-item
            color="secondary"
            class="add-label v-list-item--active"
            @click="addLabelClick"
            :ripple="false"
            inactive
            @keydown.stop
            @keyup.stop>
            <v-list-item-action>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-action>

            <v-list-item-title class="black--text">
              <input class="add-label__input" placeholder="New label" v-model="newLabel">
            </v-list-item-title>

            <v-list-item-action class="add-label__button-action" v-if="newLabel.length > 0">
              <v-btn type="submit" text color="secondary" @click.stop>Add</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-form>
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
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import SolveLabelDialogItem from './SolveLabelDialogItem.vue';

export default {
  components: {
    SolveLabelDialogItem,
  },
  data() {
    return {
      dialogActive: this.value,
      newLabel: '',
    };
  },
  methods: {
    addLabelClick() {
      document.getElementsByClassName('add-label__input')[0].focus();
    },
    async addLabelSubmit() {
      if (this.newLabel.length === 0) return;
      if (!this.puzzleType) return;

      const { currentUser } = firebase.auth();

      if (!currentUser) return;

      const solveLabels = firebase.firestore().collection('users').doc(currentUser.uid).collection('solve-labels');

      const { id } = await solveLabels.add({
        name: this.newLabel,
        'puzzle-type': this.puzzleType,
        created: new Date(),
      });

      this.$emit('update:label', id);
      this.newLabel = '';
    },
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
    puzzleType: {
      type: String,
    },
    labels: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
  .add-label {
    cursor: pointer;
  }

  .add-label__button-action {
    min-width: auto;
    margin: 0px;
    margin-left: 16px;
  }

  .add-label__input {
    outline: none;

    &::placeholder {
      color: var(--v-secondary-base);
    }

    &:focus::placeholder {
      color: transparent;
    }
  }
</style>
