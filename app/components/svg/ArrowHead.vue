<template>

<svg :class="{down: pointDown}" xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5">
  <path fill="none" fill-rule="evenodd" :stroke="color" stroke-width="1.5" d="M10.613 4.307L5.8063 1 1 4.307"/>
</svg>

</template>

<script>
export default {
	props: {
		pointDown: Boolean,
		color: {
			type: String,
			default: '#00227d'
		}
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

// path {
//   stroke: $blue;
// }
svg
	transition transform 0.5s
.down
	transform rotate(180deg)
</style>
