<template>
	<div class="nav-switch">
		<button @click.prevent="$store.dispatch('toggleNav')">
			<svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17">
				<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="square">
					<path d="M.5.5h22M4 8.5h15M.5 16.5h22"/>
				</g>
			</svg>
		</button>
	</div>
</template>

<style lang="stylus" scoped>

@import "../styl/_variables";

.nav-switch
	background $red
	position fixed
	right 0
	top 0
	max-width ((2 * $desktop) / 8)
	width (200% / 8)
	z-index 9

	+above($desktop)
		margin-right ($desktop / -2)
		right 50%

	/deep/ button
		appearance none
		background none
		border 0
		height 100%
		margin 0 0 0 50%
		pad(1,1)
		text-align center
		width 50%

		svg
			display inline-block
			vertical-align middle

</style>
