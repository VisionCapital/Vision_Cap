<template>

	<button v-if="type === 'button'"
		:title="label"
		:style="{ color: fill }"
		class="button">
		<div class="bg" :style="{ background: fill }"/>
		<div class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="23" height="11" viewBox="0 0 23 11" :stroke="fill">
				<path d="M1.5 5.5h18.2997175"/>
				<path d="M16.3262888 9.5878018L21.6562446 5.5l-5.3299558-4.02803154"/>
			</svg>
		</div>
		<span v-html="label"/>
	</button>

	<router-link v-else-if="type === 'link'"
		:to="route"
		:title="label"
		:style="{ color: fill }"
		class="button">
		<div class="bg" :style="{ background: fill }"/>
		<div class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="23" height="11" viewBox="0 0 23 11" :stroke="fill">
				<path d="M1.5 5.5h18.2997175"/>
				<path d="M16.3262888 9.5878018L21.6562446 5.5l-5.3299558-4.02803154"/>
			</svg>
		</div>
		<span v-html="label"/>
	</router-link>

	<a v-else-if="type === 'ext-link'"
		:href="route"
		:title="label"
		:style="{ color: fill }"
		class="button">
		<div class="bg" :style="{ background: fill }"/>
		<div class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="23" height="11" viewBox="0 0 23 11" :stroke="fill">
				<path d="M1.5 5.5h18.2997175"/>
				<path d="M16.3262888 9.5878018L21.6562446 5.5l-5.3299558-4.02803154"/>
			</svg>
		</div>
		<span v-html="label"/>
	</a>

</template>

<script>

export default {
	props: {
		type: {
			type: String,
			default: 'button'
		},
		label: {
			type: String,
			default: 'More'
		},
		route: {
			type: String,
			required: false
		},
		fill: {
			type: String,
			default: '#ef3e2d'
		}
	}
};

</script>

<style lang="stylus" scoped>

@import "../styl/_variables"

.button
	align-items center
	appearance none
	background 0
	border 1px solid
	color $red
	display flex
	outline 0
	padding 0
	position relative

	&:focus
		.bg
			transform scaleX(1)

		.icon,
		/deep/ span
			mix-blend-mode difference

	+above($tablet)
		width (200vw / 8)

		&:hover
			.bg
				transform scaleX(1)

			.icon,
			/deep/ span
				mix-blend-mode difference

	.icon,
	/deep/ span
		position relative
		flex-basis 50%
		z-index 1

	.icon
		flex-grow 0
		flex-shrink 1
		text-align center

	/deep/ svg
		display inline

	/deep/ path
		fill none
		fill-rule nonzero
		stroke-width 1.5
		stroke-linecap square

	/deep/ span
		fs(14)
		flex-grow 1
		flex-shrink 0
		line-height (42 / 14)
		padding-right 1em
		text-align left
		white-space nowrap

.bg
	abs()
	transform scaleX(0)
	transform-origin left
	transition transform 300ms $easeInOutQuint
	z-index 0

</style>
