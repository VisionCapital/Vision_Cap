<template>
	<div :class="[ 'resource', resourceType ]">

		<div class="body">
			<h5 class="date"
				v-if="renderDate"
				v-html="renderDate"/>

			<div class="title">
				<h2 v-if="data.data.resource_title"
					v-html="$cms.textField(data.data.resource_title)"/>

			</div>

			<div class="copy" v-if="data.data.resource_body"
				v-html="$cms.htmlField(data.data.resource_body)"/>

			<div class="copy" v-else-if="copy">
				<p v-html="copy"/>
			</div>

			<!-- included media e.g. audio -->

		</div>

		<div class="image" v-if="data.data.hero_image.url">
			<img :src="data.data.hero_image.url" />
		</div>

		<!-- <div class="media" v-for="(media, idx) in image" :key="idx">
			<h5 v-if="image.length > 0"> Part {{idx + 1}}/{{image.length}} </h5>

			<img :src="media.url" v-if="media.type === 'image/png' ">
			<video v-else controls>
				<source :src="media.url" :type="media.type">
			</video>
		</div> -->

	</div>
</template>

<script>

import moment from 'moment';

export default {

	props: {
		data: {
			type: Object,
			required: true
		}
	},

	computed: {
		renderDate() {
			return this.data.data.publish_date ? moment(this.data.data.publish_date).format('MMM M, YYYY') : null;
		},

		resourceType() {
			const str = this.data.tags[0];
			return str.substr(0, str.indexOf(' ')).toLowerCase();
		}
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.resource
	border-bottom 1px solid #d8d8d8
	display flex
	mgn(0, 0, 2)
	pad(1, 0)

.body
	order 2
	width (600% / 9)

.date
	fs(16)

.title
	/deep/ h2
		fs(40)
		font-family $cormorant-semibold
		line-height (48 / 40)

.copy
	/deep/
		p
			fs(12)
			letter-spacing (0.09 / 12) * 1em
			line-height (20 / 12)

			strong
				font-family $circular-bold
				font-weight bold

				&:only-child
					color $blk

.image
	order 1
	pad(1,3,1,0)
	width (300% / 9)

// ----------
// Alt styles
// ----------

.media
	/deep/ h2
		color $blk
		fs(40)
		font-family $cormorant-semibold
		line-height (48 / 40)
		max-width (820 / 40) * 1em

.news
	.date
		font-family $cormorant-semibold

	/deep/ h2
		color $blk


</style>
