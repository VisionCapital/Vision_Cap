<template>
	<div class="home">
		<transition appear v-for="(module, idx) in modules"
			:key="idx">
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
import airtable from '../../mixins/airtable.js';

export default {

	props: [ 'slug' ],

	mixins: [
		slices,
		airtable
	],

	data() {
		return {
			name: 'Home'
		};
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.home
	height 100%

</style>
