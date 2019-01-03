<template>
	<div class="fund-gate">


		<div class="wrap">
			<div class="column" v-for="(link) in links" :key="link.label">

				<div class="bg" v-if="image"
					:style="{ backgroundImage: `url('${image[0].url}')` }"/>

				<!-- <core-button type="link" :route="link.url" :label="link.label"></core-button> -->

				<router-link class="link" :to="link.url"	v-html="link.label">
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
	color $w
	position relative

	+above($tablet) //desktop
		display flex


	/deep/ h1
		color $w


.column
	width 50%
	height 400px
	position relative
	margin-top 4px
		
	+above($tablet)
		&:first-child
			margin-right 2px
		&:last-child
			margin-left 2px

	+below($tablet)
		width auto
		margin 2px -6% 2px -6%

.link
	position absolute 
	top 50%
	left 50%
	transform translate(-50%, -50%)
	color $w
	z-index 2
	border 1px solid $w
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

</style>