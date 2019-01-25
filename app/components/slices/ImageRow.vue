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
	@extend $slice
	pad(0,0,2,0)

.image-wrap
	align-items center
	display flex
	// width 50%
	+below($tablet)
		width 100%

	+below($mobile)
		flex-wrap wrap

.image-container
	mgn(.5,2,.5,0)

	&:last-child
		mgn(.5,0)

	/deep/
		img
			max-height 8rem
			max-width 12rem


</style>
