<template>
	<div :class="[ 'resource', resourceType ]">

		<div class="body">
			<p class="date"
				v-if="renderDate"
				v-html="renderDate"/>

			<div class="title">
				<h2 v-if="data.data.resource_title"
					v-html="$cms.textField(data.data.resource_title)"/>
			</div>

			<div class="copy" ref="copy" v-if="data.data.resource_body"
				v-html="$cms.htmlField(data.data.resource_body)"/>

			<div class="copy" ref="copy" v-else-if="copy">
				<p v-html="copy"/>
			</div>

			<!-- included media e.g. audio -->

			<audio-player
				v-if="data.data.audio && data.data.audio.url"
				:audio="data.data.audio"
			/>

			<a :href="data.data.resource_pdf.url" v-if="data.data.resource_pdf.url" target="_blank" >View Full Article.</a>
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
import AudioPlayer from './AudioPlayer.vue';

export default {
	components: {
		AudioPlayer
	},
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	methods: {
		setDelays() {
			let children = this.$refs.copy.children;
			let titleDelay = 0.2;
			if (this.data.data.resource_title) {
				titleDelay += 0.2;
			}

			for (let i in children) {
				if (children[i].style) {
					if (this.data.data.resource_body[i].type === 'embed') {
						children[i].children[0].style['transition-delay'] = `${0.2 * i + titleDelay}s`;
					} else {
						children[i].style['transition-delay'] = `${0.2 * i + titleDelay}s`;
					}
				}
			}
		}
	},
	mounted() {
		this.setDelays();
	},
	computed: {
		renderDate() {
			return this.data.data.publish_date ? moment(this.data.data.publish_date).format('MMM D, YYYY') : null;

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
	position relative
	+below($mobile)
		pad(0,0,1)
	
a
	color: black
	position relative
	text-decoration: none

	&:before, &:after
		background: $blue
		content: ''
		height 2px
		position: absolute
		top 100%
		width: 0%

	&:before
		left: 0

	&:after
		right 0
		transition: width 0.8s cubic-bezier(0.25,0.1,0.25,1)

	&:hover
		color: $blue

		&:before
			transition: width 0.5s cubic-bezier(0.25,0.1,0.25,1)
			width: 100%

		&:after
			background: transparent
			transition: 0s
			width: 100%


.title, .date, .copy /deep/ p
	transition opacity 0.5s, transform 0.5s
	.v-enter &, .onpage:not(.inview) &
		transform translateY(2rem)
		opacity 0

.body
	order 2
	width 100%
	+above($tablet)
		width (600% / 9)
	
.date
	font-family $circular
	fs(16)
	+below($tablet)
		fs(12)

.title
	transition-delay 0.2s
	/deep/ h2
		fs(40)
		font-family $cormorant-semibold
		line-height (48 / 40)
		+below($tablet)
			fs(20)
.copy /deep/ p, .media .date
	fs(12)
	letter-spacing (0.09 / 12) * 1em
	line-height (20 / 12)
	max-width 100%
	// strong
	// 	font-family $circular-bold
	// 	font-weight bold

	// 	&:only-child
	// 		color $blk

.copy /deep/ strong 
	position relative 
	top 1em

.image
	order 1
	pad(1,3,1,0)
	width (300% / 9)
	transition transform 0.5s 0.2s, opacity 0.5s 0.2s
	.v-enter &, .onpage:not(.inview) &
		transform translateY(20%)
		opacity 0
	+below($tablet)
		padding-right 4vw
		min-width 6em
// ----------
// Alt styles
// ----------

.awards
	.date
		line-height 1

.media
	.title 
		width 78vw
		+above($laptop)
			width 74vw
	/deep/ h2
		color $blk
		fs(40)
		font-family $cormorant-semibold
		line-height (48 / 40)
		// max-width (820 / 40) * 1em
		+below($tablet)
			fs(20)
.news
	.date
		font-family $cormorant-semibold

	/deep/ h2
		color $blk

/deep/ iframe
	transition transform 0.5s, opacity 0.5s
	width 100%
	height (78vw * (2 / 3) * 270 / 480)
	.v-enter &, .onpage:not(.inview) &
		transform translateX(20%)
		opacity 0
	+below($tablet)
		width 100%
		height (78vw * 270 / 480)
</style>
