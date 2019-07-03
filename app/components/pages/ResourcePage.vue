<template>
	<div class="resource-page"  :id="resourceID" :ref="resourceID" >
		<div class="page-scroll">

			<div class="hero">
				<hero :data="heroData"/>
			</div>

			<div>

				<div class="wrap" v-if="resources.length">

					<resource v-for="(resource, i) in resources"
						:key="i"
						:inview="sidx >= i"
						:class="[ 'onpage', { inview : sidx >= i }]"
						ref="resourceComp"
						:data="resource"/>

					<button class="more-pagination"
						:class="[ 'onpage', { inview : sidx >= resources.length - 1 }]"
						v-if="totalPages > loadedPages"
						@click="loadTags(loadedPages + 1)">
						<span v-html="`More ${tag} `"/>
						<arrow-head v-if="!loadingPages" class="arrow-head" color="#0165d8"/>
						<div class="spinner" v-else>Loading…</div>
					</button>

				</div>

				<page-footer ref="footer" :class="[ 'onpage', { inview : sidx >= resources.length - 1 }]"/>

			</div>
		</div>
	</div>
</template>

<script>

import Resource from '../slices/Resource.vue';
import Hero from '../slices/Hero.vue';
import ArrowHead from '../svg/ArrowHead.vue';
import LerpScroll from '../../js/lerp-scroll.js';

export default {

	watch: {
		tag: {
			immediate: true,
			handler(tag) {
				if (tag) {
					this.heroData.fields.hero_title[0].text = tag;
				}
			}
		}
	},

	components: {
		Resource,
		Hero,
		ArrowHead
	},
	props: [
		'slug'
	],
	data() {
		let record = this.$cms.findRecord(this.slug);
		let heroData = {
			'fields': {
				'hero_title': [
					{
						'text': this.tag
					}
				],
				'hero_copy': [],
				'hero_image': {}
			}
			}; // eslint-disable-line
		return {
			heroData,
			resources: [],
			resourceID: '',
			loadedPages: 1,
			sidx: -1,
			totalPages: 0,
			loadingPages: false,
			lastScrollTop: 0,
			record
		};
	},
	computed: {
		tag() {
			let tag = this.slug.split('-');
			for (let i = 0; i < tag.length; i++) {
				if (tag[i] !== 'and') {
					tag[i] = tag[i].charAt(0).toUpperCase() + tag[i].substring(1);
				}
			}
			tag = tag.join(' ');
			return tag;
		},
		deviceHeight() {
			return this.$store.state.device.win.y * 0.85;
		}
	},
	methods: {
		loadTags(pagNum) {
			this.loadingPages = true;
			this.$cms.loadTags(this.tag, pagNum).then((results) => {
				if (pagNum === 1) {
					this.resources = results.results;
					if (this.resources[0]) {
						this.resourceID = this.resources[0].tags[0].replace(/\s/g, '-').toLowerCase();
						this.$nextTick(this.hashScroll);
					}
				} else {
					this.loadedPages = pagNum;
					for (let resource of results.results) {
						this.resources.push(resource);
					}
				}
				this.totalPages = results.total_pages;
			});
			this.loadingPages = false;
		},
		hashScroll() {
			if (this.$route.hash && `/${this.resourceID}` === this.$route.hash) {
				this.page.scroll.target = -this.$refs[this.resourceID].offsetTop;
			}
		},
		checkScroll(scrollTop) {
			this.$emit('pageTop', scrollTop < 1);
			for (let i = this.$refs.resourceComp.length - 1; i > -1; i--) {
				if (scrollTop + this.deviceHeight > this.$refs.resourceComp[i].$el.offsetTop) {
					this.sidx = i;
					return;
				}
				this.sidx = -1;
			}
		},
		updateScroll() {
			this.lastScrollTop = Math.abs(this.scroll.pos);
		}
	},
	mounted() {
		// this.scroll = new LerpScroll(this.$el, (d) => { this.lastScrollTop = Math.abs(d.pos); });
		this.loadTags(1);
		let opts = {
			callback: this.updateScroll,
			lerpFactor: this.$store.state.device.mobile ? 8 : 10,
			resizeCallback: (obj) => {
				this.viewportHeight = obj.viewport;
				this.scrollHeight = obj.scrollHeight;
			}
		};
		this.scroll = new LerpScroll(this.$el, opts);

		this.scrollInterval = setInterval(() => {
			if (this.$refs.resourceComp) {
				this.checkScroll(this.lastScrollTop);
			}
		}, 500);
	},
	destroy() {
		clearInterval(this.scrollInterval);
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"
.wrap
	padding-top 5em
.resource-page {
	@extend $slice
    height: 100%;
	position relative
}
.page-scroll
	@extend $slice
	position relative
	z-index 1

	> div
		background $w
		// transform translate3d(0, 0, 0)
		transition background 600ms $easeOutCubic
		// transition-property background, transform

		&.v-enter, &.hero
			background rgba($bg,0)
			// transform translate3d(0, 5vh, 0)

		+above($tablet)
			&.v-enter-active, .v-enter-active &
				for i in 1..3
					&:nth-child({i})
						transition-delay (i + 6) * 100ms


.resources
	pad(2, 0)
	&:nth-child(odd)
		background #f8f8f8

	&.v-enter, &.onpage:not(.inview)
		/deep/ h2
			transform translate(0,20%)
			opacity 0

	/deep/ h2
		transition opacity 0.3s, transform 0.3s
		fs(80)
		line-height (100 / 80)
		letter-spacing (-.97 / 80) * 1em
		+below($tablet)
			fs(65)
		+below($mobile)
			fs(30)


.more-pagination
	text-align center
	margin auto
	border none
	transition opacity 0.5s 0.6s, transform 0.5s 0.6s
	&.v-enter, &.onpage:not(.inview)
		transform translate(0,20%)
		opacity 0
	p
		color $bluesat
		display inline-block
		margin-right 0.5em
	.arrow-head, .spinner
		display inline-block
		margin auto
</style>
