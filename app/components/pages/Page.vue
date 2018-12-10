<template>
	<div class="page">
		<transition appear v-for="module in record.getModules()"
			:key="module.id">
			<component :is="moduleComponent(module.component)"
				:componentName="module.component"
				:heading="module.heading"
				:subheading="module.subheading"
				:copy="module.copy"
				:image="module.image"
				:notes="module.notes"/>
		</transition>
	</div>
</template>

<script>

import slices from '../../mixins/slices.js';

export default {
	props: [ 'slug' ],
	mixins: [ slices ],

	data() {

		let name = this.slug.charAt(0).toUpperCase() + this.slug.slice(1);
		let slugger = '/' + this.slug + '/';
		let record = this.$cms.records.find((r) => r.get('url structure') === slugger);

		return {
			name,
			slugger,
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