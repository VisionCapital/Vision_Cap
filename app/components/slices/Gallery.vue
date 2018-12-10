<template>
	<div class="gallery">
		<div class="wrap">

			<div class="window">
				<div v-if="selectedImg"
					class="poster"
					:style="{ backgroundImage: `url('${selectedImg}')` }">
					<img :src="selectedImg"
						alt=""/>
				</div>
			</div>

			<div class="thumbs">
				<div v-for="(im, idx) in image"
					:key="idx"
					@click="selectImg(idx)"
					class="thumb">
					<img v-if="im"
						:src="im.url"
						alt=""/>
				</div>
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
			if (this.image[idx].url) {
				this.selectedImg = this.image[idx].url;
			}
		}
	},

	data() {
		return {
			selectedImg: null
		};
	},

	created() {
		if (this.image) {
			this.selectedImg = this.image[0].url;
		}
	}

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.gallery
	@extend .slice
	height 100%
	max-height 900px + (9 / (8 * 16)) * $desktop

	.wrap
		display flex
		flex-direction column
		height 100%

.window
	flex-grow 1
	position relative
	width 100%

.poster
	background-position center
	background-size cover
	abs()
	overflow hidden
	z-index 0

	/deep/ img
		opacity 0
		pointer-events none

.thumbs
	display flex
	width 100%

.thumb
	flex-shrink 0
	max-height (9 / (8 * 16)) * $desktop
	height (9 / (8 * 16)) * 100vw
	overflow hidden
	width (100% / 8)

</style>