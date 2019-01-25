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
		}, 800);
	}

};

</script>

<style lang="stylus" scoped>

.page-scroll
	position relative
	z-index 1

	/deep/ > div
		transition opacity 500ms

		.v-enter-active &
			opacity 0

</style>