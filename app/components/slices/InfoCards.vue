<template>
	<div class="info-card-slice">

		<div class="wrap">
			<div class="heroAboveCards">

				<div class="copy" v-if="data.fields.heading"
					v-html="data.html('heading')"/>

				<div class="copy" v-else-if="heading">
					<h1 v-html="heading"/>
				</div>

			</div>
		</div>

		<div :class="{ 'individual-card-wrap': $store.state.device.mobile}">

			<div class="cards" v-if="data.items">
				<div class="individual-card" v-for="(item, i) in data.items" :key="i">
					<div class="copy"
						v-if="item.info"
					><p v-html="data.textField(item.info)"></p></div>
				</div>
			</div>

			<div class="cards" v-else>
				<div class="individual-card" v-for="i in 3" :key="i">
					<div class="copy">
						<p v-if="copy"
							v-html="copy"/>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

import HeroBackground from '../HeroBackground.vue';

export default {
	components: {
		HeroBackground
	},
	mixins: [ airprops ]
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.info-card-slice
	background none
	position relative

	+above($notebook)
		@extend $slice

	.wrap
		position relative
		// width 60%
		/deep/ h1
			color $w
			font-family 'Cormorant Medium', sans-serif
			fs(30)
			line-height (37 / 30)
			text-align center

			+above($tablet)
				fs(40)
				line-height (48 / 40)

			+above($notebook)
				fs(38)
				line-height (48 / 38)

			+above($laptop)
				fs(48)
				line-height (56 / 48)

			+below($notebook)
				br
					display none

.individual-card-wrap
	width 100%


.individual-card // style this according to dimensions
	background-color $darkblue
	color $w
	fs(17)
	font-family $cormorant
	line-height (30 / 23)
	align-items center
	transition transform 0.5s, opacity 0.5s
	transition-delay 0.8s

	.v-enter &
		transform translateY(40px)
		opacity 0

	for i in 1..3
		&:nth-child({i})
			transition-delay (0.4s * i) + 0.8s

	h1
		text-align center

	+below($tablet) //mobile and tablet
		width 100%

		&:last-child
			margin-bottom 0

		margin 3px 0
		pad(2,1)

	+above($tablet) //desktop plus
		width (100%/3)
		margin 0 3px
		pad(2,1)

	+above($notebook) //desktop plus
		fs(23)
		pad(2,3)

	.copy
		text-align center
		max-width 20em
		mgn(0,auto)
		display block

.cards
	width 100%
	z-index 2
	position relative

	+above($tablet)
		display flex
		width 100%

.heroAboveCards
	pad(4,0,2)

	/deep/ h1
		transition line-height 0.5s, opacity 0.5s
		transition-delay 0.5s

		.v-enter &
			line-height 1.5
			opacity 0

</style>
