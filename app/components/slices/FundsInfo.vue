<template>
  <div class="funds-info">
    <div class="wrap">

			<div v-if="data.fields.fund_heading"
				v-html="data.html('fund_heading')"/>

			<div class="contact-info">

				<p v-if="data.fields.fund_cta" v-html="data.text('fund_cta')"></p>

				<div class="contacts">
					<div v-for="(contact, idx) in contacts" :key="idx">
						
						<div v-if="contact.contact_name" v-html="data.htmlField(contact.contact_name)"></div>
						<a :href="`tel:${data.textField(contact.contact_phone)}`" 
							v-if="contact.contact_phone" 
							v-html="data.textField(contact.contact_phone)"/>
						<em v-if="contact.contact_email && contact.contact_phone">or</em>
						<a v-if="contact.contact_email" 
							:href="`mailto:${data.textField(contact.contact_email)}`" 
							v-html="data.textField(contact.contact_email)"/>

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
		let contacts = this.data.items;
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

/deep/ h3, /deep/ p
	color $copy

/deep/ h3
	fs(32)

.contact-info
	+above($tablet)
		display flex

.contacts
	+above($tablet)
		mgn(0,0,0,2)
	/deep/ p
		margin-bottom 0
		color $blk
	a
		color $blue


</style>
