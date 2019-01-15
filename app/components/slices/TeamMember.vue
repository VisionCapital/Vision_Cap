<template>
	<div class="team-member">

		<div class="img-wrap" :style="{height: `${this.elDimensions.height}px`, width: `${this.elDimensions.width}px`}">
			<img class="profile-pic" ref="img" @load="checkImgHeight()" :src="card.profile_image.url" v-if="card.profile_image">
		</div>

		<div class="content" >

			<div  class="copy-container" :class="{'full-copy': !collapsed}" ref="copyContainer">
				<div ref="copy"
					v-html="$cms.htmlField(card.profile_copy)">
				</div>
			</div>

			<div @click="toggleText()" v-if="longCopy" class="copy-cta">
				<p v-if="collapsed">Read More</p>
				<p v-else>Collapse</p>
				<arrow-head class="arrow-head" :pointDown="collapsed"/>
			</div>

		</div>

	</div>
</template>

<script>

import ArrowHead from '../svg/ArrowHead.vue';

export default {
	components: {
		ArrowHead
	},
	props: [
		'card'
	],
	data() {
		let elDimensions = this.setElDimensions();
		return {
			longCopy: false,
			collapsed: true,
			elDimensions
		};
	},
	computed: {
		maxCopyHeight() {
			if (this.longCopy && this.collapsed) {
				if (this.$store.state.device.mobile) {
					return `${this.elDimensions.height}px`;
				}
				return `${this.elDimensions.height - 36}px`;
			} else if (this.longCopy && !this.collapsed) {
				return '100%';
			}
			return `${this.elDimensions.height}px`;
		}
	},
	methods: {
		setElDimensions() {
			// should probably add event listener resize for this
			let dimensions = this.card.profile_image.dimensions;
			let width = 220;
			if (this.$store.state.device.mobile) {
				width = 96;
			}
			return {
				height: width * (dimensions.height / dimensions.width),
				width: width
			};
		},
		checkImgHeight() {
			if (this.$refs.copy && this.elDimensions.height < this.$refs.copy.offsetHeight) {
				this.longCopy = true;
			}
			this.$refs.copyContainer.style.maxHeight = this.maxCopyHeight;
		},
		toggleText() {
			this.collapsed = !this.collapsed;
			this.$refs.copyContainer.style.maxHeight = this.maxCopyHeight;
		}
	}
};

</script>

<style lang="stylus">
.team-cards
	for i in 1..40
		.card:nth-child({i})
			img
				transition-delay 0.5s * i - 0.5s
			/deep/ h3
				transition-delay 0.5s * i - 0.3s
			/deep/ h4
				transition-delay 0.5s * i - 0.2s
			.copy-container /deep/ p
				transition-delay 0.5s * i - 0.1s
			.copy-cta
				transition-delay 0.5s * i
</style>
<style lang="stylus" scoped>

@import "../../styl/_variables"

.team-member
	pad(2,0)
	transition all 0.5s
	+above($tablet)
		display flex
p
	max-width 100%

/deep/ h3, /deep/ h4, .copy-container /deep/ p
	transition opacity 0.5s, transform 0.5s
	.v-enter &
		opacity 0
		transform translateY(2rem)

// i give up, i have no idea why this transition isn't working
.copy-cta
	transition opacity 10.5s, transform 10.5s
	.v-enter &
		opacity 0
		transform translateY(-2rem)

/deep/ h4
	margin-bottom 0
	+below($tablet)
		fs(20)

img
	width 220px
	max-width 100vw
	width 100%
	height 100%
	position absolute 
	bottom 0
	object-fit cover
	transition height 0.5s
	.v-enter & 
		height 0%
	+below($tablet)
		padding-right 1em
		width 96px
		float left
.img-wrap
	flex-shrink 0
	position relative
	margin-right 6em
	+below($tablet)
		margin-right 1em
		float left

.copy-cta
	cursor pointer
	color $blue
	overflow hidden
	display flex
	align-items center
.arrow-head
	margin-left 10px

.copy-container
	overflow hidden
	transition max-height 1s
	word-wrap break-word

	&.full-copy
		overflow visible
		max-height 100%
	/deep/ ul
		padding-left 1.8em
	/deep/
		h2, h3, h4, p
			&:first-child
				margin-top 0

		h2, h3
			@extend .heading
			margin-left 0
			+below($tablet)
				fs(30)

</style>
 