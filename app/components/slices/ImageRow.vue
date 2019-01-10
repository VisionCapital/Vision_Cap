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
	pad(0,2,2,0)

.image-wrap
	display flex
	width 50%          
	flex-direction: row;       
	flex-wrap: nowrap;             
	justify-content: space-between;

.image-container	
	align-items: center;
	display: flex;
	height 4rem
	max-width relative
	width 8rem 
	flex-direction: row;       
	flex-wrap: nowrap;             
	pad(2,0,3,0)

</style>
