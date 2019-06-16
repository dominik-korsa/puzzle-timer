import Vue from 'vue';
import firebase from 'firebase';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
