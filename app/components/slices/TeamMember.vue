<template>
	<div class="team-member">

		<div class="img-wrap" :style="{height: `${this.elDimensions.height}px`, width: `${this.elDimensions.width}px`}">
			<img class="profile-pic" ref="img" @load="checkImgHeight()" :src="card.profile_image.url" v-if="card.profile_image">
		</div>

		<div class="content" >

			<div  class="copy-container" :class="{'full-copy': !collapsed}" ref="copyContainer">
				<div class="copy" ref="copy"
					v-html="$cms.htmlField(card.profile_copy)">
				</div>
			</div>

			<div @click="toggleText()" v-if="longCopy" class="copy-cta">
				<p v-if="collapsed">Read More</p>
				<p v-if="!collapsed">Collapse</p>
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
			elDimensions,
			cutOffText: []
		};
	},
	computed: {
		maxCopyHeight() {
			if (this.longCopy && this.collapsed) {
				if (this.$store.state.device.mobile) {
					return `${this.elDimensions.height}px`;
				}
				return `${this.elDimensions.height - 2 * 26}px`;
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
				width = 104;
			}

			let height = width * (dimensions.height / dimensions.width);
			height = 26 * Math.floor(height / 26);
			return {
				height: height,
				width: width
			};
		},
		checkImgHeight() {
			if (this.$refs.copy && this.elDimensions.height < this.$refs.copy.offsetHeight) {
				this.longCopy = true;
			}
			this.$refs.copyContainer.style.maxHeight = this.maxCopyHeight;
		},
		paragraphCutOff() {
			let cycleCopy = this.$refs.copy.querySelectorAll('li, p');

			for (let text of cycleCopy) {
				if (this.elDimensions.height < text.offsetTop + text.offsetHeight) {
					text.classList.add('cut-off-text');
					this.cutOffText.push(text);
				}
			}
		},
		toggleText() {
			this.collapsed = !this.collapsed;
			this.$refs.copyContainer.style.maxHeight = this.maxCopyHeight;
			// if (this.collapsed) {
			// 	for (let item of this.cutOffText) {
			// 		item.classList.add('cut-off-text');
			// 	}
			// } else {
			// 	for (let item of this.cutOffText) {
			// 		item.classList.remove('cut-off-text');
			// 	}
			// }
		}
	},
	mounted() {
		// this.paragraphCutOff();
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.team-member
	pad(2,0)
	transition all 0.5s
	+above($tablet)
		display flex

	/deep/ p
		max-width 100%
		overflow-y hidden

.copy
	position relative

	/deep/
		.cut-off-text
			opacity 0

.copy-cta
	transition opacity 0.5s 0.4s, transform 0.5s 0.4s
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateY(-2rem)

.team-member
	/deep/ h3
		transition opacity 0.5s, transform 0.5s
	/deep/ h4
		transition opacity 0.5s 0.2s, transform 0.5s 0.2s
	.copy-container /deep/ p, /deep/ ul
		transition opacity 0.5s 0.4s, transform 0.5s 0.4s
	&.v-enter, &.onpage:not(.inview)
		/deep/ h3, /deep/ h4, .copy-container /deep/ p, /deep/ ul
			opacity 0
			transform translateY(2rem)

	/deep/
		h4
			// margin-bottom 0
			line-height $let*1rem

			+below($tablet)
				fs(20)

		img
			width 220px
			max-width 100%
			width 100%
			height 100%
			position absolute
			bottom 0
			object-fit cover
			transition height 0.5s

			+below($tablet)
				padding-right 1em
				width 96%
				float left

	&.v-enter, &.onpage:not(.inview)
		/deep/ img
			height 0%

.img-wrap
	flex-shrink 0
	position relative
	margin-right 6em
	+below($tablet)
		margin-right 1em
		float left

.copy-cta
	align-items center
	color $blue
	cursor pointer
	display flex
	overflow hidden
	transform translate3d(0, .4em, 0)

.arrow-head
	margin-left 10px

.copy-container
	overflow hidden
	transition max-height 1s
	word-wrap break-word

	&.full-copy
		overflow visible
		max-height 100%
	/deep/
		li 
			mgn(1, 0)
		ul
			padding-left 1.8em

		h2, h3, h4, p
			&:first-child
				margin-top 0

		h2, h3
			@extend .heading
			margin-left 0
			+below($tablet)
				fs(30)
				line-height $let*1rem

</style>
