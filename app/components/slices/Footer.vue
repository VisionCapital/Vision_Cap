<template>
	<div class="footer">
		<footer>

			<div class="bg"/>

			<div class="content">

				<logo fill="#fff"
					class="logo"/>

				<ul v-if="splitCopy">
					<li v-for="(line, idx) in splitCopy"
						:key="idx"
						v-html="line"/>
				</ul>

				<core-button
					fill="#fff"
					label="Newsletter Sign Up"/>

			</div>

		</footer>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import Logo from '../svg/Logo.vue';

export default {

	mixins: [ airprops ],

	components: {
		Logo
	},

	data() {
		return {
			splitCopy: null
		};
	},

	created() {
		if (this.copy) {
			this.splitCopy = this.copy.split(/\n/);
		}
	}

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.footer
	background $w
	position relative
	overflow hidden

.bg
	background $red
	height 100%
	left 0
	position absolute
	top 0
	width (700% / 8)

	+above($desktop)
		left auto
		margin-right (3 / 4) * ($desktop / -2)
		right 50%
		width 100%

.content
	mgn(0, auto)
	pad(2, 0)
	position relative
	max-width ((6 * $desktop) / 8)
	width (600% / 8)

	.logo
		width (200% / 6)

	/deep/
		ul
			color $w
			display flex
			flex-wrap wrap
			list-style none
			padding 0

		li
			fs(20)
			letter-spacing -(0.7 / 20) * 1em
			line-height 2
			margin 0
			width (100% / 3)

	.button
		margin-right (100% / 6)
		width (200% / 6)

</style>
