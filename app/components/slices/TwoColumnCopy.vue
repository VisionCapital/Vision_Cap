<template>
	<div class="two-column-copy">
		<div class="wrap">

			<div class="title" v-if="data.fields.module_title.length">
				<h2 v-html="data.text('module_title')"/>
			</div>

			<div v-else-if="title"
				class="title"
				v-html="title">
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
		let title = '<h3>Vision capital corporation is the manager of the vision opportunity funds...</h3>';
		return {
			title
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.two-column-copy
	@extend .slice
	pad(2,0)

.title
	/deep/ h3
		font-family $cormorant-semibold

		+below($tablet)
			font-family $cormorant-medium

.copy
	column-count 2

	/deep/ p
		margin-top 0

</style>
