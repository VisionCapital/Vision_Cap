import Vue from 'vue';
import Meta from 'vue-meta';

Vue.use(Meta);

import Index from '../components/Index.vue';
import Button from '../components/Button.vue';
import router from './router';
import store from './vuex-store';

Vue.component('CoreButton', Button);
import ContentPlugin from './content-plugin.js';
Vue.use(ContentPlugin);

const vue = new Vue({
	router,
	store,
	render: (h) => h(Index)
});

vue.$mount('#app');
