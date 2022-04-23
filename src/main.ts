import { createApp } from 'vue';
import { maska } from 'maska';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './stores';

library.add(faTimes);

createApp(App)
  .use(store)
  .use(router)
  .directive('mask', maska)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
