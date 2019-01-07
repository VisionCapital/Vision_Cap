<template>
	<div class="page"><div>
		<transition appear v-for="module in record.getModules()"
			:key="module.id">
			<component :is="module.component"
				:page="record"
				:data="module"/>
		</transition>
		<page-footer/>
	</div></div>
</template>

<script>

import slices from '../../mixins/slices.js';
import LerpScroll from '../../js/lerp-scroll.js';

export default {

	props: [ 'slug' ],

	mixins: [ slices ],

	data() {

		// let slugger = this.slug === 'home' ? '/' : '/' + this.slug + '/';
		// let record = this.$cms.records.find((r) => r.get('url structure') === slugger);

		let record = this.$cms.findRecord(this.slug);

		return {
			record
		};
	},
	mounted() {
		this.scroll = new LerpScroll(this.$el);
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.page
	height 100%

</style>