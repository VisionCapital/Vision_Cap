<template>
	<div class="info-card-slice">

		<div class="bg"/>

		<div class="wrap">
			<div class="heroAboveCards">

				<div class="copy" v-if="data.fields.heading"
					v-html="data.html('heading')"/>

				<div class="copy" v-else-if="heading">
					<h1 v-html="heading"/>
				</div>

			</div>
		</div>

		<div :class="{'individual-card-wrap': $store.state.device.mobile}">

			<div class="cards" v-if="data.items">
				<div class="individual-card" v-for="(item, i) in data.items" :key="i">
					<div class="copy"
						v-if="item.info"
						v-html="data.textField(item.info)"/>
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
	position relative
	width 100%

	+below($tablet)
		width 100%

	+above($notebook)
		@extend .slice
		width 100%

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
				fs(44)
				line-height (52 / 44)

			+above($notebook)
				fs(36)
				line-height (44 / 36)

			+above($laptop)
				fs(44)
				line-height (52 / 44)

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
	.v-enter &
		transform translateY(40px)
		opacity 0
	for i in 1..20 
		&:nth-child({i}) 
			transition-delay 0.2s * i

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
		pad(2,3.5)

	.copy
		text-align center
		max-width 15em
		mgn(0,auto)

	//p
	//	font-size relative
	//	+below($notebook) //mobile and tablet
	//		fs(12)
	//	+below($tablet)
	//		fs($p)

.bg
	background url('../../images/strip-bg.jpg')
	height 100%
	left 0
	position absolute
	top 0
	width 100%
	background-repeat: no-repeat;
	background-size: cover;

.cards
	width 100%
	z-index 2
	position relative

	+above($tablet)
		display flex
		width 100%
	
.heroAboveCards
	padding-top 11rem
	padding-bottom 4em
	/deep/ h1
		transition line-height 0.5s, opacity 0.5s, delay 0.5s
		.v-enter &
			line-height 1.5
			opacity 0				

</style>
