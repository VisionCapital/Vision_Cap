<template>
	<div class="newsletter-signup">

		<div class="wrap">

			<h2 v-if="heading"
				v-html="heading"/>

			<form>
				<div class="form-row">
					<input type="email"
						:placeholder="subheading"/>
					<button type="submit">
						<span v-html="copy"/>
						<svg xmlns="http://www.w3.org/2000/svg" width="62" height="11" viewBox="0 0 62 11">
							<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="1.5">
								<path d="M56 10.5l5-5.0002L56 .5M61 5.5H0"/>
							</g>
						</svg>
					</button>
				</div>
			</form>

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

.newsletter-signup
	background #f5f5f5
	pad(4,0)
	text-align center

	/deep/
		h2
			font-family $cormorant-semibold
			fs(40)
			letter-spacing -(0.2 / 40) * 1em
			text-align center

.wrap
	display inline-block
	// width 75%
.form-row
	display flex
	width 100%
	+below($tablet)
		flex-direction column
		align-items center

	/deep/
		input
			border 0
			border-bottom 2px solid $blue
			flex-grow 1
			width auto

			+below($tablet)
				width 100%
				text-align center

			&:hover
				border-color $copy

			&:focus
				border-color $blk

		::placeholder
			color #9F9F9F

		button
			align-items center
			background $blue
			border 0
			color $w
			display flex
			pad(.25,.5)
			letter-spacing (0.1 / 14) * 1em
			line-height $let * 1.125em
			flex-grow 0
			margin-top 2em
			+above($tablet)
				margin-top 0
				margin-left 1em

			span
				pad(0,.5,0,.25)

			&:hover, &:focus
				background $copy

			&:active
				background $blk

</style>
