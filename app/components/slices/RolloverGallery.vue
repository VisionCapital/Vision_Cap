<template>
	<div class="rollover-gallery">
		<div class="wrap">

			<div v-if="splitCopy"
				class="labels">
				<div v-for="(label, idx) in splitCopy"
					:key="idx"
					@mouseover="selectImg(idx)"
					class="label"
					v-html="label"/>
			</div>

			<div class="window">
				<div v-if="selectedImg"
					class="poster"
					:style="{ backgroundImage: `url('${selectedImg}')` }"/>
			</div>

			<div class="cta">
				<core-button
					label="Explore All Amenities"/>
			</div>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {

	mixins: [ airprops ],

	methods: {
		selectImg(idx) {
			const sidx = idx % 2;

			if (this.image[sidx].url) {
				this.selectedImg = this.image[sidx].url;
			}
		}
	},

	data() {
		return {
			selectedImg: null,
			splitCopy: []
		};
	},

	created() {
		if (this.image) {
			this.selectedImg = this.image[0].url;
		}

		if (this.copy) {
			this.splitCopy = this.copy.split(/\n/);
		}
	}

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.rollover-gallery
	@extend .slice

	.wrap
		position relative

.labels
	left (100% / 8)
	mgn(.5, 0)
	position absolute
	z-index 1

.label
	color $red
	cursor zoom-in
	font inherit
	fs(40)
	line-height (60 / 40)

	+above($tablet)
		&:hover
			color lighten($red, 20%)

.window
	height 0
	margin-left (200% / 8)
	padding-bottom (698 / 1078) * 100%
	position relative
	width (600% / 8)
	z-index 0

.poster
	background-position center
	background-size cover
	abs()
	overflow hidden

</style>
