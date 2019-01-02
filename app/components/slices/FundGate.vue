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
	pad(5,0)
	position relative

	.wrap
		color $w
		position relative
		display flex
		/deep/ h1
			color $w

.column
	width 50%
	height 400px
	position relative

.link
	position absolute 
	top 50%
	left 50%
	transform translate(-50%, -50%)
	color $w
	z-index 2
	border 1px solid $w
	width 60%
	
	// to kill global style
	&:before, &:after, &:hover
		width 60%

	/deep/ h3

		margin-left 40px
		color $w

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