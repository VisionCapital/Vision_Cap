<template>
	<div class="team-card-slice">
		<div class="wrap">

			<img class="profile-pic" :src="image[0].url" v-if="image">

			<div class="guy"></div>
			<div class="content">

				<div class="name">
					<h2 v-if="heading"
						v-html="heading"/>
				</div>

				<h4 class="position" 
					v-if="subheading"
					v-html="subheading"/>

				<div class="copy">
					<p v-if="copy"
						v-html="copy"/>
				</div>

				<a>read more</a>
				<!-- <core-button label="Read More"></core-button> -->

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

.team-card-slice
	@extend .slice
	padding 1px 0
	+above($tablet)
		margin 0 (100% / 8)
		width (600% / 8)

	.wrap
		margin (100% / 8) auto
		position relative
		display flex
		justify-content space-between

img
	width 30% 
	
.content
	width 60%
	display inline-block

.guy
	height 100% 
	width 90px


.name
	/deep/ h2
		margin-top 0
		@extend .heading

	+above($tablet)
		// width (500% / 8)

</style>
