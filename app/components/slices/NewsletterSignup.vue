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

		let form = this.$refs.ctctForm;

		let func = () => {

			console.log('mootled');

			let btn = document.getElementsByClassName('ctct-form-button');
			let input = document.getElementsByClassName('ctct-form-element');

			let hasBtn = btn && btn.length;
			let hasInput = input && input.length;

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

			if (hasBtn && hasInput) {
				this.observer.disconnect();
			}
		};

		this.observer = new MutationObserver(func);
		func();

		this.observer.observe(form, { childList: true });

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
	mgn(2,0,0)
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
