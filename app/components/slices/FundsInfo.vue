<template>
  <div class="funds-info"> 
    <div class="wrap">
      
			<h3 v-html="heading"></h3>
			<div class="contact-info">

				<p v-html="subheading"></p>

				<div class="contacts">
					<div v-for="(contact, idx) in contacts" :key="idx">

						<p v-html="contact.name"></p>
						<a :href="`tel:${contact.tel}`" v-html="contact.tel"/> or <a :href="`mailto:${contact.email}`" v-html="contact.email"/>

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

.wrap
	+below($tablet)
		pad(0,2)

h3, p
	color $copy

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
