<template>
	<div class="no-slice">
		<div class="wrap">
			<h5 v-html="componentName"/>
			<h2 v-if="heading"
				v-html="heading"/>
			<h3 v-if="subheading"
				v-html="subheading"/>
			<p v-if="copy"
				v-html="copy"/>
			<div v-if="image"
				v-html="image"/>
			<div v-if="notes"
				class="notes"
				v-html="notes"/>
		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ]
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.no-slice
	@extend $slice

h5
	font-size 1rem
	letter-spacing .1em
	text-transform uppercase

h2,h3,p,
.notes
	opacity 0.5

</style>