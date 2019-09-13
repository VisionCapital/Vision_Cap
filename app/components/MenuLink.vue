<template>

	<router-link v-if="link.link_type === 'Document'"
		:to="`/${link.slug}`"
		:title="title"
		@click.native="$emit('click')">

		{{ title }}

	</router-link>

	<a v-else
		:href="link.url"
		:target="link.target"
		:title="title"
		@click="$emit('click')">

		{{ title }}

	</a>

</template>

<script>

export default {
	props: {
		link: {
			type: Object,
			default: null
		},
		title: {
			type: String,
			default: null
		}
	},
	components: {},
	computed: {},
	data() {
		return {
			name: 'Link'
		};
	},
	methods: {},
	created() {},
	mounted() {},
	beforeDestroy() {}
};

</script>

<style lang="scss" scoped>

h1 {
	font-size: 36px;
}

</style>
