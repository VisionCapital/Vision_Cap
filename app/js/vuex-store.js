import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

	state: {
		back: '/',
		device: {},
		transition: 'v',
		navOpen: false,
		navData: {}
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
			console.log('store');
			context.commit('setNavData', data);
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
			console.log('store');
			Vue.set(state, 'navData', data);
		}
	}

});

export default store;
