<template>
	<div class="resources" :id="resourceID" :ref="resourceID" v-if="resources.length">
		<div class="wrap">

			<h2 v-if="data.fields.title_tag"
				v-html="data.text('title_tag')"/>

			<resource v-for="(resource, i) in resources"
				:key="resource.id"
				:class="[ 'onpage', { inview : sidx >= i }]"
				ref="resourceComp"
				:data="resource"/>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import Resource from './Resource.vue';

export default {
	mixins: [ airprops ],

	props: {
		page: {
			type: Object,
			required: false
		}
	},

	components: { Resource },

	data() {
		return {
			resources: [],
			resourceID: '',
			sidx: -1
		};
	},
	computed: {
		deviceHeight() {
			return this.$store.state.device.win.y;
		}
	},
	methods: {
		hashScroll() {
			if (this.$route.hash && `#${this.resourceID}` === this.$route.hash) {
				this.page.scroll.target = -this.$refs[this.resourceID].offsetTop;
			}
		},
		checkScroll(scrollTop) {
			for (let i = this.$refs.resourceComp.length - 1; i > -1; i--) {
				if (scrollTop + this.deviceHeight * 0.75 > this.$refs.resourceComp[i].$el.offsetTop) {
					this.sidx = i;
					return;
				}
				this.sidx = -1;
			}
		}
	},
	mounted() {
		this.$cms.loadTags(this.data.text('title_tag')).then((results) => {
			this.resources = results.results;
			if (this.resources[0]) {
				this.resourceID = this.resources[0].tags[0].replace(/\s/g, '-').toLowerCase();
				this.$nextTick(this.hashScroll);
			}
		});

		this.scrollInterval = setInterval(() => {
			if (this.$refs.resourceComp) {
				this.checkScroll(Math.abs(this.page.scroll.pos));
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

.resources
	@extend $slice
	pad(2, 0)

	&:nth-child(odd)
		background #f8f8f8

	&.v-enter, &.onpage:not(.inview)
		/deep/ h2
			transform translate(0,20%)
			opacity 0

	/deep/ h2
		transition opacity 0.5s, transform 0.5s
		fs(80)
		line-height (100 / 80)
		letter-spacing (-.97 / 80) * 1em
		+below($tablet)
			fs(65)
		+below($mobile)
			fs(30)

</style>
