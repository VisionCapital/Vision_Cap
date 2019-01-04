<template>
	<div class="two-column-copy-slice">
		<div class="wrap">

			<div class="title" 
				v-if="title"
				v-html="title">
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
		let title = '<h3>Vision capital corporation is the manager of the vision opportunity funds...</h3>';
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
	pad(2,0)

.title
	/deep/ h3
		font-family $cormorant-semibold
		+below($tablet)
			font-family $cormorant-medium

		// @extend .heading

.copy
	display flex
	justify-content space-between
	+below($tablet)
		flex-direction column
	p
		+above($tablet)
			width 46%
		
</style>
