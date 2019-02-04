<template>
	<div class="resource-page">
		<div class="wrap">

			<p>sddsf</p>
			
			<resource v-for="(resource, i) in resources"
				:key="i"
				:inview="sidx >= i"
				:class="[ 'onpage', { inview : sidx >= i }]"
				ref="resourceComp"
				:data="resource"/>

			<button class="more-pagination"
				:class="[ 'onpage', { inview : sidx >= resources.length - 1 }]"
				v-if="totalPages > loadedPages"
				@click="loadTags(loadedPages + 1)"
			>
				<p v-html="`More ${tag} `"/>
				<arrow-head v-if="!loadingPages" class="arrow-head" color="#0165d8"/>
				<div class="spinner" v-else>*loadSpinner</div>
			</button>
			

		</div>
	</div>
</template>

<script>

import Resource from './Resource.vue';
import ArrowHead from '../svg/ArrowHead.vue';

export default {

	components: {
		Resource,
		ArrowHead
	},
	props: [
		'slug'
	],
	data() {
		return {
			resources: [],
			loadedPages: 1,
			sidx: -1,
			totalPages: 0,
			loadingPages: false
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
		}
	},
	methods: {
		loadTags(pagNum) {
			this.loadingPages = true;
			this.$cms.loadTags(this.tag, pagNum).then((results) => {
				if (pagNum === 1) {
					this.resources = results.results;
					// if (this.resources[0]) {
					// 	this.resourceID = this.resources[0].tags[0].replace(/\s/g, '-').toLowerCase();
					// 	this.$nextTick(this.hashScroll);
					// }
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
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"


		
</style>
