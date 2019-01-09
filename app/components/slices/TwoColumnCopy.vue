<template>
	<div class="two-column-copy">
		<div class="wrap">

			<div class="title" v-if="data.fields.module_title.length">
				<h2 v-html="data.text('module_title')"/>
			</div>

			<div v-else-if="title"
				class="title"
				v-html="title">
			</div>

			<div v-if="data.fields.column_copy.length"
				v-html="data.html('column_copy')"
				class="copy"/>

			<div v-else-if="copy"
				class="copy">
				<p v-if="copy"
					v-html="copy"/>
				<p v-if="heading"
					v-html="heading"/>
			</div>
<image-row></image-row>

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
	

.two-column-copy
	@extend .slice
	pad(2,0)

.title
	width relative
	text-align left

	+above($tablet)
		pad(0,3)

	/deep/
		h2, h3
			fs(44)
			font-family $cormorant-semibold
			max-width 100%

			+below($tablet)
				font-family $cormorant-medium
				fs(mp(2))

.copy
	column-count 2
	column-gap 4rem
	pad(1,0)
	+below($tablet)
		column-count: 1;

	/deep/ p
		margin-top 0
		letter-spacing (0.1 / $p) * 1em

</style>
