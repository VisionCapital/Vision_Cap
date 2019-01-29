<template>
	<div class="page">

		<div class="page-scroll">

			<transition appear v-for="(module, idx) in record.getModules()"
				:key="module.id">
				<component :is="module.component"
					:page="record"
					:data="module"
					:class="[ 'onpage', { inview : sidx >= idx }]"
					:inview="sidx >= idx"
					ref="slice"/>
			</transition>

			<page-footer ref="footer" :class="[ 'onpage', { inview : sidx >= record.getModules().length - 1 }]"/>

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
		let record = this.$cms.findRecord(this.slug);

		return {
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
		}
	},

	mounted() {
		this.record.scroll = new LerpScroll(this.$el, (d) => { this.lastScrollTop = Math.abs(d.pos); });

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