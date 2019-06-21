<template>
  <v-app>
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
    <v-content>
      <v-layout fill-height>
        <v-flex shrink class="sidebar">
          <v-layout column>
            <v-flex class="pa-4">
              <v-input
                class="solve-type v-text-field v-text-field--enclosed v-text-field--outline"
                prepend-icon="mdi-cube-outline"
                @click="solveTypesDialogActive = true">
                <div class="v-text-field__slot">
                  <label
                    aria-hidden="true"
                    class="v-label v-label--active theme--light"
                    style="left: 0px; right: auto; position: absolute;">Solve type</label>
                  <input type="text" :value="solveTypeDisplayName" readonly>
                </div>
                <div class="v-input__append-inner">
                  <div class="v-input__icon v-input__icon--append">
                    <v-icon>mdi-menu-down</v-icon>
                  </div>
                </div>
              </v-input>
            </v-flex>
            <v-divider></v-divider>
            <v-flex>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="list__time">
                    <span class="font-weight-light">{{ minutesString }}</span>
                    <span class="font-weight-regular">:</span>
                    <span class="font-weight-regular">{{ secondsString }}</span>
                    <span class="font-weight-regular">.</span>
                    <span class="font-weight-light">{{ centisecondsString }}</span>
                  </v-list-tile-title>
                  <v-list-tile-action>
                    <v-layout row align-center>
                      <v-flex>
                        <v-btn-toggle multiple v-model="penaltiesArray" class="penalties">
                          <v-btn flat color="yellow darken-4" value="+2" :disabled="!endTime">
                            +2
                          </v-btn>
                          <v-btn flat color="red" value="dnf" :disabled="!endTime">
                            DNF
                          </v-btn>
                        </v-btn-toggle>
                      </v-flex>
                      <v-flex class="list__delete">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              :disabled="!endTime"
                              icon
                              color="red--text"
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
              </v-list>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex>
          <v-layout column fill-height>
            <v-flex
              class="timer-layout"
              @click="startStop" v-ripple="{
                class: 'primary--text',
              }">
              <v-layout
                align-center
                justify-center
                fill-height>
                <v-flex class="timer">
                  <span class="minutes">{{ minutesString }}</span>
                  <span class="minutesSeparator">:</span>
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
              :class="{
                'py-4': $vuetify.breakpoint.smAndDown,
                'py-5': $vuetify.breakpoint.mdAndUp,
              }"
              align-self-center>
              <v-btn-toggle multiple v-model="penaltiesArray" class="penalties">
                <v-btn flat color="yellow darken-4" value="+2" :disabled="!endTime">
                  +2
                </v-btn>
                <v-btn flat color="red" value="dnf" :disabled="!endTime">
                  DNF
                </v-btn>
              </v-btn-toggle>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                   <v-btn
                    :disabled="!endTime"
                    icon
                    color="red--text"
                    v-on="on">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Remove</span>
              </v-tooltip>
              <v-btn
                @click="startStop"
                outline
                :color="running ? 'red' : 'green'">
                {{ running ? 'Stop' : 'Start' }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-content>
    <solve-type-dialog v-model="solveTypesDialogActive" :type.sync="solveType"></solve-type-dialog>
  </v-app>
</template>

<style lang="scss">
  .v-toolbar {
    z-index: 10;
  }

  .sidebar {
    min-width: 256px;
  }

  .solve-type {
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

    .v-messages {
      display: none;
    }
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

  .timer {
    font-size: 16rem;
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
      font-size: 12rem;
    }
  }
</style>


<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import AccountButton from '../components/AccountButton.vue';
import SolveTypeDialog from '../components/SolveTypeDialog.vue';

export default {
  name: 'home',
  components: {
    AccountButton,
    SolveTypeDialog,
  },
  data: () => ({
    penaltiesArray: [],
    startTime: null,
    endTime: null,
    elapsedMilliseconds: 0,
    animationFrameRequestId: null,
    spaceKeyDown: null,
    solveType: '333',
    solveTypesDialogActive: false,
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
  methods: {
    keyDown(event) {
      if (event.code === 'Space') {
        if (this.spaceKeyDown) return;
        this.spaceKeyDown = new Date();
        this.startStop();
      }
    },
    keyUp(event) {
      if (event.code === 'Space') {
        this.spaceKeyDown = null;
      }
    },
    startStop() {
      if (this.running) {
        this.stop();
      } else {
        this.start();
      }
    },
    start() {
      if (this.running) return;
      this.penaltiesArray = [];
      this.startTime = new Date();
      this.endTime = null;
      this.elapsedMilliseconds = 0;
      cancelAnimationFrame(this.animationFrameRequestId);
      this.animationFrameRequestId = requestAnimationFrame(this.step);
    },
    stop() {
      if (!this.running) return;
      this.endTime = new Date();
      this.elapsedMilliseconds = this.endTime.getTime()
        - this.startTime.getTime();
      cancelAnimationFrame(this.animationFrameRequestId);
      this.animationFrameRequestId = null;
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
    updateFirestore(currentUser) {
      if (currentUser) {
        this.$bind('solveTypes', firebase.firestore().collection('users').doc(currentUser.uid).collection('solve-types'));
        console.log(firebase.firestore().collection('users').doc(currentUser.uid).collection('solve-types')
          .path);
        console.log(firebase.firestore().collection('users').doc(currentUser.uid).collection('solve-types')
          .get());
      }
    },
  },
  computed: {
    solveTypeDisplayName() {
      switch (this.solveType) {
        case '222':
          return '2x2x2';
        case '333':
          return '3x3x3';
        case '333bf':
          return '3x3x3 Blindfolded';
        case '333oh':
          return '3x3x3 One-Handed';
        case '333ft':
          return '3x3x3 With Feet';
        case '444':
          return '4x4x4';
        case '444bf':
          return '4x4x4 Bindfolded';
        case '555':
          return '5x5x5';
        case '555bf':
          return '5x5x5 Blindfolded';
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
          return this.solveType;
      }
    },
    running() {
      return !!this.startTime && !this.endTime;
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
