<template>
  <v-app>
    <v-layout fill-height column>
      <v-toolbar color="primary white--text">
        <v-toolbar-title>
          Puzzle Timer
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon color="white--text">
            <v-icon>mdi-settings</v-icon>
          </v-btn>
          <account-button></account-button>
        </v-toolbar-items>
      </v-toolbar>
      <v-content fill-height>
        <v-layout fill-height>
          <v-flex shrink class="sidebar" fill-height>
            <v-layout column fill-height>
              <v-flex class="px-3 py-4" shrink>
                <v-input
                  class="puzzle-type v-text-field v-text-field--enclosed v-text-field--outline"
                  prepend-icon="mdi-cube-outline"
                  @click.stop="openPuzzleTypesDialog">
                  <div class="v-text-field__slot">
                    <label
                      aria-hidden="true"
                      class="v-label v-label--active theme--light"
                      style="left: 0px; right: auto; position: absolute;">Puzzle type</label>
                    <input type="text" :value="puzzleTypeDisplayName" readonly>
                  </div>
                  <div class="v-input__append-inner">
                    <div class="v-input__icon v-input__icon--append">
                      <v-icon>mdi-menu-down</v-icon>
                    </div>
                  </div>
                </v-input>
                <v-input
                  class="solve-label v-text-field v-text-field--enclosed v-text-field--outline"
                  prepend-icon="mdi-label-outline"
                  @click.stop="openSolveLabelDialog">
                  <div class="v-text-field__slot">
                    <label
                      aria-hidden="true"
                      class="v-label v-label--active theme--light"
                      style="left: 0px; right: auto; position: absolute;">Solve label</label>
                    <input type="text" :value="puzzleTypeDisplayName" readonly>
                  </div>
                  <div class="v-input__append-inner">
                    <div class="v-input__icon v-input__icon--append">
                      <v-icon>mdi-menu-down</v-icon>
                    </div>
                  </div>
                </v-input>
              </v-flex>
              <v-divider></v-divider>
              <v-flex class="list__flex">
                <v-list class="list__v-list transparent" dense>
                  <v-fade-transition
                    group
                    leave-absolute>
                    <template v-for="element in solvesList">
                      <v-list-tile :key="element.id" class="white">
                        <v-list-tile-title class="list__time">
                          <span class="font-weight-light">{{ element.minutes }}</span>
                          <span class="font-weight-regular">:</span>
                          <span class="font-weight-regular">{{ element.seconds }}</span>
                          <span class="font-weight-regular">.</span>
                          <span class="font-weight-light">{{ element.centiseconds }}</span>
                        </v-list-tile-title>
                        <v-list-tile-action>
                          <v-layout row align-center>
                            <v-flex>
                              <v-btn-toggle
                                multiple
                                :value="element.penaltiesArray"
                                @change="solvesListUpdatePenalties(element.id, $event)"
                                class="penalties">
                                <v-btn flat color="yellow darken-4" value="+2" small>
                                  +2
                                </v-btn>
                                <v-btn flat color="red" value="dnf" small>
                                  DNF
                                </v-btn>
                              </v-btn-toggle>
                            </v-flex>
                            <v-flex class="list__delete">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    small
                                    icon
                                    color="red--text"
                                    @click.stop="openRemoveDialog(element.id)"
                                    v-on="on">
                                    <v-icon color="red">mdi-delete</v-icon>
                                  </v-btn>
                                </template>
                                <span>Remove</span>
                              </v-tooltip>
                            </v-flex>
                          </v-layout>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider :key="`${element.id}-divider`"></v-divider>
                    </template>
                  </v-fade-transition>
                </v-list>
              </v-flex>
              <v-flex shrink>
                <div class="ad">
                  300×250
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider vertical></v-divider>
          <v-flex>
            <v-layout column fill-height>
              <template v-if="scramble">
                <v-flex
                  shrink
                  class="py-4 px-5 text-xs-center headline"
                  align-self-center>
                  {{ scramble.join(' ') }}
                </v-flex>
                <v-divider></v-divider>
              </template>
              <v-flex
                class="timer-layout"
                :class="{
                  'red white--text lighten-1': startTimeoutState === 'pressed',
                  'green white--text lighten-1': startTimeoutState === 'ready',
                }"
                @click="startStop" v-ripple="startBlocked ? false : {
                  class: 'primary--text',
                }">
                <v-layout
                  align-center
                  justify-center
                  fill-height>
                  <v-flex
                    v-if="inspectionActive"
                    class="inspection-timer"
                    v-text="inspectionTimeDisplay">
                  </v-flex>
                  <v-flex class="timer" v-else>
                    <template v-if="minutes > 0">
                      <span class="minutes">{{ minutesString }}</span>
                      <span class="minutesSeparator">:</span>
                    </template>
                    <span class="seconds">{{ secondsString }}</span>
                    <span class="secondsSeparator">.</span>
                    <span class="centiseconds">{{ centisecondsString }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex shrink>
                <v-divider></v-divider>
              </v-flex>
              <v-flex
                shrink
                class="py-3"
                align-self-center>
                <v-btn-toggle multiple v-model="penaltiesArray" class="penalties">
                  <v-btn flat color="yellow darken-4" value="+2" :disabled="!endTime" outline>
                    +2
                  </v-btn>
                  <v-btn flat color="red" value="dnf" :disabled="!endTime" outline>
                    DNF
                  </v-btn>
                </v-btn-toggle>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :disabled="!endTime"
                      icon
                      color="red--text"
                      v-on="on"
                      @click.stop="openRemoveDialog(solve.id)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove</span>
                </v-tooltip>
                <v-btn
                  @click="startStop"
                  class="startStopButton"
                  outline
                  :disabled="startBlocked"
                  large
                  :color="running && !inspectionActive ? 'red' : 'green'">
                  {{ inspectionActive ? 'Start' : (running ? 'Stop' : 'Start inspection') }}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-content>
    </v-layout>
    <v-dialog v-model="removeDialog.active" :max-width="350">
      <v-card>
        <v-card-title class="headline">
          Remove solve
        </v-card-title>

        <v-card-text>
          Do you really want to remove the solve?<br>
          <span class="body-2">This action is irreversible</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-layout align-center justify-center>
            <v-icon class="mr-2">mdi-information</v-icon>
            <span class="mr-3">You can hold Shift to skip this dialog</span>
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            outline
            autofocus
            @click="removeDialog.active = false">
            Cancel
          </v-btn>
          <v-btn
            dark
            color="red"
            flat
            @click="remove(removeDialog.id)">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <puzzle-type-dialog
      v-model="puzzleTypesDialogActive"
      :type="user ? user['puzzle-type'] : null"
      @update:type="updatePuzzleType($event)">
    </puzzle-type-dialog>
    <solve-label-dialog
      v-model="solveLabelDialogActive"
      :label="user ? user['solve-label'] : null"
      @update:label="updateSolveLabel($event)">
    </solve-label-dialog>
  </v-app>
</template>

<style lang="scss">
  html {
    overflow-y: auto;
  }

  .v-content {
    height: 0;
  }

  .v-toolbar {
    z-index: 10;
  }

  .sidebar {
    min-width: fit-content;
  }

  .ad {
    // width: 300px;
    height: 250px;
    background-color: red;
    color: white;
    text-align: center;
    font-size: 24px;
    line-height: 250px;
    margin-left: auto;
    margin-right: auto;
  }

  .startStopButton {
    min-width: 192px;
  }

  .puzzle-type, .solve-label {
    .v-select__selection {
      max-width: 100%;
    }

    input {
      width: 168px !important;
    }

    .v-input__slot {
      margin: 0;

      &, * {
        cursor: pointer !important;
      }
    }

    &.solve-label .v-messages {
      display: none;
    }
  }

  .list__flex {
    overflow: auto;
  }

  .list__v-list {
    padding: 0;
  }

  .list__time {
    width: fit-content;
    flex-grow: 1;
    margin-right: 24px;
  }

  .list__delete .v-btn--icon {
    margin: 6px 8px;
  }

  .penalties.v-btn-toggle--selected {
    box-shadow: none;
  }

  .timer-layout {
    cursor: pointer;
  }

  .inspection-timer {
    font-size: 12rem;
    font-family: 'Roboto Mono', monospace;
    text-align: center;
    font-weight: 100;
  }

  .timer {
    font-size: 12rem;
    font-family: 'Roboto Mono', monospace;
    text-align: center;

    .minutes {
      font-weight: 100;
    }

    .minutesSeparator {
      font-weight: 100;
      font-family: 'Roboto', sans-serif;
    }

    .seconds {
      font-weight: 300;
    }

    .secondsSeparator {
      font-weight: 100;
      font-family: 'Roboto', sans-serif;
    }

    .centiseconds {
      font-weight: 100;
      font-size: 8rem;
    }
  }
</style>


<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Scrambo from 'scrambo';
import AccountButton from '../components/AccountButton.vue';
import PuzzleTypeDialog from '../components/PuzzleTypeDialog.vue';
import SolveLabelDialog from '../components/SolveLabelDialog.vue';

export default {
  name: 'home',
  components: {
    AccountButton,
    PuzzleTypeDialog,
    SolveLabelDialog,
  },
  data: () => ({
    inspectionTimeLeft: null,
    inspectionIntervalId: null,
    startTime: null,
    endTime: null,
    elapsedMilliseconds: 0,
    animationFrameRequestId: null,
    spaceKeyDown: null,
    puzzleTypesDialogActive: false,
    solveLabelDialogActive: false,
    user: null,
    solves: [],
    db: null,
    solve: null,
    spaceKeyDownActionDone: false,
    startTimeoutState: null,
    startTimeoutStateTimeoutId: null,
    shiftKeyDown: false,
    removeDialog: {
      active: false,
      id: null,
    },
    scramble: null,
    startBlocked: false,
  }),
  created() {
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    firebase.auth().onAuthStateChanged(this.updateFirestore);
    this.updateFirestore();
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
  },
  watch: {
    user: {
      immediate: true,
      async handler(newValue, oldValue) {
        if (!newValue) return;
        if (!newValue['puzzle-type']) {
          const { currentUser } = firebase.auth();
          if (currentUser) {
            const user = this.db.collection('users').doc(currentUser.uid);
            await user.update({
              'puzzle-type': '333',
            });
          }
        }
        if (this.running) return;
        if (!oldValue || oldValue['puzzle-type'] !== newValue['puzzle-type']) {
          this.generateScramble();
        }
      },
    },
  },
  methods: {
    generateScramble() {
      if (this.user['puzzle-type']) {
        this.scramble = new Scrambo().type(this.user['puzzle-type']).get();
      } else {
        this.scramble = null;
      }
    },
    keyDown(event) {
      if (event.code === 'Space') {
        if (this.removeDialog.active || this.puzzleTypesDialogActive) return;
        if (this.spaceKeyDown) return;
        this.spaceKeyDown = new Date();
        if (!this.running || (this.running && !this.inspectionActive)) {
          this.startStop();
          this.spaceKeyDownActionDone = true;
        } else if (this.inspectionActive) {
          this.startTimeoutState = 'pressed';
          this.startTimeoutStateTimeoutId = setTimeout(() => {
            if (this.startTimeoutState === 'pressed') {
              this.startTimeoutState = 'ready';
            }
            this.startTimeoutStateTimeoutId = null;
          }, 500);
        }
      } else if (event.key === 'Shift') {
        this.shiftKeyDown = true;
      }
    },
    keyUp(event) {
      if (event.code === 'Space') {
        if (this.removeDialog.active || this.puzzleTypesDialogActive) return;
        this.spaceKeyDown = null;
        if (this.spaceKeyDownActionDone) {
          this.spaceKeyDownActionDone = false;
          return;
        }

        if (this.inspectionActive) {
          if (this.startTimeoutState === 'ready') {
            this.start();
          } else {
            clearTimeout(this.startTimeoutStateTimeoutId);
          }
          this.startTimeoutState = null;
        }
      } else if (event.key === 'Shift') {
        this.shiftKeyDown = false;
      }
    },
    startStop() {
      if (this.running) {
        if (this.inspectionIntervalId) {
          this.start();
        } else {
          this.stop();
        }
      } else {
        this.startInspection();
      }
    },
    updatePuzzleType(type) {
      const { currentUser } = firebase.auth();
      if (!currentUser) return;
      if (!type) return;
      const user = this.db.collection('users').doc(currentUser.uid);
      user.update({
        'puzzle-type': type,
      });
    },
    updateSolveLabel(label) {
      const { currentUser } = firebase.auth();
      if (!currentUser) return;
      const user = this.db.collection('users').doc(currentUser.uid);
      user.update({
        'solve-label': label || null,
      });
    },
    startInspection() {
      if (this.startBlocked) return;
      if (this.solve) this.$unbind('solve');
      this.scramble = null;
      this.inspectionTimeLeft = 15;
      this.startTime = null;
      this.endTime = null;
      this.elapsedMilliseconds = 0;
      cancelAnimationFrame(this.animationFrameRequestId);
      this.inspectionIntervalId = setInterval(() => {
        this.inspectionTimeLeft -= 1;
        if (this.inspectionTimeLeft === 7) {
          const audio = new Audio('http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3');
          audio.play();
        } else if (this.inspectionTimeLeft === 3) {
          const audio = new Audio('http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3');
          audio.play();
        } else if (this.inspectionTimeLeft === 0) {
          const audio = new Audio('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3');
          audio.play();
        } else if (this.inspectionTimeLeft === -2) {
          const audio = new Audio('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3');
          audio.play();
        }
      }, 1000);
    },
    start() {
      if (this.solve) this.$unbind('solve');
      clearInterval(this.inspectionIntervalId);
      this.inspectionIntervalId = null;
      if (this.running) return;
      this.startTime = new Date();
      this.endTime = null;
      this.elapsedMilliseconds = 0;
      cancelAnimationFrame(this.animationFrameRequestId);
      this.animationFrameRequestId = requestAnimationFrame(this.step);
    },
    async stop() {
      if (!this.running) return;
      this.endTime = new Date();
      this.elapsedMilliseconds = this.endTime.getTime()
        - this.startTime.getTime();
      cancelAnimationFrame(this.animationFrameRequestId);
      this.animationFrameRequestId = null;

      this.generateScramble();

      this.startBlocked = true;
      setTimeout(() => {
        this.startBlocked = false;
      }, 1000);

      const { currentUser } = firebase.auth();
      const solves = this.db.collection('users').doc(currentUser.uid).collection('solves');

      this.$bind('solve', await solves.add({
        date: new Date(),
        dnf: this.isInspectionDNF,
        plus2: this.isInspectionPlus2,
        'puzzle-type': this.user['puzzle-type'],
        time: this.elapsedMilliseconds / 1000,
      }));
    },
    step() {
      if (this.startTime && !this.endTime) {
        this.elapsedMilliseconds = new Date().getTime()
          - this.startTime.getTime();
        this.animationFrameRequestId = requestAnimationFrame(this.step);
      } else if (this.startTime && this.endTime) {
        this.elapsedMilliseconds = this.endTime.getTime()
          - this.startTime.getTime();
      }
    },
    openPuzzleTypesDialog() {
      if (this.running) return;
      this.puzzleTypesDialogActive = true;
    },
    openSolveLabelDialog() {
      if (this.running) return;
      this.solveLabelDialogActive = true;
    },
    solvesListUpdatePenalties(id, value) {
      const { currentUser } = firebase.auth();
      if (!currentUser) return;
      const solve = this.db.collection('users').doc(currentUser.uid).collection('solves').doc(id);
      solve.update({
        dnf: value.indexOf('dnf') !== -1,
        plus2: value.indexOf('+2') !== -1,
      });
    },
    updateFirestore(currentUser) {
      if (!this.db) {
        this.db = firebase.firestore();
      }
      if (currentUser) {
        const users = this.db.collection('users');
        this.$bind('user', users.doc(currentUser.uid));
        this.$bind('solves', users.doc(currentUser.uid).collection('solves').orderBy('date', 'desc'));
      }
    },
    openRemoveDialog(id) {
      if (this.shiftKeyDown) {
        this.remove(id);
      } else {
        this.removeDialog.id = id;
        this.removeDialog.active = true;
      }
    },
    remove(id) {
      if (this.solve && id === this.solve.id) {
        this.$unbind('solve');
        this.startTime = null;
        this.endTime = null;
        this.elapsedMilliseconds = 0;
      }
      this.removeDialog.active = false;
      const { currentUser } = firebase.auth();
      if (!currentUser) return;
      const solve = this.db.collection('users').doc(currentUser.uid).collection('solves').doc(id);
      solve.delete();
    },
  },
  computed: {
    solvesList() {
      if (!this.solves) return [];

      return this.solves.filter(solve => solve['puzzle-type'] === this.user['puzzle-type']).map((solve) => {
        const penaltiesArray = [];
        if (solve.dnf) penaltiesArray.push('dnf');
        if (solve.plus2) penaltiesArray.push('+2');

        return {
          centiseconds: Math.floor((solve.time % 1) * 100).toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          }),
          seconds: Math.floor((solve.time % 60)).toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          }),
          minutes: Math.floor((solve.time) / 60).toLocaleString(undefined, {
            minimumIntegerDigits: 1,
          }),
          penaltiesArray,
          id: solve.id,
        };
      });
    },
    penaltiesArray: {
      get() {
        if (!this.solve) return [];
        const array = [];
        if (this.solve.dnf) array.push('dnf');
        if (this.solve.plus2) array.push('+2');
        return array;
      },
      set(penaltiesArray) {
        const { currentUser } = firebase.auth();
        if (!this.solve) return;
        if (!currentUser) return;
        const solve = this.db.collection('users').doc(currentUser.uid).collection('solves').doc(this.solve.id);
        solve.update({
          dnf: penaltiesArray.indexOf('dnf') !== -1,
          plus2: penaltiesArray.indexOf('+2') !== -1,
        });
      },
    },
    inspectionTimeDisplay() {
      if (this.isInspectionDNF) {
        return 'DNF';
      } if (this.isInspectionPlus2) {
        return '+2';
      }
      return this.inspectionTimeLeft.toString();
    },
    isInspectionPlus2() {
      return this.inspectionTimeLeft <= 0 && this.inspectionTimeLeft > -2;
    },
    isInspectionDNF() {
      return this.inspectionTimeLeft <= -2;
    },
    puzzleTypeDisplayName() {
      if (!this.user || !this.user['puzzle-type']) {
        return '';
      }
      switch (this.user['puzzle-type']) {
        case '222':
          return '2x2x2';
        case '333':
          return '3x3x3';
        case '444':
          return '4x4x4';
        case '555':
          return '5x5x5';
        case '666':
          return '6x6x6';
        case '777':
          return '7x7x7';
        case 'clock':
          return 'Clock';
        case 'minx':
          return 'Megaminx';
        case 'pyram':
          return 'Pyraminx';
        case 'skewb':
          return 'Skewb';
        case 'sq1':
          return 'Square-1';
        default:
          return this.user['puzzle-type'];
      }
    },
    inspectionActive() {
      return !!this.inspectionIntervalId;
    },
    running() {
      return (!!this.startTime || !!this.inspectionIntervalId) && !this.endTime;
    },
    centiseconds() {
      return Math.floor((this.elapsedMilliseconds % 1000) / 10);
    },
    centisecondsString() {
      return this.centiseconds.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      });
    },
    seconds() {
      return Math.floor((this.elapsedMilliseconds % 60000) / 1000);
    },
    secondsString() {
      return this.seconds.toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      });
    },
    minutes() {
      return Math.floor((this.elapsedMilliseconds) / 60000);
    },
    minutesString() {
      return this.minutes.toLocaleString(undefined, {
        minimumIntegerDigits: 1,
      });
    },
  },
};
</script>
