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
	pad(2,0)

	.wrap
		position relative
		+above($tablet)
			display flex

.contact
	+above($tablet)
		width 50%

		&:not(:first-child), &:not(:last-child)
			pad(0,1)
		&:first-child
			pad(0,1,0,0)
		&:last-child
			pad(0,0,0,1)

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
