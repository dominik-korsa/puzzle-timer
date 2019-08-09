<template>
  <div>
    <v-dialog
      v-model="dialogActive"
      width="400"
    >
      <v-card>
        <v-toolbar color="primary darken-1 white--text">
          <v-toolbar-title>Solve label</v-toolbar-title>
          <v-spacer />
          <v-scale-transition>
            <v-btn
              v-if="label !== null && renamedLabel === null"
              icon
              dark
              @click="startRenaming"
            >
              <v-icon>mdi-rename-box</v-icon>
            </v-btn>
          </v-scale-transition>
          <v-scale-transition>
            <v-btn
              v-if="label !== null && renamedLabel === null"
              icon
              dark
              @click="remove"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-scale-transition>
        </v-toolbar>

        <v-list class="pb-0">
          <v-list-item-group
            :value="label || 'normal'"
            mandatory
            color="primary"
            @change="selectedLabelChange"
          >
            <solve-label-dialog-item value="normal">
              Normal
            </solve-label-dialog-item>
            <solve-label-dialog-item
              v-for="item in labels"
              :key="item.id"
              :value="item.id"
              :renaming="renamedLabel === item.id"
              @rename="rename"
            >
              {{ item.name }}
            </solve-label-dialog-item>
          </v-list-item-group>

          <v-divider />

          <v-form @submit.prevent="addLabelSubmit">
            <v-list-item
              color="secondary"
              class="add-label v-list-item--active"
              :ripple="false"
              inactive
              @click="addLabelClick"
              @keydown.stop
              @keyup.stop
            >
              <v-list-item-action>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-action>

              <v-list-item-title class="black--text">
                <input
                  v-model="newLabel"
                  class="add-label__input"
                  placeholder="New label"
                >
              </v-list-item-title>

              <v-list-item-action
                v-if="newLabel.length > 0"
                class="add-label__button-action"
              >
                <v-btn
                  type="submit"
                  text
                  color="secondary"
                  @click.stop
                >
                  Add
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-form>
        </v-list>

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
      <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        color="error"
      >
        You can't remove a label if there are solves assigned to it
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app';
  import 'firebase/firestore';
  import SolveLabelDialogItem from './SolveLabelDialogItem.vue';

  export default {
    components: {
      SolveLabelDialogItem,
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: null,
      },
      puzzleType: {
        type: String,
        default: null,
      },
      labels: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        dialogActive: this.value,
        newLabel: '',
        renamedLabel: null,
        snackbar: false,
      };
    },
    watch: {
      dialogActive(value) {
        this.$emit('input', value);
      },
      value(value) {
        this.dialogActive = value;
        if (!value) {
          this.renamedLabel = null;
        }
      },
    },
    methods: {
      addLabelClick() {
        document.getElementsByClassName('add-label__input')[0].focus();
      },
      rename(value) {
        const { currentUser } = firebase.auth();

        if (!currentUser) return;

        const label = firebase.firestore().collection('users')
          .doc(currentUser.uid).collection('solve-labels')
          .doc(this.renamedLabel);
        label.update({ name: value });
        this.renamedLabel = null;
      },
      async remove() {
        const { currentUser } = firebase.auth();

        if (!currentUser) return;

        const solves = await firebase.firestore().collection('users')
          .doc(currentUser.uid).collection('solves')
          .where('label', '==', this.label)
          .get();

        if (solves.size > 0) {
          this.snackbar = true;
          return;
        }

        const label = firebase.firestore().collection('users')
          .doc(currentUser.uid).collection('solve-labels')
          .doc(this.label);

        this.selectedLabelChange('normal');

        label.delete();
      },
      startRenaming() {
        this.renamedLabel = this.label;
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
        if (value !== undefined && value !== this.label) {
          this.renamedLabel = null;
        }

        if (value === 'normal') {
          this.$emit('update:label', null);
        } else {
          this.$emit('update:label', value);
        }
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
