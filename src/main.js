import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

let authSynced = false;

const config = {
  apiKey: 'AIzaSyBIWGvXkfBHR4vZdje28joKVRf24vt1jGU',
  authDomain: 'translation-tool-167513.firebaseapp.com',
  databaseURL: 'https://translation-tool-167513.firebaseio.com',
  projectId: 'translation-tool-167513',
  storageBucket: 'translation-tool-167513.appspot.com',
  messagingSenderId: '693307667106',
  appId: '1:693307667106:web:aad87f743120fa8e',
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  authSynced = true;
  const { currentUser } = firebase.auth();
  const requiresAuth = router.currentRoute.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) router.replace('/sign-in');
  else if (!requiresAuth && currentUser) router.replace('/');
});

router.beforeEach((to, from, next) => {
  if (!authSynced) {
    next();
    return;
  }

  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('sign-in');
  else if (!requiresAuth && currentUser)next('/');
  else next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
