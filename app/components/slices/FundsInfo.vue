<template>
  <div class="funds-info">
    <div class="wrap">

			<div class="heading" v-if="data.fields.fund_heading"
				v-html="data.html('fund_heading')"/>

			<div class="contact-info">

				<p v-if="data.fields.fund_cta" v-html="data.text('fund_cta')"></p>

				<div class="contacts">
					<div class="contact" v-for="(contact, idx) in contacts" :key="idx">

						<div v-if="contact.contact_name" v-html="data.htmlField(contact.contact_name)"></div>
						<a :href="`tel:${renderTel(data.textField(contact.contact_phone))}`"
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

	methods: {
		renderTel(tel) {
			let num = tel;

			num = num.replace('-', '');
			num = num.replace('(', '');
			num = num.replace(')', '');
			num = num.replace(' ', '');

			return '+1' + num;
		}
	},

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
	background-color $lightgrey

.funds-info
	@extend $slice
	pad(2,0)

	/deep/ a
		color $blue

	/deep/ em
		font-style normal

	/deep/ h3, /deep/ p
		color $copy

	/deep/ p
		transition transform 0.5s 0.2s, opacity 0.5s 0.2s
		.v-enter &, .onpage:not(.inview) &
			transform translateY(2em)
			opacity 0

.contact
	.v-enter &, .onpage:not(.inview) &
		transform translateX(-3em)
		opacity 0

	for i in 1..5
		&:nth-child({i})
			transition transform (0.5s + 0.2s * i) $easeOutSine, opacity (0.5s + 0.2s * i)
			transition-delay (0.1s + 0.1s * i)


/deep/ h3
	font-family $cormorant-semibold
	transition transform 0.5s, line-height 0.5s, opacity 0.5s

	.v-enter &, .onpage:not(.inview) &
		transform translateY(20px)
		line-height 1.5
		opacity 0

.contact-info
	+above($tablet)
		display flex

.contacts
	+above($tablet)
		mgn(0,0,0,2)

	/deep/ p
		margin-bottom 0
		color $blk

.contact
	+below($tablet)
		display inline-block
		width 47%
		margin-right 3%
		vertical-align top

	+below($mobile)
		width 100%
		margin 0

	/deep/ strong
		font-family $circular-medium
		font-weight normal

</style>
