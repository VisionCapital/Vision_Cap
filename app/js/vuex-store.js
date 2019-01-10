import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

	state: {
		back: '/',
		device: {},
		transition: 'v',
		navOpen: false,
		navData: {},
		resourceTags: {}
	},

	actions: {
		updateDevice(context, device) {
			context.commit('updateDevice', device);
		},

		setTransition(context, type) {
			context.commit('setTransition', type);
		},

		setBack(context, route) {
			context.commit('setBack', route);
		},

		toggleNav(context) {
			context.commit('toggleNav');
		},

		setNavData(context, data) {
			context.commit('setNavData', data);
		},

		setResourceTags(context, tags) {
			context.commit('setResourceTags', tags);
		}
	},

	mutations: {
		updateDevice(state, device) {
			Vue.set(state, 'device', device);
		},

		setTransition(state, type) {
			Vue.set(state, 'transition', type);
		},

		setBack(state, route) {
			Vue.set(state, 'back', route);
		},

		toggleNav(state) {
			Vue.set(state, 'navOpen', !state.navOpen);
		},

		setNavData(state, data) {
			Vue.set(state, 'navData', data);
		},

		setResourceTags(state, tags) {
			Vue.set(state, 'resourceTags', tags);
		}
	}

});

export default store;
