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
  </v-app>
</template>

<style lang="scss" scoped>
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
import AccountButton from '../components/AccountButton.vue';

export default {
  name: 'home',
  components: {
    AccountButton,
  },
  data: () => ({
    startTime: null,
    endTime: null,
    elapsedMilliseconds: 0,
    animationFrameRequestId: null,
    spaceKeyDown: null,
  }),
  created() {
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
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
  },
  computed: {
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
