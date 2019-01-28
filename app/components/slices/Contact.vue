<template>
	<div class="contact-form">

		<div class="wrap">

			<div class="copy">
				<h3 v-if="data.fields.heading"
					v-html="data.text('heading')"/>
				<h4 v-if="data.fields.subheading"
					v-html="data.text('subheading')"/>

				<contact-form :data="data"></contact-form>

			</div>

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import ContactForm from '../ContactForm.vue';

export default {
	mixins: [ airprops ],
	components: {
		ContactForm
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.contact-form
	@extend $slice
	background $blue
	text-align center

.wrap
	color $w
	pad(2,0)

.copy
	mgn(0,auto)
	max-width 656px
	width 90%

	/deep/
		h3, h4
			transition opacity 0.5s, transform 0.5s $easeOutCubic

			.v-enter &, .onpage:not(.inview) &
				transform translate(0,50%)
				opacity 0

		h3
			color $w

		h4
			color #00b7f5
			color #4A90E2
			fs(26)
			transition-delay 0.25s

			+below($tablet)
				fs(20)

</style>
