<template>
	<div class="contact-form">

		<div class="wrap">

			<div class="copy">
				<h3 v-if="data.fields.heading"
					v-html="data.text('heading')"/>
				<h4 v-if="data.fields.subheading"
					v-html="data.text('subheading')"/>
			</div>
			
			<contact-form :data="data"></contact-form>

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
	},
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.contact-form
	@extend .slice
	text-align center
	background $blue
	.wrap
		color $w
		position relative
		pad(2,0)

		/deep/ h3
			color $w
		/deep/ h4
			max-width 100%
			color $w
			opacity 0.7
			fs(26)
			+below($tablet)
				fs(20)

</style>