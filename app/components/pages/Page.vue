<template>
	<div class="page">
		<transition appear v-for="module in record.getModules()"
			:key="module.id">
			<component :is="module.component"
				:page="record"
				:data="module"/>
		</transition>
		<page-footer/>
	</div>
</template>

<script>

import slices from '../../mixins/slices.js';

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
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.page
	height 100%

</style>