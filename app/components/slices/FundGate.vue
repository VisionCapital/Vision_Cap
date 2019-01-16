<template>
	<div class="fund-gate">

		<div class="wrap" v-if="data.items">

			<div class="column"  v-for="link in data.items" :key="link.label">
				<router-link :to="link.gate_destination.slug">

					<div class="bg" v-if="link.image"
						:style="{ backgroundImage: `url('${link.image.url}')` }"/>

					<div class="border">

						<div class="border-stroke">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 361 113">
								<rect class="cls-1" x="0.5" y="0.5" width="360" height="112"/>
							</svg>
						</div>

							<div class="link">
								<h3 v-html="data.textField(link.gate_heading)"/>
							</div>

					</div>

				</router-link>
			</div>

		</div>

		<div class="wrap" v-else>
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
	// pad(2px,0)
	position relative

.wrap
	background-color $darkblue
	background-color #031543
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
	// border 1px solid $w
	position absolute
	height 100%
	width 100%
	transition all 0.8s $easeInOutCubic

.border
	position absolute
	top 50%
	left 50%
	transform translate3d(-50%, -50%, 0%)
	color $w
	z-index 2
	width auto
	transition transform 2s, opacity 0.5s
	.v-enter &, .onpage &
		transform translate3d(-50%,40px,0)
		opacity 0
	.inview &
		transform translate3d(-50%,-50%,0)
		opacity 1


.link
	position relative
	color $w
	z-index 2
	width auto
	padding 5px
	display block	
	transition transform 2s, opacity 0.5s
	.v-enter &, .onpage &
		transform translateY(40px)
		opacity 0
	.inview &
		transform translateY(0)
		opacity 1

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
	transition transform 3s, opacity 3s
	.v-enter &
		transform translateY(100px)
		opacity 0

	left 0
	position absolute
	top 0
	width 100%
	background-size cover
	background-repeat no-repeat
	z-index 1
	transition all 0.8s $easeInOutCubic
	opacity 0.6
	

.cls-1
	fill none
	stroke #fff
	stroke-width 3
	stroke-miterlimit 10
	stroke-dasharray 944 944
	stroke-dashoffset 0
	transition stroke-dashoffset 1s $easeInOutQuint

	.v-enter &, .onpage &
		stroke-dashoffset 944

	.inview &
		stroke-dashoffset 0

	// animation: dash 1.5s $easeInOutCubic forwards;
	// @keyframes dash {
	// 	from {
	// 		stroke-dashoffset: 944
	// 	}
	// 	to {
	// 		stroke-dashoffset: 0;
	// 	}
	// }
</style>