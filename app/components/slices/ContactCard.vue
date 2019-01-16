<template>
	<div class="contact-card">
		<div class="wrap">

      <div class="contact" v-for="(contact, idx) in contacts" :key="idx">

        <div class="title" 
					v-if="contact.name"
					v-html="data.htmlField(contact.name)">
        </div>

        <h4 v-if="contact.position"
          v-html="data.textField(contact.position)"/>

        <p v-if="contact.email">
          Email: <a :href="`mailto:${data.textField(contact.email)}`" v-html="data.textField(contact.email)"></a>
        </p>
				
				<p v-if="contact.phone">
					Tel: <a :href="`tel:${data.textField(contact.phone)}`" v-html="data.textField(contact.phone)"></a>
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
		let contacts = this.data.items;
		return {
			contacts
		};
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.contact-card
	@extend .slice
	pad(3,0,3,0)
	transition all 2s
	.wrap
		position relative
		+above($tablet)
			display flex

for i in 1..8
	.contact:nth-child({i}) 
		.title
			transition-delay (0.3s * i - 0.5)
		h4
			transition-delay (0.3s * i - 0.4)
		p
			transition-delay (0.3s * i - 0.3)

.contact
	+above($tablet)
		width 50%
		pad(0,1,0,0)

	+below($tablet)
		mgn(0,0,2)

	p
		margin 0
		color $copy
	.v-enter &, .onpage:not(.inview) &
		p, h4
			transform translateX(3rem)
			opacity 0
	p, h4
		transition transform 0.5s, opacity 0.5s
	a
		color $blue

	/deep/ h4
		font-family $cormorant-medium
		fs(26)
		+below($tablet)
			fs(20)

.title
	transition transform 0.5s, opacity 0.5s
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateY(2rem)
	/deep/ h2
		@extend .heading
		font-family $cormorant-semibold
		+below($tablet)
			fs(30)
</style>
