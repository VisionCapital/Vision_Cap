<template>

<div class="resource-index">
	<div class="wrap">
		<div class="index-column" v-for="item in data.items" :key="item">
			<div class="index">
					<router-link 
						:to="`/resources/${slugify(data.textField(item.resource_title))}`" 
						@click.native.stop>
							<h3 v-html="data.textField(item.resource_title)"/>
							<div class="image-wrap" :style="{'background-image': 'url('+item.resource_thumbnail.url+')'}">
								<img class="index-image" ref="img" :src="item.resource_thumbnail.url"/>
							</div>
					</router-link>
				</div>
		</div>

</div>
</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],
	components: {
	},
	data() {
		return {
		};
	},
	computed: {
	},
	methods: {
		slugify(slug) {
			let newSlug = slug.replace(/\s/g, '-').toLowerCase();
			return newSlug;
		}
	},
	mounted() {
	},
	destroy() {
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"
.wrap
	padding-bottom 6em
	+above($mobile)
		display flex
		flex-wrap wrap

.resource-index
	@extend $slice

	text-align left
	/deep/ h3
		font-family $cormorant-semibold	
		fs(30)
		+above($tablet)
			fs(40)
			text-align left
.index-column
	width 100%
	margin auto
	margin-bottom: 0;
	+above($tablet)
		width 48%
		position relative
		&:nth-child(even)
			margin-left 2%
.index
	padding-top 3em
	+above($tablet)
		bottom 0
		position relative

.image-wrap
	overflow hidden
	background-position center
	background-size cover
	height 0
	padding-bottom (3/4 * 100%)
	position relative

.index-image
	width 100%
	opacity 0
	position absolute 
	pointer-events none
</style>
