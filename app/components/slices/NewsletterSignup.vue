<template>
	<div class="newsletter-signup">

		<div class="wrap">

			<!-- Begin Constant Contact Inline Form Code -->
			<div class="ctct-inline-form" data-form-id="064dae77-9132-4260-8a7a-0042927baa39" ref="ctctForm"></div>
			<!-- End Constant Contact Inline Form Code -->

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],
	mounted() {

		let form = this.$refs.ctctForm;

		let func = () => {

			let btn = document.getElementsByClassName('ctct-form-button');
			let input = document.getElementsByClassName('ctct-form-element');
			let header = document.getElementsByClassName('ctct-form-header');

			let hasBtn = btn && btn.length;
			let hasInput = input && input.length;
			let hasHeader = header && header.length;

			if (hasBtn) {
				btn[0].innerHTML =
					` ${this.data.html('submit_button')}
					<svg xmlns="http://www.w3.org/2000/svg" width="62" height="11" viewBox="0 0 62 11">
						<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="1.5">
							<path d="M56 10.5l5-5.0002L56 .5M61 5.5H0"/>
						</g>
					</svg>`;
			}

			if (hasInput) {
				input[0].placeholder = this.data.text('placeholder');
			}
			if (hasHeader) {
				header[0].innerHTML = this.data.text('heading');
			}
			if (hasBtn && hasInput && hasHeader) {
				this.observer.disconnect();
			}
		};

		this.observer = new MutationObserver(func);
		func();

		this.observer.observe(form, { childList: true });

		if (window.ctctOnLoadCallback) {
			window.ctctOnLoadCallback();
		}

	}
};
</script>


<style lang="stylus" scoped>

@import "../../styl/_variables"

.newsletter-signup
	background #f5f5f5
	pad(4,0)
	position relative
	text-align center
	+below($tablet)
		pad(2,0)
	&.v-enter, &.onpage:not(.inview)
		/deep/ .ctct-form-custom .ctct-form-header
			opacity 0
			transform translateY(50%)

	/deep/
		.grecaptcha-badge
			bottom 2px !important
			position absolute !important

		.ctct-inline-form
			overflow hidden
			position relative

.wrap
	display inline-block
	// position relative
	+below($tablet)
		width 75%

.newsletter-signup /deep/ .ctct-inline-form
	p
		margin-left auto
		margin-right auto
	.ctct-form-custom
		+below($tablet)
			display flex
			flex-direction column
	.ctct-form-defaults
		pad(4,0,0)
		padding 0
		background none

		a:before, a:after
			background none

	.ctct-form-custom .ctct-form-header
		transition transform 0.5s, opacity 0.5s
		width 100%
		font-family $cormorant-semibold
		fs(40)
		top -0.2em
		letter-spacing -(0.2 / 40) * 1em
		text-align center
		margin 0 0 2rem
		color $blue

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
		+below($tablet)
			width 100%
			text-align center

	#gdpr_text
		order 5
		opacity .5
		/deep/ p
			font-family $circular
			+below($tablet)
				margin-bottom 0
	.ctct-form-footer 
		padding 0 0 80px
	.ctct-form-custom .ctct-form-button
		border-radius 0
		font-family $circular
		background-color $blue
		display flex
		align-items center
		width 11em
		+above($tablet)
			width 36%
			position absolute
			// top 5.4rem
			bottom 16.2rem
			right 0
		p
			text-align center
			margin 0
			pad(0,0.5,0)


</style>
