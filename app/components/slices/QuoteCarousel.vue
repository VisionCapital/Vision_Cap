<template>
	<div class="quote-carousel">
		<h2 v-if="heading"
			v-html="heading"/>
		<h3 v-if="subheading"
			v-html="subheading"/>
		<p v-if="copy"
			v-html="copy"/>
		<div v-if="image"
			v-html="image"/>
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

.quote-carousel
	pad(4,4)
	text-align center

</style>
