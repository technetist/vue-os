import Vue from 'vue';
import VueRouter from 'vue-router';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import store from './store';
import App from './App.vue';
import LandingPage from './components/landing-page.vue';
import About from './components/about.vue';
import Authentication from './components/auth/authentication.vue';
import Desktop from './components/desktop.vue';
import Foo from './components/foo.vue';
import Passwordless from './components/auth/passwordless.vue';
import { auth } from './firebase';

import './styles/app.css';

Vue.config.productionTip = false;
Vue.config.errorHandler = (msg, vm, info) => {
  console.error(`${info}: ${msg}`);
};

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new VueIntegration({
      Vue,
      attachProps: true,
    }),
  ],
  environment: process.env.VUE_APP_ENV,
});

auth.onAuthStateChanged((user) => {
    store.dispatch('fetchUser', user);
  });

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: LandingPage,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/auth',
      name: 'Authentication',
      component: Authentication,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/auth/passwordless',
      name: 'Passwordless',
      component: Passwordless,
    },
    {
      path: '/desktop',
      name: 'Desktop',
      component: Desktop,
      meta: {
        noNav: true,
        requiresAuth: true,
      },
    },
    {
      path: '/foo',
      name: 'Foo',
      component: Foo,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = auth;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);
  if (requiresAuth && !currentUser) next('auth');
  else if (guestOnly && currentUser) next(from);
  else next();
});

let app = '';
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
