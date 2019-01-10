<template>
	<div class="resources" :id="resourceID" v-if="resources.length">
		<div class="wrap">

			<h2 v-if="data.fields.title_tag"
				v-html="data.text('title_tag')"/>

			<resource v-for="resource in resources"
				:key="resource.id"
				:data="resource"/>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import Resource from './Resource.vue';

export default {
	mixins: [ airprops ],

	components: { Resource },

	data() {
		return {
			resources: [],
			resourceID: ''
		};
	},

	created() {
		this.$cms.loadTags(this.data.text('title_tag')).then((results) => {
			this.resources = results.results;
			if (this.resources[0]) {
				this.resourceID = this.resources[0].tags[0].replace(/\s/g, '-').toLowerCase();
			}
		});
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.resources
	@extend .slice
	pad(2, 0)

	&:nth-child(odd)
		background #f8f8f8

	/deep/ h2
		fs(80)
		line-height (100 / 80)
		letter-spacing (-.97 / 80) * 1em

</style>
