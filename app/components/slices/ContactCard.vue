<template>
	<div class="contact-card">
		<div class="wrap">

      <div class="contact" v-for="repeat in 2">

        <div class="title">
          <h2 v-if="heading"
            v-html="heading"/>
        </div>

        <h4 v-if="subheading"
          v-html="subheading"/>

        <p v-if="email">
          Email: <a :href="`mailto:${email}`" v-html="email"></a>
        </p>
				<p v-if="tel">
					Tel: <a :href="`tel:${tel}`" v-html="tel"></a>
				</p>

      </div>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],
	data() {
		return {
			email: 'kosack@visioncap.ca',
			tel: '555-555-5555'
		};
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.contact-card
	@extend .slice
	pad(2,0)

	.wrap
		display flex
		position relative

.contact
	width 50%

	p
		margin 0
		color $blue

.title
	/deep/ h3
		// @extend .heading

</style>
