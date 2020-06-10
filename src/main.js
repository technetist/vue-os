import Vue from 'vue';
import VueRouter from 'vue-router';
import * as firebase from 'firebase';
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

const configOptions = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(configOptions);

firebase.auth()
  .onAuthStateChanged((user) => {
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
    },
    {
      path: '/foo',
      name: 'Foo',
      component: Foo,
    },
  ],
});

new Vue({
  render: (h) => h(App),
  store,
  router,
  components: { App },
}).$mount('#app');
