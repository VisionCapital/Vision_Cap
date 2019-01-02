<template>
	<div class="resource-slice">
		<div class="wrap">

      <h3 class="date" 
        v-if="subheading"
        v-html="subheading"/>

			<div class="title">
				<h2 v-if="heading"
					v-html="heading"/>

			</div>

			<div class="copy">
				<p v-if="copy"
					v-html="copy"/>
			</div>

      <div class="media" v-for="(media, idx) in image" :key="idx">
        <h4 v-if="image.length > 0"> Part {{idx + 1}}/{{image.length}} </h4>

        <!-- will probably need to adjust this v-if for prismic -->
        <img :src="media.url" v-if="media.type === 'image/png' ">
        <video v-else controls>
          <source :src="media.url" :type="media.type">
        </video> 
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

.resource-slice
	@extend .slice
	padding 1px 0
	+above($tablet)
		margin 0 (100% / 8)
		width (600% / 8)

	.wrap
		margin (100% / 8) auto

.title
	/deep/ h3
		@extend .heading

	+above($tablet)
		// width (500% / 8)

</style>
