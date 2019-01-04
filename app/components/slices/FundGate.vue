<template>
	<div class="fund-gate">

		<div class="wrap">
			<div class="column" v-for="(link) in links" :key="link.label">
				
				<router-link :to="link.url">

					<div class="bg" v-if="image"
						:style="{ backgroundImage: `url('${image[0].url}')` }"/>

						<!-- <core-button type="link" :route="link.url" :label="link.label"></core-button> -->

				<div class="border">
					<div class="border-stroke"/>
						
						<div class="link" v-html="link.label">
											</div>

						</div>
						</router-link>
			</div>
			
		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],
	data() {
		let links = [
			{
				label: '<h3>Private Funds</h3>',
				url: '/private-funds/'
			},
			{
				label: '<h3>Mutual Funds</h3>',
				url: '/mutual-funds/'
			}
		];
		return {
			links
		};
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.fund-gate
	@extend .slice
	// pad(2px,0)
	position relative

	.wrap
		width 100%

.wrap
	color $w
	position relative
		width 100%

	+above($tablet) //desktop
		display flex
		width 100%

	/deep/ h1
		color $w

	+below($tablet) //tablet and phone
		width 100%
		display inline-block

.column
	width 100%
	height 400px
	position relative
	margin-top 4px
	overflow hidden
	background-color:#000;

	&:hover .bg
		transform scale(1.1)
		opacity 1

	&:hover 
		.border-stroke//when you hover on the link, affects border class
			transform scale(0.9)	

	> a
		position static	

	+above($tablet) //desktop
		&:first-child
			margin-right 2px
		&:last-child
			margin-left 2px

.border-stroke //separate border box element to be re-sized
	border 1px solid $w
	position absolute
	height 100%
	width 100%
	transition all 0.4s $easeInCubic

.border
	position absolute 
	top 50%
	left 50%
	transform translate(-50%, -50%)
	color $w
	z-index 2
	width auto
	

.link
	position relative 
	color $w
	z-index 2
	width auto
	padding 5px
	display block

	width 360px
	+below($tablet)
		width 280px
	
	// to kill global style
	&:before, &:after, &:hover
		width 360px
		background: none
		+below($tablet)
			width 280px

	/deep/ h3
		width 100%
		text-align center
		color $w
		
		+below($tablet)
			fs(36)
			mgn(0.5,0)



.bg
	height 100%
	left 0
	position absolute
	top 0
	width 100%
	background-size cover
	background-repeat no-repeat
	z-index 1
	transition all 0.4s $easeInCubic
	opacity 0.6
	

</style>