<template>
  <div class="funds-info">
    <div class="wrap">

			<h3 v-if="heading"
				v-html="heading"/>

			<div class="contact-info">

				<p v-html="subheading"></p>

				<div class="contacts">
					<div v-for="(contact, idx) in contacts" :key="idx">

						<p v-html="contact.name"></p>
						<a :href="`tel:${contact.tel}`" v-if="contact.tel" v-html="contact.tel"/>
						<em v-if="contact.email && contact.tel">or</em>
						<a v-if="contact.email" :href="`mailto:${contact.email}`" v-html="contact.email"/>

					</div>
				</div>

			</div>

    </div>
  </div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],
	data() {
		let contacts = [
			{
				name: 'Darren Kosack',
				tel: '416-569-8498',
				email: 'kosack@visioncap.ca'
			},
			{
				name: 'Darren Kosack',
				tel: '416-569-8498',
				email: 'kosack@visioncap.ca'
			}
		];
		return {
			contacts
		};
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.funds-info
	@extend .slice
	pad(2,0)


em
	font-style normal

h3, p
	color $copy

h3
	fs(32)

.contact-info
	+above($tablet)
		display flex

.contacts
	+above($tablet)
		mgn(0,0,0,2)
	p
		margin-bottom 0
		color $blk
	a
		color $blue


</style>
