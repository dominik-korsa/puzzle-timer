import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        title: 'Puzzle Timer',
      },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        title: 'Login | Puzzle Timer',
      },
      // component: () => import(/* webpackChunkName: "sign-in" */ './views/SignIn.vue'),
    },
  ],
});

export default router;
