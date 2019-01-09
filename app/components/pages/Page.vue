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
		let record = this.$cms.findRecord(this.slug);

		return {
			record
		};
	},

	mounted() {
		this.scroll = new LerpScroll(this.$el);
		// this.scroll = new LerpScroll(this.$el, (d) => { whatever() });
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.page
	height 100%

</style>