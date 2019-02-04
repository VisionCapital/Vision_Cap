<template>
	<div class="resources" :id="resourceID" :ref="resourceID" v-if="resources.length">
		<div class="wrap">

			<router-link :to="`/resources/${slugify(data.text('title_tag'))}`" @click.native.stop><h2 v-if="data.fields.title_tag"
				v-html="data.text('title_tag')"/></router-link>

			<!-- <resource v-for="(resource, i) in resources"
				:key="i"
				:class="[ 'onpage', { inview : sidx >= i }]"
				:inview="sidx >= i"
				ref="resourceComp"
				:data="resource"/>

			<button class="more-pagination"
				:class="[ 'onpage', { inview : sidx >= resources.length - 1 }]"
				v-if="totalPages > loadedPages"
				@click="loadTags(loadedPages + 1)"
			>
				<p v-html="`More ${data.text('title_tag')} `"/>
				<arrow-head v-if="!loadingPages" class="arrow-head" color="#0165d8"/>
				<div class="spinner" v-else>*loadSpinner</div>
			</button> -->

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import Resource from './Resource.vue';
import ArrowHead from '../svg/ArrowHead.vue';

export default {
	mixins: [ airprops ],

	props: {
		page: {
			type: Object,
			required: true
		}
	},

	components: {
		Resource,
		ArrowHead
	},

	data() {
		return {
			resources: [],
			resourceID: '',
			sidx: -1,
			loadedPages: 1,
			totalPages: 0,
			loadingPages: false
		};
	},
	computed: {
		deviceHeight() {
			return this.$store.state.device.win.y * 0.85;
		}
	},
	methods: {
		slugify(slug) {
			let newSlug = slug.replace(/\s/g, '-').toLowerCase();
			return newSlug;
		},
		hashScroll() {
			if (this.$route.hash && `#${this.resourceID}` === this.$route.hash) {
				this.page.scroll.target = -this.$refs[this.resourceID].offsetTop;
			}
		},
		checkScroll(scrollTop) {
			for (let i = this.$refs.resourceComp.length - 1; i > -1; i--) {
				if (scrollTop + this.deviceHeight > this.$refs.resourceComp[i].$el.offsetTop) {
					this.sidx = i;
					return;
				}
				this.sidx = -1;
			}
		},
		loadTags(pagNum) {
			this.loadingPages = true;
			this.$cms.loadTags(this.data.text('title_tag'), pagNum).then((results) => {
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
		}
	},
	mounted() {

		this.loadTags(1);

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
