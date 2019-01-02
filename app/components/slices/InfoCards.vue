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

.content
	width 100%
	display inline-block

.individual-card
	background-color $darkblue
	color $w
	width (100%/3)
	margin 0 2px 0 2px

.copy
	margin 10em (100%/12) 10em (100%/12)
	text-align center

.bg
	height 100%
	left 0
	position absolute
	top 0
	width 100%
	background-repeat: no-repeat;
	background-size: cover;

.cards
	display flex

.heroAboveCards
	padding-top 4em

</style>
