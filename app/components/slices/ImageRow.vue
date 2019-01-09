<template>
	<div class="image-row">

		<div class="wrap">
			<div class="image-wrap">
			<div class="image-container" v-for="(image, i) in data.items" :key="i">
					<img :src="image.row_image.url"/>
			</div>
			</div>

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {

	mixins: [ airprops ]

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.image-row
	@extend .slice
	pad(1,0)
	height 5%
	width 100%

.wrap
	flex-wrap wrap


.image-container
	width relative
	max-width 20%
	display flex

img
	height 20%

.image-wrap
	display flex
	vertical-align center

</style>
