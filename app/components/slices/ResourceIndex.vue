<template>

<div class="resource-index">
	<div class="wrap">
	<h3 class="index" v-for="item in data.items" :key="item">
				<router-link 
					:to="`/resources/${slugify(data.textField(item.resource_title))}`" 
					@click.native.stop>
						<h3 v-html="data.textField(item.resource_title)"/>
						<img class="index-image" ref="img" :src="item.resource_thumbnail.url">
				</router-link>
	</h3>
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
.resource-index
	@extend $slice
	position relative
	/deep/ h3
		font-family $cormorant-semibold	
.index
	width 50%
	display inline-block
	position relative
</style>
