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

			<div class="copy-container">
				<div v-if="data.fields.column_copy.length"
					v-html="data.html('column_copy')"
					class="copy"/>

				<div v-if="data.fields.second_column_copy.length"
					v-html="data.html('second_column_copy')"
					class="copy"/>

				<div v-else-if="copy"
					class="copy">
					<p v-if="copy"
						v-html="copy"/>
					<p v-if="heading"
						v-html="heading"/>
				</div>
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

.two-column-copy
	background $bg
	@extend $slice
	pad(2,0)

.title
	/deep/
		h2, h3
			font-family $cormorant-semibold
			fs(44)
			max-width 100%
			transition line-height 0.5s, opacity 0.5s, transform 0.5s

			.v-enter &, .onpage:not(.inview) &
				line-height 1.3
				opacity 0
				transform translateY(10%)

			+below($tablet)
				font-family $cormorant-medium
				fs(mp(2))

.copy
	+above($tablet)
		&:first-child
			margin-right $gut*1rem

		&:last-child
			margin-left $gut*1rem

.copy-container
	pad(1,0)

	+above($tablet)
		display flex

.copy
	/deep/ p
		margin-top 0
		letter-spacing (0.1 / $p) * 1em
		position relative
		transition transform 0.5s, opacity 0.5s
		.v-enter &, .onpage:not(.inview) &
			transform translateY(40px)
			opacity 0

		for i in 1..20
			&:nth-child({i})
				transition-delay 0.2s * i


</style>
