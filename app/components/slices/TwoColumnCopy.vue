<template>
	<div class="two-column-copy-slice">
		<div class="wrap">

			<div class="title">
				<h2 v-if="data.fields.module_title.length"
					v-html="data.text('module_title')"/>
				<h2 v-else-if="title"
					v-html="title"/>
			</div>

			<div v-if="data.fields.column_copy.length"
				v-html="data.html('column_copy')"
				class="copy"/>

			<div v-else-if="copy"
				class="copy">
				<p v-if="copy"
					v-html="copy"/>
				<p v-if="heading"
					v-html="heading"/>
			</div>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],

	data() {
		let title = '<h2>Vision capital corporation is the manager of the vision opportunity funds...</h2>';
		return {
			title
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.two-column-copy-slice
	@extend .slice
	pad(2,0)

.title
	/deep/ h3
		@extend .heading

.copy
	// display flex
	// justify-content space-between
	column-count 2

	/deep/ p
		margin-top 0
		// width 46%
		// max-width 100%

</style>
