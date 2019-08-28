<template>
	<div class="page">

		<div class="page-scroll">

			<hero
				:page="record"
				:data="heroData"
				:class="[ 'onpage', 'inview' ]"
				:inview="true"
				ref="slice"/>

			<flexible-slice
				:page="record"
				:class="[ 'onpage', 'inview' ]"
				:inview="true"
				ref="slice"/>

			<newsletter-signup
				:page="record"
				:data="signupData"
				:class="[ 'onpage', 'inview' ]"
				:inview="true"
				ref="slice"/>

			<page-footer ref="footer" :class="[ 'onpage', 'inview' ]"/>

		</div>

	</div>
</template>

<script>

import slices from '../../mixins/slices.js';
import LerpScroll from '../../js/lerp-scroll.js';

export default {

	props: [ 'slug' ],

	mixins: [ slices ],

	watch: {
		record() {
			this.$nextTick(this.checkScroll(this.lastScrollTop));
		}
	},

	data() {
		const record = this.$cms.findRecord(this.slug);

		const heroData = {"component":"Hero","fields":{"hero_title":[{"type":"heading1","text":"Investor Portal","spans":[]}],"hero_copy":[],"hero_image":{}},"items":[{}]}; // eslint-disable-line
		const signupData = {"component":"NewsletterSignup","fields":{"heading":[{"type":"heading2","text":"Sign up to our newsletter:","spans":[]}],"placeholder":[{"type":"paragraph","text":"Enter your email address","spans":[]}],"submit_button":[{"type":"paragraph","text":"Submit","spans":[]}]},"items":[{}]}; // eslint-disable-line

		return {
			heroData,
			signupData,
			lastScrollTop: 0,
			sidx: 0,
			record
		};
	},

	computed: {
		deviceHeight() {
			return this.$store.state.device.win.y * 0.85;
		}
	},

	methods: {
		checkScroll(scrollTop) {
			this.$emit('pageTop', scrollTop < 1);

			for (let i = this.$refs.slice.length - 1; i > -1; i--) {
				if (scrollTop + this.deviceHeight > this.$refs.slice[i].$el.offsetTop) {
					this.sidx = i;
					return;
				}
			}
		},
		updateScroll() {
			this.lastScrollTop = Math.abs(this.record.scroll.pos);
		}
	},

	mounted() {
		let opts = {
			callback: this.updateScroll,
			lerpFactor: this.$store.state.device.mobile ? 8 : 10,
			resizeCallback: (obj) => {
				this.viewportHeight = obj.viewport;
				this.scrollHeight = obj.scrollHeight;
			}
		};
		this.record.scroll = new LerpScroll(this.$el, opts);

		this.scrollInterval = setInterval(() => {
			this.checkScroll(this.lastScrollTop);
		}, 600);
	}

};

</script>

<style lang="stylus">

@import "../../styl/_variables"

.page-scroll
	position relative
	z-index 1

	> div
		background $bg
		// transform translate3d(0, 0, 0)
		transition background 600ms $easeOutCubic
		// transition-property background, transform

		&.v-enter
			background rgba($bg,0)
			// transform translate3d(0, 5vh, 0)

		+above($tablet)
			&.v-enter-active, .v-enter-active &
				for i in 1..3
					&:nth-child({i})
						transition-delay (i + 6) * 100ms

.page.v-enter-active
	transition-duration 1800ms

	// /deep/ > div
	// 	transition opacity 500ms

	// 	.v-enter-active &
	// 		opacity 0

</style>