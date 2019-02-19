<template>
	<div class="team-member">
	
		<!-- Desktop image-->
		<div class="img-wrap" v-if="card.profile_image.url  && this.$store.state.device.win.x > 768" :style="{height: `${this.elDimensions.height}px`, width: `${this.elDimensions.width}px`}" >
			<img class="profile-pic" ref="img" @load="checkImgHeight(card.profile_image.url)" :src="card.profile_image.url">
		</div>

		<div class="content">

				<!-- Mobile image-->
				<div class="img-wrap" v-if="card.profile_image_mobile.url  && this.$store.state.device.win.x <= 768">
					<img class="profile-pic" ref="img" @load="checkImgHeight(card.profile_image_mobile.url)" :src="card.profile_image_mobile.url">
				</div>
			<!-- BOTH: profile title copy-->
			<div class="copy-container" :class="{'full-copy': !collapsed}" ref="copyContainer">
				<div class="body-copy" ref="copy">
					<div class="copy" ref="copy"
						v-html="$cms.htmlField(card.profile_copy)">
						
					</div>
					
					<!-- Desktop body copy-->
					<!-- <div v-html="$cms.htmlField(card.profile_body_copy)" v-if="this.$store.state.device.win.x > 768"/> -->
				</div>
			</div>

		
				<!-- Mobile body copy
				<div class="copy-container" :class="{'full-copy': !collapsed}" ref="copyContainer" v-if="this.$store.state.device.win.x <= 768">
					<div class="body-copy" ref="copy"
						v-html="$cms.htmlField(card.profile_body_copy)">
					</div>
				</div> -->

				<!-- BOTH: copy toggle -->
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
				// return `${this.elDimensions.height}px`;
			} else if (this.longCopy && !this.collapsed) {
				return `${this.$refs.copy.offsetHeight}px`;
			}
			return `${this.elDimensions.height}px`;
		}
	},
	methods: {
		setElDimensions() {
			let width = 220;
			if (this.$store.state.device.mobile) {
				width = 104;
			}
			// should probably add event listener resize for this
			if (this.card.profile_image.url) {
				let dimensions = this.card.profile_image.dimensions;

				let height = width * (dimensions.height / dimensions.width);
				height = 26 * Math.floor(height / 26);
				// if (this.$store.state.device.win.x <= 375) {
				// 	this.$nextTick(height = 0);
				// }
				return {
					height: height,
					width: width
				};
			}
			return {
				height: 26 * 12,
				width: width
			};
		},
		checkImgHeight(profileExists) {
			if (profileExists && this.$refs.copy && this.elDimensions.height < this.$refs.copy.offsetHeight) {
				this.longCopy = true;
			}
			this.$refs.copyContainer.style.maxHeight = this.maxCopyHeight;
		},
		// paragraphCutOff() {
		// 	let cycleCopy = this.$refs.copy.querySelectorAll('li, p');

		// 	for (let text of cycleCopy) {
		// 		if (this.elDimensions.height < text.offsetTop + text.offsetHeight) {
		// 			text.classList.add('cut-off-text');
		// 			this.cutOffText.push(text);
		// 		}
		// 	}
		// },
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
		},
		toggleTextMobile() {
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
.content
	float: right
	+below($tablet)
		display flex
		flex-direction column
		margin auto
		
.team-member
	pad(2,0)
	transition opacity 500ms
	display flex
	+above($tablet)
		.profile-pic
			order 1
	/deep/ p
		max-width 100%
		overflow-y hidden

.copy
	position relative
	/deep/
		.cut-off-text
			opacity 0

.copy-cta
	transition opacity 0.5s 0.8s, transform 0.5s 0.8s
	+below($tablet)
		margin auto
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateY(-2rem)

.team-member
	/deep/ h3
		transition opacity 0.5s 0.4s, transform 0.5s 0.4s
	/deep/ h4
		transition opacity 0.5s 0.6s, transform 0.5s 0.6s
	.copy-container /deep/ p, /deep/ ul
		transition opacity 0.5s 0.8s, transform 0.5s 0.8s
	&.v-enter, &.onpage:not(.inview)
		/deep/ h3, /deep/ h4, .copy-container /deep/ p, /deep/ ul
			opacity 0
			transform translateY(2rem)

		/deep/ img
			transform translate3d(0, 100%, 0)

	/deep/
		h4
			// margin-bottom 0
			line-height $let*1rem

			+below($tablet)
				fs(20)

.no-image
	background-color $grey
	margin-right 6em
	height auto
	display inline-block
.img-wrap
	flex-shrink 0
	position relative
	margin-right 6em
	overflow hidden

	+below($tablet)
		margin-right 1em
		float left

	+below($tablet)
		display inline-block
		float: none
		text-align center
		margin-right 0
		margin-bottom: 2em;
		

	/deep/
		img
			transform translate3d(0, 0%, 0)
			transition transform 500ms $easeOutCubic 500ms
			width 100%

			+below($tablet)
				padding-right 0em
				width 96%
				float left
			+below($tablet)
				padding-right 0em
				width 100%

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
		overflow hidden
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
			@extend $heading
			margin-left 0
			+below($tablet)
				fs(30)
				line-height $let*1rem

		strong
			font-family $circular-bold

</style>
