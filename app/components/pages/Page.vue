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
			record,
			shiftDown: false
		};
	},

	computed: {
		deviceHeight() {
			return this.$store.state.device.win.y * 0.85;
		}
	},

	methods: {
		keydown(e) {
			// this.handleTabLocation(e);

			// if (this.appointmentWidget || this.pageDetails.title === 'Contact') {
			// 	return;
			// }

			// let index = this.getScrollIndex(this.sliceTops, this.device.win.y * 0.4);
			// console.log(e.which);
			console.log('kerdown', this.$store.state);
			let distance = null;
			switch (e.which) {
				case 16:
					this.shiftDown = true;
					break;
				// j
				case 74:
					// index = Math.min(index + 1, this.sliceTops.length - 1);
					distance = -this.$store.state.device.win.y;
					break;
				// down
				case 40:
					// index = Math.min(index + 1, this.sliceTops.length - 1);
					break;
				// k
				case 75:
					distance = this.$store.state.device.win.y;
					break;
				// spacebar
				case 32:
					distance = this.$store.state.device.win.y * (this.shiftDown ? 1 : -1);
					break;
				// up
				case 38:
					break;
				// tab
				case 9:
					break;

				default:
					return;
			}
			if (distance) {
				this.record.scroll.scrollTo(this.record.scroll.pos + distance);
			}

			// let top = this.sliceTops[index].$el.offsetTop;

			// if (this.sliceTops[index].data && this.sliceTops[index].data.component === 'PropertyScroll') {
			// 	this.scroll.scrollTo(-top - this.extraIdx);
			// 	this.extraIdx += window.innerHeight;
			// 	return;
			// }

			// let scrollCorr = this.navHeight * (e.which === 75 && this.pageDetails.type === 'property' ? 2 : 1);
			// this.scroll.scrollTo(-top + scrollCorr);

		},
		keyup(e) {
			if (e.which === 16) {
				this.shiftDown = false;
			}
		},
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
			native: !this.$store.state.device.lerp,
			resizeCallback: (obj) => {
				this.viewportHeight = obj.viewport;
				this.scrollHeight = obj.scrollHeight;
			},
			keysAndAmt: {
				'ArrowUp': 200,
				'ArrowDown': -200
			}
		};
		this.record.scroll = new LerpScroll(this.$el, opts);

		this.scrollInterval = setInterval(() => {
			this.checkScroll(this.lastScrollTop);
		}, 600);
		window.addEventListener('keydown', this.keydown);
		window.addEventListener('keyup', this.keyup);
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.keydown);
		window.removeEventListener('keyup', this.keyup);
	}

};

</script>

<style lang="stylus">

@import "../../styl/_variables"

.page {
	position: fixed;
	height: 100%;
	left: 0;
	top: 0;
	overflow: hidden;
	width: 100%;
}

.page-scroll
	position: relative;
	z-index: 1;
	min-height: 100%;
	overflow: hidden;
	width: 100%;
	-ms-overflow-style: none;
	min-height: 100%;


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