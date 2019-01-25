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
			let field = document.getElementsByClassName('ctct-form-field');

			let hasBtn = btn && btn.length;
			let hasInput = input && input.length;
			let hasHeader = header && header.length;
			let hasField = field && field.length;

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
			if (hasField) {
				let border = document.createElement('span');
				field[0].appendChild(border);
			}

			if (hasBtn && hasInput && hasHeader && hasField) {
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

		/deep/
			.ctct-form-custom .ctct-form-button
				width 0%
				opacity 0

			.ctct-form-field span
				width 0%

			.ctct-gdpr-text, .ctct-form-footer,	.ctct-form-custom .ctct-form-header
				transform translate(0,50%)
				opacity 0

			.g-recaptcha
				opacity 0

			.ctct-form-element
				transform translate(0,100%)

	/deep/
		.grecaptcha-badge
			bottom 2px !important
			box-shadow none !important
			position absolute !important

		.ctct-inline-form
			overflow hidden
			position relative

.wrap
	display inline-block
	+below($tablet)
		width 75%

.newsletter-signup /deep/ .ctct-inline-form
	p
		margin-left auto
		margin-right auto
	.ctct-form-field
		position relative
		overflow hidden
		span
			background $blue
			position absolute
			width 60%
			left 0
			bottom 0
			height 2px
			transition width 0.5s 0.2s
	.ctct-form-custom
		padding 0 0 46px

		+below($tablet)
			display flex
			flex-direction column
	.ctct-form-defaults
		pad(4,0,0)
		padding 0
		background none

		a:before, a:after
			background none
	.g-recaptcha
		transition opacity 0.5s 0.9s

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
		transition transform 0.5s 0.4s
		width 60%
		background none
		border none
		box-shadow none
		border-radius 0
		font-family $circular
		pad(0,1,0,0)
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
		display none
		// transition transform 0.5s 0.8s, opacity 0.5s 0.8s

	.ctct-gdpr-text
		transition transform 0.5s 0.7s, opacity 0.5s 0.7s

	.ctct-form-custom .ctct-form-button
		border-radius 0
		font-family $circular
		background-color $blue
		display flex
		align-items center
		width 11em
		overflow hidden
		transition width 0.5s 0.6s, opacity 0.01s 0.6s
		// pad(.5,0)

		+above($tablet)
			top ($let * 2 + 2) * 1rem
			width 36%
			position absolute
			left 64%
		p
			text-align center
			// margin 0
			margin auto
			// pad(0,0.5,0)

svg
	margin auto

</style>
