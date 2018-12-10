<template>
	<div class="newsltter-cta">
		<h2 v-if="heading"
			v-html="heading"/>
		<h3 v-if="subheading"
			v-html="subheading"/>
		<p v-if="copy"
			v-html="copy"/>
		<div v-if="image"
			v-html="image"/>
		<input type="email"/>
		<button type="submit"
		 	v-html="'Submit'"/>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ]
};
</script>


<style lang="stylus" scoped>

@import "../../styl/_variables"

.newsltter-cta
	/deep/ input
		color $w
		width auto

	/deep/ button
		color $w
		margin-left 0

</style>
