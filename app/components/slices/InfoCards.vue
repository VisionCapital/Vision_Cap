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

		<div :class="{wrap: $store.state.device.mobile}">

			<div class="cards" v-if="data.items">
				<div class="individual-card" v-for="(item, i) in data.items" :key="i">
					<div class="copy"
						v-if="item.info"
						v-html="data.htmlField(item.info)"/>
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
	@extend .slice
	position relative
	+below($tablet)
		pad(0,0,3)

	.wrap
		position relative

		/deep/ h1
			color $w
			font-size 30px
			line-height (37/30)
			+above($mobile)//tablet
				fs(30)
				line-height (52/44)
			+above($tablet)//notebook
				fs(36)
				line-height (44/36)
			+above($notebook)//laptop
				fs(44)
				line-height (52/44)

.individual-card // style this according to dimensions

	background-color $darkblue
	color $w
	display flex
	align-items center

	+below($tablet) //mobile and tablet
		width auto
		margin 1em 0
		padding 0em 2em

	+above($tablet) //desktop plus
		width (100%/3)
		margin 0 5px
		padding 0em 1vw
		pad(2,2)
		&:last-child, &:first-child
			margin 0



.copy
	text-align center
	vertical-align middle

	p
		font-size relative
		+below($notebook) //mobile and tablet
			fs(12)
		+below($tablet)
			fs($p)

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
		width 100vw

.heroAboveCards
	padding-top 8em
	padding-bottom 4em

</style>
