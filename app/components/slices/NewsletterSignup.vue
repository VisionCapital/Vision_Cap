<template>
	<div class="newsletter-signup">

		<div class="wrap">

			<!-- Begin Constant Contact Inline Form Code -->
			<div class="ctct-inline-form" data-form-id="064dae77-9132-4260-8a7a-0042927baa39" ref="ctctForm"></div>
			<!-- End Constant Contact Inline Form Code -->

			<h2 v-if="data.fields.heading"
				v-html="data.text('heading')"/>
			<h2 v-else
				v-html="'Sign up to our newsletter:'"/>

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],
	mounted() {
		setTimeout(() => {

			document.getElementsByClassName('ctct-form-button')[0].innerHTML =
				` ${this.data.html('submit_button')} 
				<svg xmlns="http://www.w3.org/2000/svg" width="62" height="11" viewBox="0 0 62 11">
					<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="1.5">
						<path d="M56 10.5l5-5.0002L56 .5M61 5.5H0"/>
					</g>
				</svg>`;
			document.getElementsByClassName('ctct-form-element')[0].placeholder = this.data.text('placeholder');

		}, 1000);
	}
};
</script>


<style lang="stylus" scoped>

@import "../../styl/_variables"

.newsletter-signup
	background #f5f5f5
	pad(4,0)
	text-align center
	+below($tablet)
		pad(2,0)

	/deep/ h2
		position absolute
		width 100%
		font-family $cormorant-semibold
		fs(40)
		top -0.2em
		letter-spacing -(0.2 / 40) * 1em
		text-align center
		margin 0
		transform translateY(-100%)

.wrap
	display inline-block
	position relative
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

.newsletter-signup /deep/ .ctct-inline-form
	.ctct-form-defaults
		pad(4,0,0)
		padding 0
		background none
	.ctct-form-header
		display none
	.ctct-form-label
		display none
	.ctct-form-element
		width 60%
		background none
		border none
		box-shadow none
		border-bottom 2px solid $blue
		border-radius 0
		font-family $circular
		padding-left 0
		padding-left 0
	.ctct-form-custom .ctct-form-button
		width 36%
		border-radius 0
		position absolute
		top 0
		right 0
		font-family $circular
		background-color $blue
		display flex
		align-items center
		p
			margin 0
			pad(0,0.5,0)

			
</style>
