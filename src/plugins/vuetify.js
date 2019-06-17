import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

// https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=FFC107&secondary.color=03A9F4

Vue.use(Vuetify, {
  theme: {
    primary: '#ffc107',
    secondary: '#03a9f4',
    // accent: '#82B1FF',
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107',
  },
  iconfont: 'mdi',
});
