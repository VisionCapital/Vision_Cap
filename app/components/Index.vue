<template>
	<div id="app">

		<sniffer/>

		<transition appear mode="out-in">
			<preloader v-if="!loaded"/>
			<router-view v-else-if="loaded"/>
		</transition>

	</div>
</template>

<script>

import Sniffer from './Sniffer.vue';
import Preloader from './Preloader.vue';

export default {

	metaInfo() {
		return {
			titleTemplate: '%s / Vision Capital',
			title: 'Welcome'
		};
	},

	components: {
		Sniffer,
		Preloader
	},

	data() {
		return { loaded: false };
	},

	mounted() {
		this.$contentPlugin.preload().then(() => { this.loaded = true; });
	}

};

</script>

<style lang="stylus">

@import "../styl/main"

#app
	background linear-gradient(142deg, #011254, #00022e)

</style>
