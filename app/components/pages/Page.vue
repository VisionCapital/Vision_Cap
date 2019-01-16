<template>
	<div class="page"><div>

		<transition appear v-for="(module, idx) in record.getModules()"
			:key="module.id">
			<component :is="module.component"
				:page="record"
				:data="module"
				:class="[ 'onpage', { inview : sidx >= idx }]"
				:inview="sidx >= idx ? true : false"
				:lastScrollTop="lastScrollTop"
				ref="slice"/>
		</transition>

		<page-footer/>
		
	</div></div>
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
			return this.$store.state.device.win.y;
		}
	},

	methods: {
		checkScroll(scrollTop) {
			this.$emit('pageTop', scrollTop < 12);

			for (let i = this.$refs.slice.length - 1; i > -1; i--) {
				if (scrollTop + this.deviceHeight * 0.75 > this.$refs.slice[i].$el.offsetTop) {
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
		}, 500);
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.page
	height 100%

</style>