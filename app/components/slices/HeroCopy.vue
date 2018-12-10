<template>
	<div class="hero-copy">
		<div class="wrap">

			<div class="title">
				<h2 v-if="heading"
					v-html="heading"/>
				<h3 v-if="subheading"
					v-html="subheading"/>
			</div>

			<div class="copy">
				<p v-if="copy"
					v-html="copy"/>
			</div>

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

.hero-copy
	@extend .slice
	padding 1px 0

	.wrap
		margin (100% / 8) auto

.title
	/deep/ h3
		@extend .heading

	+above($tablet)
		margin 0 (100% / 8) 0 (200% / 8)
		width (500% / 8)

.copy
	+above($tablet)
		margin 0 (100% / 8)
		width (600% / 8)

</style>
