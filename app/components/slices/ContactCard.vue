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
		position relative
		+above($tablet)
			display flex

.contact
	+above($tablet)
		width 50%
	+below($tablet)
		mgn(0,0,2)
	p
		margin 0
		color $copy

	a
		color $blue

	/deep/ h4
		font-family $cormorant-medium
		fs(26)
		+below($tablet)
			fs(20)

.title
	/deep/ h2
		@extend .heading
		font-family $cormorant-semibold
		+below($tablet)
			fs(30)
</style>
