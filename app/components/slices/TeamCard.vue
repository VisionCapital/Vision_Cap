<template>
	<div class="team-cards">

		<div class="wrap" v-if="data.items.length">

			<div v-if="data.fields.team_title" v-html="data.html('team_title')"></div>

			<div class="card" v-for="(card, idx) in data.items" :key="idx" >

				<div class="img-wrap">
					<img class="profile-pic" ref="img" :src="card.profile_image.url" v-if="card.profile_image.url">
				</div>

				<div class="content">

					<div class="copy-container" ref="copyContainer" :style="copyHeight(idx)"
						v-html="data.htmlField(card.profile_copy)">
					</div>

					<div @click="toggleText(idx)" v-if="card.largeCopy" class="copy-cta">
						<p v-if="collapsed">read more</p>
						<p v-else>collapse</p>
					</div>

				</div>

			</div>

		</div>
<!-- 
		<div class="wrap" v-else>

			<div class="img-wrap">
				<img ref="img" class="profile-pic" :src="image[0].url" v-if="image">
			</div>

			<div class="content" :class="{'collapsed': collapsed}">

				<h2 class="name" v-if="heading"
					v-html="heading"/>

				<h4 class="position"
					v-if="subheading"
					v-html="subheading"/>

				<div class="copy-container" :class="{'full-copy': !collapsed}" ref="copyContainer">
					<p ref="copy" v-html="copy" >
					</p>
				</div>

				<div @click="toggleText()" v-if="!shortText" class="copy-cta">
					<p v-if="collapsed">read more</p>
					<p v-else>collapse</p>
				</div>

			</div>

		</div> -->

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {

	mixins: [ airprops ],

	data() {
		return {
			imageHeight: 0
		};
	},
	methods: {
		toggleText(idx) {
			// this.data.items[idx].
		},
		checkOverflow() {
			let cards = this.data.items;
			let copyContainers = this.$refs.copyContainer;
			this.imageHeight = this.$refs.img[0].offsetHeight;

			for (let idx in cards) {
				if (copyContainers[idx].offsetHeight > this.imageHeight) {
					this.data.items[idx].largeCopy = true;
				} else {
					this.data.items[idx].largeCopy = false;
				}
			}
		},
		copyHeight(idx) {

			if (this.data.items[idx].largeCopy) {
				return {
					'max-height': `${this.imageHeight - 20}px`
				};
			}
			return {
				'max-height': '100%'
			};
		}
	},
	mounted() {
		this.checkOverflow();

		// if (this.$refs.copy && this.$refs.img.offsetHeight < this.$refs.copy.offsetHeight) {
		// 	this.shortText = false;
		// }
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.team-cards
	@extend .slice
	// padding 1px 0
	+above($tablet)
		// margin 0 (100% / 8)
		// width (600% / 8)

	.wrap
		margin-top (100% / 8)
		margin-bottom (100% / 8)
		position relative

	.card
		display flex
		justify-content space-between
		pad(2,0)

		&:nth-child(even)
			background $bg

img
	width 20vw

.content
	width 60%
	display inline-block
		+above($tablet)
			display flex

p
	max-width 100%

/deep/ h4
	margin-bottom 0
	+below($tablet)
		fs(20)

.img-wrap
	margin-right 6em

img
	width 220px
	max-width 100vw
	+below($tablet)
		margin-right 1em
		width 96px
		float left

.content.collapsed
	overflow hidden

.copy-cta
	color $blue
	overflow hidden

.copy-container
	// max-height 200px
	overflow hidden
	// text-overflow ellipsis
	transition max-height 1s
	word-wrap break-word
	// +below($tablet)
	// 	max-height 80px

	&.full-copy
		overflow visible
		// max-height 100%

	/deep/
		h2, h3, h4, p
			&:first-child
				margin-top 0

		h2, h3
			@extend .heading

			+below($tablet)
				fs(30)

</style>
