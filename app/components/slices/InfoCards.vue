<template>
	<div class="info-card-slice">

			<div class="bg" v-if="image"
			:style="{ backgroundImage: `url('${image[0].url}')` }"/>

				<div class="wrap">
					<div class="heroAboveCards">
					<div class="copy">
					<h1 v-if="heading"
					v-html="heading"/>
					</div>
				</div>

	<div class="cards">
		<div class="individual-card" v-for="i in 3" :key="i">
            <div  class="copy">
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

export default {
	mixins: [ airprops ]
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"


.info-card-slice
	@extend .slice
	position relative

	+above($tablet)
		width 100%

	.wrap
		position relative

		/deep/ h1
			color $w
			fs(mp(3))

.individual-card
	margin 2px
	background-color $darkblue
	color $w
	width 100%
	padding 3em (100%/12) 3em (100%/12)
	
	+above($mobile)
		width (100%/3)

.copy
	text-align center

	p
		font-size inherit
	


.bg
	height 100%
	left 0
	position absolute
	top 0
	width 100%
	background-repeat: no-repeat;
	background-size: cover;

.cards
	width 100%
	+above($mobile)
		display flex
		width 100%

.heroAboveCards
	padding-top 4em

</style>
