<template>
	<div class="careers">
		<h1>Careers</h1>
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
	mixins: [
		slices,
		airtable
	],

	data() {
		return {
			name: 'Careers'
		};
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.careers
	height 100%

</style>
