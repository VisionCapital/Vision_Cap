<template>
	<div id="app">

		<sniffer/>

		<transition appear>
			<preloader v-if="!loaded"/>
		</transition>

		<transition appear>
			<router-view v-if="loaded"/>
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

</style>
