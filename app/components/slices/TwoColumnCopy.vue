<template>
	<div class="two-column-copy-slice">
		<div class="wrap">

			<div class="title">
				<h2 v-if="title"
					v-html="title"/>

			</div>

			<div class="copy">
				<p v-if="copy"
					v-html="copy"/>
				<p v-if="heading"
					v-html="heading"/>
			</div>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],

	data() {
		let title = '<h2>Vision capital corporation is the manager of the vision opportunity funds...</h2>';
		return {
			title
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.two-column-copy-slice
	@extend .slice
	padding 1px 0
	+above($tablet)
		margin 0 (100% / 8)
		width (600% / 8)

	.wrap
		margin (100% / 8) auto

.title
	/deep/ h3
		@extend .heading

.copy
	display flex
	justify-content space-between
	p
		width 46%
</style>
