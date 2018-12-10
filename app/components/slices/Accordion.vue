<template>
	<header>
		<h2 v-if="heading"
			v-html="heading"/>
		<h3 v-if="subheading"
			v-html="subheading"/>
		<p v-if="copy"
			v-html="copy"/>
		<div v-if="image"
			v-html="image"/>
		<div v-if="notes"
			v-html="notes"/>
	</header>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ]
};
</script>
